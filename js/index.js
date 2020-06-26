let items = [];

function initalise() {

  items = document.querySelectorAll('.item');

  // create tags dynamically
  document.querySelectorAll('.tags').forEach( (e) => {
    let html = '';
    e.innerHTML.split(",").forEach( (w) => {
      if (w.trim() === '') { return; }
      html += '<span class="tag">'
        + w.trim().toLowerCase()
        + '&ZeroWidthSpace;'  // prevent double-click selection from spilling into adjacent span
        + '</span>';
    });
    e.innerHTML = html;
  });

  // ensure all links open in a new tab
  document.querySelectorAll("a").forEach( (e) => {
    e.getAttribute("href") && e.hostname !== location.hostname && (e.target = "_blank");
  });

  const searchBox = document.querySelector('.search input');
  const searchBoxClearButton = document.querySelector('.search .button-clear');

  searchBox.oninput = () => {
    search(searchBox.value.toLowerCase());
  };

  searchBoxClearButton.onclick = () => {
    searchBox.value = '';
    search('');
  };

}

function search(searchText) {

  const searchWrapper = document.querySelector('.search');
  const found = findItemsWithTag(searchText);

  for (let i=0; i<items.length; i++) {
    const item = items[i];
    if (found.includes(item)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  }

  const searchResult = document.querySelector('.search-wrapper .result')

  if (found.length == items.length) {

    searchWrapper.classList.remove('found');
    searchResult.classList.add('hidden');

  } else {

    searchWrapper.classList.add('found');
    searchResult.classList.remove('hidden');

    let m = 'Matches';
    if (found.length == 1) { m = 'Match'; }
    searchResult.textContent = found.length + ' ' + m;

  }

}

// find items with matching tags
function findItemsWithTag(s) {
  const found = new Set();
  for (let i=0; i<items.length; i++) {
    const tags = items[i].querySelectorAll('.tag');
    for (let j=0; j<tags.length; j++) {
      if (tags[j].textContent.includes(s)) {
        if (s !== '') {
          tags[j].classList.add('found');
        } else {
          tags[j].classList.remove('found');
        }
        found.add(items[i]);
      } else {
        tags[j].classList.remove('found');
      }

    }
  }
  return Array.from(found);
}
