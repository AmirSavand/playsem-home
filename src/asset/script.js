/**
 * Check if user has authentication token then redirect to the app
 */
if (document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/)) {
  location.href = 'https://app.playsem.com/';
}

/**
 * Set section height to screen size
 */
for (const event of ['orientationchange', 'load', 'resize']) {
  window.addEventListener(event, () => {
    document.querySelectorAll('#main').forEach(element => {
      const height = window.innerHeight - document.getElementsByTagName('header')[0].clientHeight;
      element.style.minHeight = height + 'px';
    });
  });
}

