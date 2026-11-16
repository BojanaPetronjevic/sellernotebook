/* Seller Notebook – photo viewer.
   Opens a photo bigger on top of the page when a visitor clicks it.
   Works on any link with the attribute data-photo-viewer that points to an image.
   Click anywhere or press Esc to close. Without JavaScript the link simply
   opens the image in a new tab. Plain JavaScript, no libraries. */

var PHOTO_VIEWER_SETTINGS = {
  linkSelector: 'a[data-photo-viewer]',
  closeLabel: 'Close photo'
};

(function () {
  var links = document.querySelectorAll(PHOTO_VIEWER_SETTINGS.linkSelector);
  if (!links.length) {
    return;
  }

  var overlay = createOverlay();
  var overlayImage = overlay.querySelector('img');
  var closeButton = overlay.querySelector('button');
  var lastFocusedLink = null;

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      openPhoto(link);
    });
  });

  overlay.addEventListener('click', closePhoto);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closePhoto();
    }
  });

  function createOverlay() {
    var element = document.createElement('div');
    element.className = 'photo-viewer';
    element.setAttribute('role', 'dialog');
    element.setAttribute('aria-modal', 'true');
    element.innerHTML = '<button type="button" class="photo-viewer-close" aria-label="' +
      PHOTO_VIEWER_SETTINGS.closeLabel + '">&times;</button><img alt="">';
    document.body.appendChild(element);
    return element;
  }

  function openPhoto(link) {
    var thumbnail = link.querySelector('img');
    lastFocusedLink = link;
    overlayImage.src = link.getAttribute('href');
    overlayImage.alt = thumbnail ? thumbnail.alt : '';
    overlay.classList.add('is-open');
    document.body.classList.add('photo-viewer-open');
    closeButton.focus();
  }

  function closePhoto() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('photo-viewer-open');
    overlayImage.removeAttribute('src');
    if (lastFocusedLink) {
      lastFocusedLink.focus();
    }
  }
})();
