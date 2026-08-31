document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const value = button.dataset.copy;
  const label = button.dataset.copyLabel;
  const tip = button.querySelector('.header-tooltip, .contact-copy-tooltip');
  if (!tip) return;
  const defaultText = tip.dataset.defaultText || tip.textContent;
  tip.dataset.defaultText = defaultText;

  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }

  tip.textContent = `${label}已复制`;
  button.classList.add('copied');
  setTimeout(() => {
    tip.textContent = defaultText;
    button.classList.remove('copied');
  }, 2200);
}));

const scrollHint = document.querySelector('.global-scroll-hint');
const contactSection = document.querySelector('#contact');
if (scrollHint && contactSection) {
  let contactIsVisible = false;
  let resumeHintTimer;

  const hideHint = () => {
    scrollHint.classList.add('is-hidden');
    clearTimeout(resumeHintTimer);
  };

  const scheduleHint = (delay = 5000) => {
    clearTimeout(resumeHintTimer);
    if (contactIsVisible) return;
    resumeHintTimer = setTimeout(() => {
      if (!contactIsVisible) scrollHint.classList.remove('is-hidden');
    }, delay);
  };

  new IntersectionObserver(([entry]) => {
    contactIsVisible = entry.isIntersecting;
    if (contactIsVisible) hideHint();
    else scheduleHint();
  }, { threshold: 0.12 }).observe(contactSection);

  document.addEventListener('scroll', () => {
    hideHint();
    scheduleHint((document.scrollingElement?.scrollTop || 0) < 8 ? 1000 : 5000);
  }, { passive: true });
}
