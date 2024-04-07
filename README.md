# Spoider

This is a simple web crawler implemented in JavaScript using Node.js. It crawls web pages starting from a given entry point URL, extracts URLs from anchor (`<a>`) tags, and continues to crawl those URLs recursively. The crawled URLs are normalized to prevent crawling duplicate or broken links.

## Installation

To use this web crawler in your project, you need to have Node.js installed on your system.

1. Clone or download this repository.
2. Navigate to the directory containing the files.
3. Install the required dependencies by running:

   ```bash
   npm install jsdom
   ```

## Usage

```javascript
const { normalizeURL, getUrls, fetchData, crawl } = require("./webCrawler");

// Example usage
const entryPoint = "https://example.com";
const limit = 100; // Optional parameter to limit the number of pages to crawl

crawl(entryPoint, limit)
  .then((crawledUrls) => {
    console.log("Crawled URLs:", crawledUrls);
  })
  .catch((error) => {
    console.error("Error during crawling:", error);
  });
```

## Functions

### `normalizeURL(myURL)`

Normalizes a URL by converting the hostname to lowercase and removing trailing slashes from the pathname.

### `getUrls(epoint)`

Extracts URLs from anchor tags (`<a>`) within a given HTML string.

### `fetchData(u)`

Fetches the HTML content of a given URL asynchronously.

### `crawl(entry, limit)`

Initiates the crawling process starting from the specified entry point URL. It crawls recursively and limits the number of pages crawled to the specified limit if provided.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
