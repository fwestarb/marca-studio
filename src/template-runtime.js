(()=>{
 const config=window.MARCA||{},root=document.documentElement,preference=matchMedia('(prefers-reduced-motion:reduce)');let pending=false;
 root.dataset.motion=config.motion?'on':'off';
 const revealed=[...document.querySelectorAll('[data-reveal]')];
 const scrollItems=[...document.querySelectorAll('.story-copy,.values article,.gallery-pictures .media,.team article,.faq,.contact,.product-picture')];
 let revealObserver;
 function revealSetup(){
  revealObserver?.disconnect();
  scrollItems.forEach(el=>el.classList.remove('scroll-waiting','scroll-visible'));
  if(!config.motion||preference.matches||!('IntersectionObserver' in window))return;
  revealObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('scroll-visible');revealObserver.unobserve(entry.target);}}, {threshold:.08});
  scrollItems.forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${(i%3)*45}ms`);el.classList.add('scroll-waiting');revealObserver.observe(el);});
 }
 revealSetup();preference.addEventListener('change',revealSetup);
 function update(){pending=false;const motion=config.motion&&!preference.matches;for(const el of revealed){const top=el.getBoundingClientRect().top,p=motion?Math.max(0,Math.min(1,(innerHeight*.95-top)/(innerHeight*.5))):1;el.style.setProperty('--p',p);el.querySelectorAll('.word>span').forEach((w,i,all)=>{const progress=Math.max(0,Math.min(1,p*1.4-(i/Math.max(1,all.length))*.4));w.style.transform=`translateY(${(1-progress)*104}%)`;});}
  document.querySelectorAll('[data-photo-reveal]').forEach(el=>{const p=motion?Math.max(0,Math.min(1,(innerHeight-el.getBoundingClientRect().top)/(innerHeight*.6))):1;el.style.clipPath=`inset(${(1-p)*12}% ${(1-p)*5}% 0 round var(--radius))`;});const portrait=document.querySelector('.hero-portrait');if(portrait&&config.effect&&motion)portrait.style.transform=`translateY(${Math.max(-16,Math.min(16,scrollY*.035))}px)`;
  if(config.preview)parent.postMessage({type:'marca-position',page:config.page,y:scrollY},'*');
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);preference.addEventListener('change',schedule);document.fonts.ready.then(schedule);
 const menu=document.querySelector('.menu-dialog'),opener=document.querySelector('.menu-toggle');
 function openDialog(dialog){if(!dialog||dialog.open)return;document.body.style.overflow='hidden';dialog.showModal();}
 document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>{document.body.style.overflow='';opener.setAttribute('aria-expanded','false');});d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();});});
 opener.addEventListener('click',()=>{openDialog(menu);opener.setAttribute('aria-expanded','true');});document.querySelector('.menu-close').addEventListener('click',()=>menu.close());menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.close()));
 document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>openDialog(document.getElementById(`produto-${button.dataset.product}`))));
 document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
 document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{const d=b.closest('dialog');const img=d.querySelector('.detail-image img');img.classList.remove('broken');d.querySelector('.detail-image').removeAttribute('data-image-error');img.src=b.dataset.photo;d.querySelectorAll('[data-photo]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
 document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('broken');img.parentElement.setAttribute('data-image-error','Imagem indisponível');}));
 const search=document.querySelector('#product-search'),sort=document.querySelector('#product-sort'),cards=[...document.querySelectorAll('.product-card')];let category='';
 const plain=v=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function filter(){let count=0;const query=plain(search.value.trim());cards.forEach(card=>{card.hidden=!!((category&&card.dataset.category!==category)||!plain(`${card.dataset.name} ${card.dataset.category}`).includes(query));if(!card.hidden)count++;});document.querySelector('#catalog-count').textContent=`${count} ${count===1?'produto':'produtos'}`;document.querySelector('.empty-results').hidden=count>0;const sorted=[...cards];if(sort.value==='name')sorted.sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name,'pt-BR'));if(sort.value==='price')sorted.sort((a,b)=>(a.dataset.price===''?Infinity:Number(a.dataset.price))-(b.dataset.price===''?Infinity:Number(b.dataset.price)));sorted.forEach(c=>c.parentElement.appendChild(c));}
 if(search){search.addEventListener('input',filter);sort.addEventListener('change',filter);document.querySelectorAll('[data-category-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.categoryFilter;document.querySelectorAll('[data-category-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filter();}));filter();}
 const rail=document.querySelector('.featured-rail');document.querySelectorAll('[data-rail]').forEach(b=>b.addEventListener('click',()=>rail?.scrollBy({left:Number(b.dataset.rail)*300,behavior:'smooth'})));rail?.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();rail.scrollBy({left:e.key==='ArrowRight'?280:-280,behavior:'smooth'});}});
 if(config.preview){document.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{if(a.dataset.page){e.preventDefault();parent.postMessage({type:'marca-page',page:a.dataset.page,section:a.dataset.section||''},'*');}else if(/^(https?:|mailto:)/.test(a.href)){e.preventDefault();parent.postMessage({type:'marca-link'},'*');}}));addEventListener('message',e=>{if(e.source!==parent)return;if(e.data?.type==='marca-navigate'&&['conteudo','historia','diferenciais','galeria','equipe','perguntas','contato','catalogo'].includes(e.data.section))document.getElementById(e.data.section)?.scrollIntoView({behavior:'smooth'});});}
 requestAnimationFrame(()=>{scrollTo({top:config.scroll||0,behavior:'instant'});update();root.classList.add('ready');if(config.preview)parent.postMessage({type:'marca-ready'},'*');});
})();
