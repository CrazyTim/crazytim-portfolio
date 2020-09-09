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

  // Build list of matching articles and visually highlight matching tags:
  let foundArticles;
  {
    const found = new Set();
    articles.forEach(article => {
      const tags = article.querySelectorAll('.tag');
      tags.forEach(tag => {
        if (tag.textContent.includes(filterText)) {
          if (filterText !== '') {
            tag.classList.add('found');
          } else {
            tag.classList.remove('found');
          }
          found.add(article);
        } else {
          tag.classList.remove('found');
        }
      });
    });
    foundArticles = Array.from(found);
  }

  // Show found articles, hide the rest:
  articles.forEach(article => {
    if (foundArticles.includes(article)) {
      article.classList.remove('hidden');
    } else {
      article.classList.add('hidden');
    }
  });

  // Display the number of found articles:
  if (foundArticles.length === articles.length) {
    filterWrapper.classList.remove('found');
    filterResult.classList.add('hidden');
  } else {
    filterWrapper.classList.add('found');
    filterResult.classList.remove('hidden');
    filterResult.textContent = foundArticles.length + ' ' + (foundArticles.length === 1 ? 'Match' : 'Matches');
  }

}
