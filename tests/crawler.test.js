const {normalizeURL, getUrls} = require("../spoider.js");
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
    const i = '<a href="test.com" /> <a href="" />';
    const ac = getUrls(i);
    const ex = ["test.com", ""];
    expect(ac).toEqual(ex);
});