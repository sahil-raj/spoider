const url = require("url")

//normalize the urls before crwaling the so that no broken links are encountered and links are not crawled multiple times
function normalizeURL(myURL) {
    let urlObj = new URL(myURL);

    //convert whole hostname to lower case
    urlObj.host = urlObj.host.toLowerCase();

    //check for trailing slashes
    if(urlObj.pathname.slice(-1) == "/")
        urlObj.pathname = urlObj.pathname.slice(0,-1);

    return urlObj.host + urlObj.pathname;
}

module.exports = {
    normalizeURL
}