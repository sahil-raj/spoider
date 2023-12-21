const spoider = require("./spoider");

const myVal = spoider.normalizeURL("https://tEsT.wEb.cOm/path/mypage.php/?d=tt#div");

console.log(myVal);

console.log(spoider.getUrls("http://verbox.uanux.com/index.php"));