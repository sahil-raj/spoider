const { JSDOM } = require("jsdom");

//array of all the urls crawled
let crawled = [], toCrawl = [];


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
    let r = [];
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
    let r  = await fetch(u);
    return r.text();
}

//function to start crawling and 
async function crawl(entry, limit=10) {
    let c = 0;
    toCrawl.push(entry);
    while(toCrawl.length > 0) {
        ++c;
        if (c > limit)
            break;
        console.log(`currently crawling... ${toCrawl[toCrawl.length-1]}`);
        await fetchData(toCrawl[toCrawl.length-1]).then((data) => {
            let burls = getUrls(data);
            for (const l in burls) {
                if (!crawled.includes(l) && !toCrawl.includes(l))
                    toCrawl.push(l);
            }
            crawled.push(toCrawl[toCrawl.length-1]);
        }).catch((err) => {
            console.log(`Error while crawling ${toCrawl[toCrawl.length-1]}`);
        }).finally(() => {
            toCrawl.pop();
        });
    }
    return crawled;
}

module.exports = {
    normalizeURL,
    getUrls,
    fetchData,
    crawl
}