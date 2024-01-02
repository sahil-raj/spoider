const spoider = require("./spoider");

//handling promise by the fetchData function

spoider.fetchData("http://verbox.unaux.com/index.php").then((e) => {
    console.log(e.window.document.body);
    console.log(typeof(e));
});
