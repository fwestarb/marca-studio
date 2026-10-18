import {test,expect} from '@playwright/test';
import {defaults,normalize,priceCents,safeUrl} from '../src/model.js';
import {unzipSync,strFromU8} from 'fflate';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const frame=p=>p.frameLocator('iframe');
// Chromium automation reports unscaled child coordinates for transformed iframes.
// Use the measured CSS scale to send a real pointer event in small previews.
async function scaledClick(p,locator){
 await locator.scrollIntoViewIfNeeded();
 const box=await locator.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};});
 const outer=await p.locator('iframe').evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,scale:r.width/e.offsetWidth};});
 await p.mouse.click(outer.x+box.x*outer.scale,outer.y+box.y*outer.scale);
}
async function ready(p){await p.goto('/');await expect(frame(p).locator('h1')).toBeAttached();}
async function importConfig(p,c){await p.getByLabel('Arquivo de projeto').setInputFiles({name:'project.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(c))});}
test('rascunho, desfazer/refazer e navegação das duas páginas',async({page})=>{
 await ready(page);await page.getByLabel('Nome da empresa',{exact:true}).fill('Ateliê Teste');await expect(frame(page).locator('.wordmark')).toHaveText('Ateliê Teste');
 await page.getByRole('button',{name:'Desfazer'}).click();await expect(page.getByLabel('Nome da empresa',{exact:true})).toHaveValue('Casa Amora');
 await page.getByRole('button',{name:'Refazer'}).click();await expect(frame(page).locator('.wordmark')).toHaveText('Ateliê Teste');await expect(page.locator('.save-indicator')).toContainText('Salvo');
 await page.reload();await expect(page.getByLabel('Nome da empresa',{exact:true})).toHaveValue('Ateliê Teste');await expect(frame(page).locator('h1')).toBeVisible();
 await frame(page).getByRole('link',{name:'Conheça a coleção'}).click();await expect(frame(page).locator('.catalog-hero')).toBeVisible();
 await frame(page).getByRole('link',{name:'A marca',exact:true}).first().click();await expect(frame(page).locator('.company-hero')).toBeVisible();
});
test('seções, identidade, foto e projeto editável',async({page})=>{
 await ready(page);await page.getByRole('button',{name:'Seções',exact:true}).click();await page.getByLabel('Galeria',{exact:true}).uncheck();await expect(frame(page).locator('#galeria')).toHaveCount(0);
 await page.getByRole('button',{name:'Descer Nossa história'}).click();await expect.poll(()=>frame(page).locator('main>.section').evaluateAll(nodes=>nodes.map(n=>n.id).filter(Boolean))).toEqual(['diferenciais','historia','perguntas','contato']);
 await page.getByLabel('Equipe (opcional)').fill('Ana | Design');await page.getByLabel('Equipe',{exact:true}).check();await expect(frame(page).locator('#equipe')).toContainText('Ana');
 await page.getByRole('button',{name:'Visual',exact:true}).click();await page.getByRole('button',{name:'Paleta Marinho'}).click();await page.getByLabel('Estilo dos títulos').selectOption('modern');
 await expect.poll(()=>frame(page).locator('body').evaluate(e=>getComputedStyle(e).getPropertyValue('--panel').trim())).toBe('#244b61');
 await page.getByRole('button',{name:'Empresa',exact:true}).click();await page.getByLabel('Foto de abertura',{exact:true}).setInputFiles('public/examples/atelier.png');await expect(frame(page).locator('.hero-portrait img')).toHaveAttribute('src',/^data:image\/webp/);
 const d=page.waitForEvent('download');await page.getByRole('button',{name:'Salvar projeto',exact:true}).click();const data=JSON.parse(await fs.readFile(await (await d).path(),'utf8'));expect(data.heroImage).toMatch(/^data:image\/webp/);expect(data.visible.gallery).toBe(false);
 await importConfig(page,{kind:'folio-studio',version:1});await expect(page.getByRole('status').filter({hasText:'não é um projeto Marca'})).toBeVisible();
 await importConfig(page,data);await expect(page.getByRole('status').filter({hasText:'Projeto importado'})).toBeVisible();
});
test('preços, categorias, busca, ordem, fichas e catálogo vazio',async({page})=>{
 await ready(page);const c=structuredClone(defaults);c.products[0].price='89,90';c.products[1].price='25';c.products[2].price='inválido';await importConfig(page,c);
 await page.locator('.page-picker').getByRole('button',{name:'Produtos',exact:true}).click();const f=frame(page);await expect(f.locator('#catalog-count')).toHaveText('3 produtos');await expect(f.locator('.product-card').first()).toContainText('89,90');
 await f.getByRole('button',{name:'Para decorar',exact:true}).click();await expect(f.locator('.product-card:visible')).toHaveCount(1);await f.getByRole('button',{name:'Todos',exact:true}).click();
 await f.getByLabel('Buscar produtos').fill('horizónte');await expect(f.locator('.product-card:visible')).toHaveCount(1);await f.getByLabel('Buscar produtos').fill('nadaencontrado');await expect(f.locator('.empty-results')).toBeVisible();await f.getByLabel('Buscar produtos').fill('');
 await f.getByLabel('Ordenar produtos').selectOption('price');await expect(f.locator('.product-card').first()).toContainText('Vaso Linha');await f.getByRole('button',{name:'Ver detalhes de Vaso Linha'}).click();await expect(f.locator('dialog[open]')).toContainText('25,00');await page.keyboard.press('Escape');await expect(f.locator('dialog[open]')).toHaveCount(0);
 c.products=[];await importConfig(page,c);await expect(f.locator('#catalog-count')).toHaveText('0 produtos');await expect(f.locator('.empty-results')).toBeVisible();
});
test('ZIP offline com duas páginas, fontes, imagens, dados seguros e modal',async({page,browser})=>{
 await ready(page);const c=structuredClone(defaults);c.name='Teste <script>alert(1)</script>';c.products[0].url='javascript:alert(1)';c.email='contato@example.com';c.products[0].price='34,50';c.products[0].images=['',''];await importConfig(page,c);
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Baixar site',exact:false}).first().click();const downloaded=await pending;const files=unzipSync(new Uint8Array(await fs.readFile(await downloaded.path())));
 for(const p of ['index.html','produtos.html','script.js','styles.css','projeto.marca.json','examples/atelier.png','fonts/condensed/OFL.txt','fonts/manrope/OFL.txt'])expect(files[p],p).toBeTruthy();
 expect(strFromU8(files['index.html'])).not.toContain('<script>alert(1)</script>');expect(strFromU8(files['produtos.html'])).not.toContain('href="javascript:');
 const folder=path.resolve('verification/downloads/offline');await fs.mkdir(folder,{recursive:true});for(const [name,bytes] of Object.entries(files)){const dest=path.join(folder,name);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,bytes);}
 const context=await browser.newContext({offline:true,viewport:{width:1280,height:900}});const offline=await context.newPage();const errors=[],remote=[];offline.on('pageerror',e=>errors.push(e.message));offline.on('request',r=>{if(/^https?:/.test(r.url()))remote.push(r.url());});
 await offline.goto(pathToFileURL(path.join(folder,'index.html')).href);await expect(offline.locator('.wordmark')).toHaveText(c.name);await offline.evaluate(()=>document.fonts.ready);expect(await offline.evaluate(()=>document.fonts.check('20px Cormorant'))).toBe(true);
 await offline.getByRole('link',{name:'Conheça a coleção'}).click();await expect(offline.locator('.catalog-hero')).toBeVisible();await offline.evaluate(()=>document.fonts.ready);expect(await offline.evaluate(()=>document.fonts.check('30px Condensed'))).toBe(true);
 await offline.getByRole('button',{name:'Ver detalhes de Copo Aurora'}).click();await expect(offline.locator('dialog[open]')).toContainText('34,50');await expect(offline.locator('dialog[open]').getByRole('link',{name:'Saiba mais'})).toHaveCount(0);await expect(offline.locator('dialog[open]').getByRole('link',{name:'Solicitar informações'})).toHaveAttribute('href',/^mailto:/);
 await offline.getByRole('button',{name:'Foto 2 de Copo Aurora'}).click();await expect(offline.getByRole('button',{name:'Foto 2 de Copo Aurora'})).toHaveAttribute('aria-pressed','true');
 await offline.getByRole('button',{name:'Fechar detalhes'}).click();await offline.locator('.catalog-hero').screenshot({path:'verification/catalog-desktop.png'});
 await offline.setViewportSize({width:390,height:844});await offline.getByRole('button',{name:'Ver detalhes de Copo Aurora'}).click();await expect(offline.locator('dialog[open]')).toBeVisible();expect(await offline.locator('dialog[open]').evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);await offline.screenshot({path:'verification/product-mobile.png',animations:'disabled'});await offline.keyboard.press('Escape');
 await offline.locator('.product-card img').first().evaluate(e=>e.src='missing-image.png');await expect(offline.locator('.product-picture').first()).toHaveAttribute('data-image-error','Imagem indisponível');
 await offline.emulateMedia({reducedMotion:'reduce'});await offline.reload();await expect.poll(()=>offline.locator('.word>span').first().evaluate(e=>getComputedStyle(e).transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');
 expect(errors).toEqual([]);expect(remote).toEqual([]);await context.close();
});
test('celular, menu e restauração por teclado',async({page})=>{
 await page.setViewportSize({width:390,height:844});await ready(page);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.getByRole('button',{name:'Ver prévia',exact:true}).click();const f=frame(page);await scaledClick(page,f.getByRole('button',{name:'Abrir menu'}));await expect(f.locator('.menu-dialog')).toBeVisible();await scaledClick(page,f.locator('.menu-dialog').getByRole('link',{name:'Coleção',exact:true}));await expect(f.locator('.catalog-hero')).toBeVisible();expect(await f.locator('html').evaluate(e=>e.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Editar',exact:true}).click();await page.getByRole('button',{name:'Baixar',exact:true}).click();await page.getByRole('button',{name:'Recomeçar com o modelo'}).click();await expect(page.getByRole('dialog',{name:'Recomeçar?'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog',{name:'Recomeçar?'})).toHaveCount(0);await page.screenshot({path:'verification/editor-mobile.png'});
});
test('normalização dos limites e precisão monetária',()=>{expect(priceCents('89,90')).toBe(8990);expect(priceCents('1.000,00')).toBe(null);expect(priceCents('-1')).toBe(null);expect(safeUrl('javascript:alert(1)')).toBe('');expect(()=>normalize({...defaults,heroImage:'data:image/svg+xml;base64,AAAA'})).toThrow();expect(()=>normalize({...defaults,products:Array(13).fill(defaults.products[0])})).toThrow();});
