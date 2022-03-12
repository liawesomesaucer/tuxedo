/* global chrome */
function addSiteFilter(id) {
  document.body.insertAdjacentHTML('beforeend', `<div ${id && `id="${id}"`} class="tuxedo"></div>'`);
}

function isCurrentHostBlocked(blockedHostList) {
  if (!blockedHostList) {
    return false;
  }

  for (const host of blockedHostList) {
    if (window.location.host.includes(host)) {
      return true;
    }
  }

  return false;
}

/**
 * We insert twice, once to begin with and once at the end. The first insert happens
 * when body is ready, which allows us to start the load with the gray filter. The
 * second load prevents anyone else from creating an element that could exist above
 * the filter (z-index-wise)
 */
var enabled;
const observer = new MutationObserver(function() {
  if (document.body) {
    chrome.storage.local.get(null, function(result) {
      if (
        isCurrentHostBlocked(
          Object.entries(result).filter(([k, v]) => !!v).map(([k, v]) => k)
        )
      ) {
        enabled = true;
        addSiteFilter('tuxedo-1');
      }
    });
    observer.disconnect();
  }
});
observer.observe(document.documentElement, {childList: true});

document.addEventListener('DOMContentLoaded', () => {
  if (enabled) {
    // beforeend as lowest one down appears at the top
    addSiteFilter('tuxedo-2')
    // Remove the original
    document.getElementById('tuxedo-1').remove()
  }
});

// Handle if the current site gets blocked
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (window.location.host === key && newValue) {
      addSiteFilter()
    }
  }
});