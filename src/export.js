import {zipSync,strToU8} from 'fflate';
import {normalize} from './model';
import {fontPaths,siteFiles} from './template';
import license from '../LICENSE?raw';
export function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
async function asset(path){const r=await fetch(`${import.meta.env.BASE_URL}${path}`);if(!r.ok)throw new Error('Um recurso do modelo não carregou. Tente novamente.');return new Uint8Array(await r.arrayBuffer());}
let fonts;
export function previewFonts(){return fonts??=Promise.all([['roman',fontPaths[0]],['italic',fontPaths[1]],['sans',fontPaths[3]],['condensed',fontPaths[5]]].map(async([key,path])=>{const bytes=await asset(path),data=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(new Blob([bytes],{type:'font/woff2'}));});return [key,data];})).then(Object.fromEntries);}
export async function exportSite(value){
 const c=normalize(value),files={},assets={};await Promise.all(fontPaths.map(async p=>files[p]=await asset(p)));
 async function add(key,data,fallback){if(data){const [,type,base64]=data.match(/^data:image\/(png|jpeg|webp);base64,(.+)$/),path=`images/${key}.${type==='jpeg'?'jpg':type}`;files[path]=Uint8Array.from(atob(base64),x=>x.charCodeAt(0));assets[key]=path;}else{const path=`examples/${fallback}`;files[path]??=await asset(path);assets[key]=path;}}
 await add('hero',c.heroImage,'atelier.png');await add('banner',c.bannerImage,'collection.svg');if(c.logo)await add('logo',c.logo,'');
 await add('gallery-0',c.galleryImages[0],'atelier.png');await add('gallery-1',c.galleryImages[1],'collection.svg');
 for(const [i,p] of c.products.entries())for(const [j,data] of (p.images.length?p.images:['']).entries())await add(`product-${i}-${j}`,data,`${p.example}.svg`);
 for(const [path,source] of Object.entries(siteFiles(c,assets)))files[path]=strToU8(source);
 files['projeto.marca.json']=strToU8(JSON.stringify(c,null,2));files['LICENSE.txt']=strToU8(license);files['.nojekyll']=strToU8('');
 files['LEIA-ME.txt']=strToU8(`MARCA STUDIO — SEU SITE\n\nExtraia todos os arquivos. Abra index.html para a apresentação da empresa e produtos.html para o catálogo. Mantenha estilos, scripts, imagens e fontes juntos. O site funciona offline sem Node.js, editor ou API. Links externos e contatos abrem seus respectivos serviços.\n\nPara publicar: envie esta pasta para uma hospedagem estática, ou coloque os arquivos na pasta publicada do GitHub Pages (por exemplo docs), selecionando a branch/pasta em Settings > Pages.\n\nPara continuar editando: importe projeto.marca.json no Marca Studio. Ele inclui suas imagens e configurações.\n\nNão há carrinho, pagamento, envio de pedidos, login ou estoque sincronizado. Preços e informações são preenchidos pelo responsável pela empresa. Não inclua informações de pagamento sensíveis.\n\nCasa Amora é uma marca fictícia. Produtos ilustrativos e foto de ateliê gerada por IA são exemplos substituíveis, não provas de uma empresa real. Fontes locais Cormorant Garamond, Manrope e Barlow Condensed usam SIL OFL; licenças incluídas. Código do modelo: MIT, Felipe Westarb.\n`);
 const zip=zipSync(files,{level:6}),slug=c.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'minha-marca';download(new Blob([zip],{type:'application/zip'}),`${slug}-site.zip`);
}
