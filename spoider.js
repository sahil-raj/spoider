const { JSDOM } = require("jsdom");

//array of all the urls crawled
let crawled = [];


//normalize the urls before crwaling the so that no broken links are encountered and links are not crawled multiple times
function normalizeURL(myURL) {
    let urlObj = new URL(myURL);

    //convert whole hostname to lower case
    urlObj.host = urlObj.host.toLowerCase();

    //check for trailing slashes
    if (urlObj.pathname.slice(-1) == "/")
        urlObj.pathname = urlObj.pathname.slice(0, -1);

    return urlObj.host + urlObj.pathname;
}

//gets urls form the start point
//works only for a tags right now
function getUrls(epoint) {
    const dom = new JSDOM(epoint);
    let r = new Array();
    for (const ele of dom.window.document.querySelectorAll("a")) {
        //using url in each case to check for invalid urls
        //relative url
        if (ele.href.split(0,1) == "/") {
            try {
                const u = new URL(`${dom.window.location.protocol}${dom.window.location.host}${ele.href}`);
                r.push(normalizeURL(u.href));
            } catch (e) {
                console.log("Invalid URL", `${dom.window.location.protocol}${dom.window.location.host}${ele.href}`);
            }
        } else {
            try {
                const u = new URL(`${ele.href}`);
                r.push(normalizeURL(u.href));
            } catch (e) {
                console.log("Invalid URL", `${ele.href}`);
            }
        }
    }
    return r;
}

async function fetchData(u) {
    let r = await fetch(u);
    let dom = new JSDOM(await r.text());
    return {dom: dom, htmlText: await r.text()};
}

//function to start crawling and 
function crawl(entry) {
    return;
}

module.exports = {
    normalizeURL,
    getUrls,
    fetchData,
    crawl
}