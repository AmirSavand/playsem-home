/**
 * Check if user has authentication token then redirect to the app
 */
if (document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/)) {
  location.href = 'https://app.playsem.com/';
}
