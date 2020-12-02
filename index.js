var express = require('express');


const app = express();
const port=1234;
app.set('view engine', 'ejs');
//import controller
var maincontroller = require('./controllers/maincontroller');
app.use(express.static(__dirname + '/public'));

//Routes
app.use('/index',maincontroller);

app.get('/',function(req,res)
{
    res.redirect('/index');
});




app.listen(port,()=> console.log("Listenting on port"+port));