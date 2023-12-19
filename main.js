const spoider = require("./spoider");

const myVal = spoider.normalizeURL("https://test.web.com/path/mypage.php#div?d=tt");

console.log(myVal);