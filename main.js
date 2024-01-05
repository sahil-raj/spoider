const spoider = require("./spoider");

// handling promise by the fetchData function

// spoider.fetchData("http://verbox.unaux.com/index.php").then((e) => {
//     let x = e.serialize();
//     console.log(x);
// });

// spoider.fetchData("https://google.com").then((e) => {
//     try {
//         console.log(e);
//     } catch(er) {
//         console.log(`failed`);
//     }
// });

// console.log(spoider.normalizeURL("https://google.com"));

spoider.crawl("https://netflix.com").then((e) => {console.log(e)});