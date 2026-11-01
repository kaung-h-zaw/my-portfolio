# Google Search Console setup

The production site is `https://imkaung.pages.dev/`.

The repository includes a canonical URL, search description, structured data, robots.txt, and sitemap. The connected tools cannot create a Search Console property or submit an indexing request for your Google account.

Complete these account steps:

1. Open https://search.google.com/search-console and add a **URL-prefix** property for `https://imkaung.pages.dev/`.
2. Verify ownership using the **HTML tag** method. The site retains its existing `google-site-verification` tag in `index.html`; compare its content with the token Google gives this property. If they differ, replace that tag's content with the new token, deploy, and verify.
3. In **Sitemaps**, submit `sitemap.xml`. The full URL is https://imkaung.pages.dev/sitemap.xml.
4. Use **URL inspection** on https://imkaung.pages.dev/, run a live test, and choose **Request indexing**.
5. Check the indexing report after Google processes the request. Indexing and search appearance are not immediate or guaranteed.

Public crawl endpoints:

- https://imkaung.pages.dev/robots.txt
- https://imkaung.pages.dev/sitemap.xml

Google's instructions: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
