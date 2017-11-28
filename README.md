# Image Search Abstraction Layer

----
This microservice preforms an image search. It return URLs, alt text and page urls for a set of images relating to a given search string.
You can paginate through the responses by adding a ?offset=2 parameter to the URL.

Most recently submitted search strings are returned at this [URL](https://dfire-image-search-abstraction.glitch.me/imagesearch/lol%20cats) `https://dfire-image-search-abstraction.glitch.me/latest/`

Example Usage:
The search string is appended to the end of this url:
`https://dfire-image-search-abstraction.glitch.me/imagesearch/`

if you wanted to search for "lol cats" you would use the following:
`https://dfire-image-search-abstraction.glitch.me/imagesearch/lol cats`
