/**
 * We insert twice, once to begin with and once at the end. The first insert happens
 * when body is ready, which allows us to start the load with the gray filter. The
 * second load prevents anyone else from creating an element that could exist above
 * the filter (z-index-wise)
 */
var observer = new MutationObserver(function() {
  if (document.body) {
    document.body.insertAdjacentHTML('afterbegin', '<div id="tuxedo-1" class="tuxedo"></div>');
    observer.disconnect();
  }
});
observer.observe(document.documentElement, {childList: true});

document.addEventListener('DOMContentLoaded', () => {
  // beforeend as lowest one down appears at the top
  document.body.insertAdjacentHTML('beforeend', '<div id="tuxedo-2" class="tuxedo"></div>');
  // Remove the original
  document.getElementById('tuxedo-1').remove()
});
