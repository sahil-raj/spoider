const url = require("url");
const {JSDOM} = require("jsdom");


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

function getUrls(epoint) {
    const x = new JSDOM(epoint);
    let p = [];
    for (let i of x.window.document.querySelectorAll("h1"))
        p.push(i);
    return p;
}

module.exports = {
    normalizeURL,
    getUrls
}