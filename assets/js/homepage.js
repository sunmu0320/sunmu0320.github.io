// Progressive enhancement only: all homepage content is present in HTML.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.header-navigation');
  const mobile = window.matchMedia('(max-width: 760px)');

  if (toggle && navigation) {
    const setOpen = (open, returnFocus = false) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? '−' : '+';
      navigation.hidden = mobile.matches && !open;
      if (returnFocus) toggle.focus();
    };
    const syncLayout = () => {
      toggle.hidden = !mobile.matches;
      setOpen(false);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    navigation.addEventListener('click', event => {
      if (event.target.closest('a') && mobile.matches) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header') && mobile.matches) setOpen(false);
    });
    mobile.addEventListener('change', syncLayout);
    syncLayout();
  }

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });
})();
