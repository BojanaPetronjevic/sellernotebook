/* Seller Notebook – scroll and hero animations.
   Plain JavaScript, no libraries. Timings live in ANIMATION_SETTINGS.
   Nothing runs for visitors who turned off animations in their device settings,
   and without JavaScript every element simply stays visible. */

var ANIMATION_SETTINGS = {
  wordDelayMilliseconds: 70,      // pause between hero words appearing
  cardStaggerMilliseconds: 90,    // pause between cards in the same grid
  revealThreshold: 0.15,          // how much of an element must be on screen before it appears
  revealSelector: '.card, main h2, .summary, .table-of-contents, .prompt, .note, .compare, .author-box, .lead'
};

(function () {
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  document.documentElement.classList.add('animations-on');

  splitHeroHeadingIntoWords();
  prepareRevealElements();
  watchElements();
  addSafetyNet();

  // If a browser is slow to report what is on screen, show the hero and
  // everything already in view after a short wait, so nothing stays hidden.
  function addSafetyNet() {
    setTimeout(function () {
      var heading = document.querySelector('.hero h1');
      if (heading) {
        heading.classList.add('is-visible');
      }
      document.querySelectorAll('.reveal:not(.is-visible), main mark:not(.is-visible)').forEach(function (element) {
        var box = element.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          element.classList.add('is-visible');
        }
      });
    }, 1500);
  }

  function splitHeroHeadingIntoWords() {
    var heading = document.querySelector('.hero h1');
    if (!heading) {
      return;
    }
    var wordIndex = 0;

    function wrapWords(textNode) {
      var fragment = document.createDocumentFragment();
      textNode.textContent.split(/(\s+)/).forEach(function (part) {
        if (part.trim() === '') {
          fragment.appendChild(document.createTextNode(part));
          return;
        }
        var word = document.createElement('span');
        word.className = 'hero-word';
        word.style.transitionDelay = (wordIndex * ANIMATION_SETTINGS.wordDelayMilliseconds) + 'ms';
        word.textContent = part;
        fragment.appendChild(word);
        wordIndex += 1;
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    }

    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === Node.TEXT_NODE) {
          wrapWords(child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    }

    walk(heading);

    // The highlighter starts drawing once the last word has appeared.
    heading.querySelectorAll('mark').forEach(function (mark) {
      mark.style.transitionDelay = (wordIndex * ANIMATION_SETTINGS.wordDelayMilliseconds + 150) + 'ms';
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heading.classList.add('is-visible');
      });
    });
  }

  function prepareRevealElements() {
    document.querySelectorAll(ANIMATION_SETTINGS.revealSelector).forEach(function (element) {
      if (element.closest('.hero')) {
        return;
      }
      element.classList.add('reveal');
    });

    document.querySelectorAll('.card-grid').forEach(function (grid) {
      Array.prototype.slice.call(grid.children).forEach(function (card, index) {
        card.style.transitionDelay = (index * ANIMATION_SETTINGS.cardStaggerMilliseconds) + 'ms';
      });
    });
  }

  function watchElements() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var element = entry.target;
          element.classList.add('is-visible');
          observer.unobserve(element);
          // Once a card has appeared, drop its stagger delay so the hover lift reacts at once.
          var staggerDelay = parseInt(element.style.transitionDelay, 10) || 0;
          setTimeout(function () { element.style.transitionDelay = ''; }, staggerDelay + 700);
        }
      });
    }, { threshold: ANIMATION_SETTINGS.revealThreshold });

    document.querySelectorAll('.reveal, main mark').forEach(function (element) {
      if (element.closest('.hero h1')) {
        return;
      }
      observer.observe(element);
    });
  }
})();
