function initalise() {

	var el_tags = document.getElementsByClassName('tags');
	for (i = 0; i < el_tags.length; ++i) {
		var html_tags = '';
		var words = el_tags[i].innerHTML.split(",");
		for (j = 0; j < words.length; ++j) {
			if (words[j].trim() == '') { continue; }
			html_tags += '<span class="tag">' + words[j].trim().toLowerCase() + '</span>';
		}
	    el_tags[i].innerHTML = html_tags;
	}

	// make all links open in new tab
	for (var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) { 
		var b = c[a]; 
		b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank") 
	}

}