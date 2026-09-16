// Native dialog keeps focus inside the enlarged diagram and supports Escape.
document.querySelectorAll('[data-diagram-zoom]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const dialog = document.createElement('dialog');
    dialog.className = 'diagram-dialog';
    dialog.setAttribute('aria-label', 'Enlarged gameplay diagram');
    const bar = document.createElement('div');
    bar.className = 'diagram-dialog__bar';
    const hint = document.createElement('span');
    hint.textContent = 'Scroll to explore the full diagram';
    const close = document.createElement('button');
    close.textContent = 'Close';
    const view = document.createElement('div');
    view.className = 'diagram-dialog__view';
    const img = document.createElement('img');
    img.src = link.href;
    img.alt = link.querySelector('img').alt;
    bar.append(hint, close); view.append(img); dialog.append(bar, view);
    document.body.append(dialog);
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { dialog.remove(); link.focus(); }, {once:true});
    dialog.showModal();
  });
});
