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

//gets urls form the start point
//works only for a tags right now
function getUrls(epoint) {
    const x = new JSDOM(epoint);
    let r = [];
    for (const l of x.window.document.querySelectorAll("a"))
        r.push(l.href);
    return r;
}

module.exports = {
    normalizeURL,
    getUrls
}