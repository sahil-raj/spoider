const spoider = require("./spoider");

//handling promise by the fetchData function

spoider.fetchData("http://verbox.unaux.com/index.php").then((e) => {
    let x = e.serialize();
    console.log(x);
});
