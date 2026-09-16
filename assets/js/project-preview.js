const frame = document.querySelector('iframe');
document.querySelectorAll('[data-width]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-width]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    frame.style.width = `${button.dataset.width}px`;
    frame.style.height = `${button.dataset.height}px`;
    frame.title = `Project detail template ${button.textContent} preview`;
  });
});
