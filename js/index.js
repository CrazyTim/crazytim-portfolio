window.articles = [];
/*
List of article objects:
  {
    node: DOM Node
    tagNodes: Array
  }
*/

const uniqueTags = new Set();
const tagButtons = [];
const filterWrapper = document.querySelector('.filter search');
const filterResult = document.querySelector('.filter .filter-results');

window.addEventListener('DOMContentLoaded', () => initalise() );

function initalise() {

  // Ensure all links open in a new tab:
  document.querySelectorAll('a').forEach(e => {
    e.getAttribute('href') && e.hostname !== location.hostname && (e.target = '_blank') && (e.rel = 'noopener');
  });

  // Build tags - convert them to DOM elements so they can be styled.
  // Tags are written in plain text for convenience when writing the html.
  document.querySelectorAll('.tags').forEach(e => {
    let html = '';
    e.innerHTML.split(",").forEach(w => {
      if (w.trim() === '') { return; }
      let tag = w.trim().toLowerCase();
      uniqueTags.add(tag);
      html += `<span class="tag">${tag}</span>`
        + '&ZeroWidthSpace;';  // Prevent double-click selection from spilling into adjacent span.
    });
    e.innerHTML = html;
  });

  // Build list of articles:
  document.querySelectorAll('article').forEach(article => {
    articles.push({
      node: article,
      tagNodes: Array.from(article.querySelectorAll('.tag')),
    })
  });

  // Add filter buttons for each tag:
  [...uniqueTags].toSorted().forEach(tag => {
    const btn = document.createElement('button');
    tagButtons.push(btn);
    btn.textContent = tag;
    filterWrapper.append(btn);
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');

      // Scroll to filter section if out of view
      if (document.querySelector('section.portfolio').getBoundingClientRect().y > window.innerHeight) {
        document.querySelector('section.filter').scrollIntoView({behavior:'smooth'});
      }

      filter(
        tagButtons.filter(btn => btn.classList.contains('selected')).map(btn => btn.textContent)
      );
    });
  });

  filterResult.addEventListener('click', () => {
    tagButtons.forEach(btn => btn.classList.remove('selected'));
    filter([]);
  });

}

/**
 * Find articles with certain tags, hide the other articles, and highlight the matching tags.
 */
function filter(terms = []) {

  const found = new Set();

  articles.forEach(article => {
    article.tagNodes.forEach(tagNode => {
      if (terms.includes(tagNode.textContent)) {
        tagNode.classList.add('found');
        found.add(article);
      } else {
        tagNode.classList.remove('found');
      }
    });
  });

  let foundArticles = Array.from(found);

  if (foundArticles.length === 0) foundArticles = articles;

  // Show found articles, hide the rest:
  articles.forEach(article => {
    if (foundArticles.includes(article)) {
      article.node.classList.remove('hidden');
    } else {
      article.node.classList.add('hidden');
    }
  });

  // Display the number of found articles:
  if (foundArticles.length === 0 || foundArticles.length === articles.length) {
    filterResult.classList.add('hidden');
  } else {
    filterResult.classList.remove('hidden');
    filterResult.querySelector('span').textContent = foundArticles.length;
  }

}