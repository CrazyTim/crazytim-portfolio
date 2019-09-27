function initalise() {

  // create tags dynamically
  document.querySelectorAll('.tags').forEach( (e) => {
    let html = '';
    e.innerHTML.split(",").forEach( (w) => {
      if (w.trim() === '') { return; }
      html += '<span class="tag">' + w.trim().toLowerCase() + '</span>';
    });
    e.innerHTML = html;
  });
 
  // ensure all links open in a new tab
  document.querySelectorAll("a").forEach( (e) => {
    e.getAttribute("href") && e.hostname !== location.hostname && (e.target = "_blank");
  });

}
