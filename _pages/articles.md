---
layout: null
permalink: /blog/
---

test 2

<ul>
{% for article in site.articles %}
  <li>
    <h2>
      {{ article.date }}
    </h2>
    <h2>
      {{ article.title }}
    </h2>
    <div>url: {{ article.url }}</div>
  </li>
{% endfor %}
</ul>
