const {normalizeURL, getUrls, fetchData} = require("../spoider.js");
const {test, expect} = require("@jest/globals");


//tests for normalizing the url
//test to check only mian url is getting in
test("normalizeURL Only main path", () => {
    const input = "https://test.mynet.com/path/page.html";
    const actual = normalizeURL(input);
    const expected = "test.mynet.com/path/page.html";
    expect(actual).toEqual(expected);
});

//test to check for trailing slashes in Url
test("normalizeURL trailing slashes", () => {
    const input = "http://www.test.mynet.com/path/page/";
    const actual = normalizeURL(input);
    const expected = "www.test.mynet.com/path/page";
    expect(actual).toBe(expected);
});

//main part of the url is case insensitive so normalize that
//eg-> WwW.gOoGle.CoM is same as www.google.com
test("normlizeURL caps", () => {
    const input = "http://TeSt.mYNet.cOm/path/page.php/?t=d#div";
    const actual = normalizeURL(input);
    const expected = "test.mynet.com/path/page.php";
    expect(actual).toBe(expected);
});

//test for grabing the links from testUrls function
//only working for a tag
test("getUrls html", () => {
    const i = '<a href="http://TeSt.mYNet.cOm/path/page.php/?t=d#div" /> <a href="" />';
    const ac = getUrls(i);
    const ex = ["test.mynet.com/path/page.php"];
    expect(ac).toEqual(ex);
});

test("getUrls relative URLs", () => {
    const i = '<a href="http://TeSt.mYNet.cOm/path/page.php/?t=d#div" /> <a href="/main/test/" />';
    const ac = getUrls(i);
    const ex = ["test.mynet.com/path/page.php", "test.com/main/test/"];
    expect(ac).toEqual(ex);
});

//test for fetchData function
//test to check if returned data is html
test("fetchData dom", () => {
    const i = "https://google.com";
    const ac = typeof(fetchData(i).then((e) => {console.log(e);e.window.document.body}));//make sure there is a body of the returned object
    const ex = typeof({});
    expect(ac).toEqual(ex);
});
