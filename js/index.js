let articles;

window.addEventListener('DOMContentLoaded', () => initalise() );

function initalise() {

  articles = document.querySelectorAll('article');

  // Build tags:
  // Tags are written in plain text for convenience.
  // Convert them to DOM elements so they can be styled.
  document.querySelectorAll('.tags').forEach(e => {
    let html = '';
    e.innerHTML.split(",").forEach(w => {
      if (w.trim() === '') { return; }
      html += '<span class="tag">'
        + w.trim().toLowerCase()
        + '&ZeroWidthSpace;'  // Prevent double-click selection from spilling into adjacent span.
        + '</span>';
    });
    e.innerHTML = html;
  });

  // Ensure all links open in a new tab:
  document.querySelectorAll('a').forEach(e => {
    e.getAttribute('href') && e.hostname !== location.hostname && (e.target = '_blank') && (e.rel = 'noopener');
  });

  // Define event listners...

  const filterBox = document.querySelector('.filter input');
  const filterBoxClearButton = document.querySelector('.filter .button-clear');

  filterBox.oninput = () => {
    filter(filterBox.value.toLowerCase());
  };

  filterBoxClearButton.onclick = () => {
    filterBox.value = '';
    filter('');
  };

  document.querySelector('.icon-filter').onclick = () => {
    filterBox.setSelectionRange(0,0);
    filterBox.focus();
  }

}

/**
 * Highlight tags that match `filterText` and hide articles that don't have matching tags.
 */
function filter(filterText) {

  const filterWrapper = document.querySelector('.filter');
  const filterResult = document.querySelector('.filter-wrapper .result');

  // Find matching tags and visually highlight them.
  // Build a list of the matching articles.
  let found;
  {
    const f = new Set();
    for (let i = 0; i < articles.length; i++) {
      const tags = articles[i].querySelectorAll('.tag');
      for (let j = 0; j < tags.length; j++) {
        if (tags[j].textContent.includes(filterText)) {
          if (filterText !== '') {
            tags[j].classList.add('found');
          } else {
            tags[j].classList.remove('found');
          }
          f.add(articles[i]);
        } else {
          tags[j].classList.remove('found');
        }
      }
    }
    found = Array.from(f);
  }

  // Show found articles, hide the rest:
  for (let i = 0; i < articles.length; i++) {
    if (found.includes(articles[i])) {
      articles[i].classList.remove('hidden');
    } else {
      articles[i].classList.add('hidden');
    }
  }

  // Display the number of found articles:
  if (found.length === articles.length) {
    filterWrapper.classList.remove('found');
    filterResult.classList.add('hidden');
  } else {
    filterWrapper.classList.add('found');
    filterResult.classList.remove('hidden');
    filterResult.textContent = found.length + ' ' + (found.length === 1 ? 'Match' : 'Matches');
  }

}
