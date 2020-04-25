let items = [];
const ZERO_WIDTH_SPACE = '&#8203;'; // prevent double-click selection from spilling into adjacent span

function initalise() {

  items = document.querySelectorAll('.item');

  // create tags dynamically
  document.querySelectorAll('.tags').forEach( (e) => {
    let html = '';
    e.innerHTML.split(",").forEach( (w) => {
      if (w.trim() === '') { return; }
      html += '<span class="tag">' + w.trim().toLowerCase() + ZERO_WIDTH_SPACE + '</span>';
    });
    e.innerHTML = html;
  });
 
  // ensure all links open in a new tab
  document.querySelectorAll("a").forEach( (e) => {
    e.getAttribute("href") && e.hostname !== location.hostname && (e.target = "_blank");
  });

  const filterWrapper = document.querySelector('.filter');
  const filter = document.querySelector('.filter input');
  const btnClear = document.querySelector('.filter .btn-clear');

  filter.oninput = () => {
    search(filter.value.toLowerCase());
  };

  btnClear.onclick = () => {
    filter.value = '';
    search('');
  };

}

function search(searchText) {

  const filterWrapper = document.querySelector('.filter');
  const found = findItemsWithTag(searchText);

  for (let i=0; i<items.length; i++) {
    const item = items[i];
    if (found.includes(item)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  }

  const foundResult = document.querySelector('.filter-wrapper .result')

  if (found.length == items.length) {
    filterWrapper.classList.remove('found');
    foundResult.classList.add('hidden');
  } else {
    filterWrapper.classList.add('found');
    foundResult.classList.remove('hidden');

    let m = 'Matches';
    if (found.length == 1) { m = 'Match'; }
    foundResult.textContent = found.length + ' ' + m;
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
