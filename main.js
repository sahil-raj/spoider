const spoider = require("./spoider");

//handling promise by the fetchData function

spoider.fetchData("https://google.com").then((e) => {
    console.log(e);
});
