/* Progressive enhancement: links remain usable without JavaScript. */
(()=>{
 const menu=document.querySelector('.menu-button'),nav=document.querySelector('header nav');
 if(document.body.dataset.property==='barnaby'){
   menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
   nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}));
 }
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.focus()}});
 document.querySelectorAll('[data-open-guide]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.concierge-launcher').click()));
 const viewer=document.getElementById('image-viewer'),picture=viewer.querySelector('img'),title=viewer.querySelector('h2'),original=viewer.querySelector('a');
 document.querySelectorAll('a[data-view-image]').forEach(a=>a.addEventListener('click',e=>{
   if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||typeof viewer.showModal!=='function')return;
   e.preventDefault();const img=a.querySelector('img');picture.src=a.href;picture.alt=img.alt;title.textContent=a.dataset.viewImage||'Explore the details';original.href=a.href;viewer.showModal();
 }));
 viewer.querySelector('button').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
})();
