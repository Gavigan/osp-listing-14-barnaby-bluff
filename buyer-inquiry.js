// Native Bull Point form owns validation, consent, submission and confirmation.
// Only property/source context and bounded campaign tokens are supplied here.
(() => {
  const frame = document.getElementById('inline-Ex2VsTEBognqEcHUP05y');
  if (!frame) return;
  const target = new URL(frame.getAttribute('src'));
  const parameters = new URLSearchParams(location.search);
  const notes = [target.searchParams.get('multi_line_3pmc').split('\n\nMy question:')[0]];
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    const value = parameters.get(key);
    if (value && /^[A-Za-z0-9_. -]{1,100}$/.test(value)) {
      target.searchParams.set(key,value);
      notes.push(`${key}: ${value}`);
    }
  }
  target.searchParams.set('multi_line_3pmc',notes.join('\n')+'\n\nMy question: ');
  // Do not reload the cross-origin form unless campaign context actually changed.
  if (frame.src !== target.href) frame.src = target.href;
  document.querySelectorAll('[data-buyer-form-link]').forEach(link=>link.href=target.href);
  document.querySelectorAll('[data-concierge-inquiry]').forEach(link=>link.addEventListener('click',()=>{
    document.getElementById('close-concierge').click();
    document.getElementById('buyer-inquiry-title').setAttribute('tabindex','-1');
    document.getElementById('buyer-inquiry-title').focus({preventScroll:true});
  }));
})();
