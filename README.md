# My portfolio website

- Jekyll site running on GitHub Pages.
- [Minima theme](https://github.com/jekyll/minima).


## Getting started

```sh
bundle install
bundle exec jekyll serve -o -l
```

Refer to [testing-your-github-pages-site-locally-with-jekyll](https://help.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll).


## Dependancies

GitHub Pages uses its own setup and will ignore the `gemfile`, so this is only needed for local development and we don't need to commit `gemfile.lock`. See https://pages.github.com/versions for a list of the dependancies used by GitHub Pages.


## Custom domain

It is very simple. See [configuring-an-apex-domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)


### SEO

Refer to [jekyll-seo-tag usage](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md) (used by Minima theme).