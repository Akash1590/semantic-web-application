var express = require('express');
var router = express.Router();
var fs = require("fs");
/* const http=require("http"); */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


let subjectdata;
let fulldataset;
function getData() {
    var testQuery = "PREFIX owl: <http://www.w3.org/2002/07/owl#> select distinct  ?subject ?predicate ?object {?subject a owl:Class; ?predicate ?object FILTER(!isBlank(?subject)) }";
    var url = "http://localhost:3030/dataset"
    var params = "testQuery"
    var data;
    var http = new XMLHttpRequest();
    http.open("POST", url + "?query=" + encodeURIComponent(testQuery), true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {

            console.log("Successfull");
            getdata = http.responseText;
            fs.writeFileSync('data.txt', getdata);
            var value = JSON.parse(getdata);

            var dataset = value["results"]["bindings"];
            var subject = [];
            var counter = 0;
            for (var i in dataset) {
                var flag = true;
                subject.forEach(element => {
                    if (element === dataset[i].subject.value) {
                        flag = false;
                    }
                });
                if (flag == true) {
                    subject[counter] = dataset[i].subject.value;
                    counter = counter + 1;
                }

            }
            subject.forEach(element => {
                var counter = 0;
                for (var i in dataset) {
                    if (element === dataset[i].subject.value) {
                        counter++;
                    }
                }

            });
            subjectdata = subject;
            fulldataset = dataset;


        }


    }
    http.send();

}

router.get('/',function(req,res)
{
    var testQuery = "PREFIX owl: <http://www.w3.org/2002/07/owl#> select distinct  ?subject ?predicate ?object {?subject a owl:Class; ?predicate ?object FILTER(!isBlank(?subject)) }";
    var url = "http://localhost:3030/dataset"
    var params = "testQuery"
    var data;
    var http = new XMLHttpRequest();
    http.open("POST", url + "?query=" + encodeURIComponent(testQuery), true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            
            console.log("Successfull");
            getdata = http.responseText;
            fs.writeFileSync('data.txt', getdata);
            var value = JSON.parse(getdata);
            
            var dataset = value["results"]["bindings"];
            var subject=[];
            var predicate = [];
            var object = [];
            
            var counter = 0;
            for(var i in dataset )
            {
                var flag=true;
                subject.forEach(element => {
                    if (element === dataset[i].subject.value )
                    {
                        flag=false;
                    }
                });
                if(flag==true)
                {
                    subject[counter] = dataset[i].subject.value;
                    counter = counter + 1;
                }
                                
            }
            subject.forEach(element=>{
                var counter=0;
                for(var i in dataset)
                {
                    if (element === dataset[i].subject.value)
                    {
                        counter++;
                    }
                    
                }
                


            });
            for (var i in subject)
            {
                subject[i] = subject[i].replace('http://bigmedilytics.eu/vocab/','');
            }
            
            // subjectdata=subject;
            // fulldataset=dataset;
            
            res.render('index', { data: subject, object: object, predicate: predicate});
        }
       

    }
    http.send();

    
});

router.get('/draw', function (req, res) {
    var testQuery = "PREFIX owl: <http://www.w3.org/2002/07/owl#> select distinct  ?subject ?predicate ?object {?subject a owl:Class; ?predicate ?object FILTER(!isBlank(?subject)) }";
    var url = "http://localhost:3030/dataset"
    var params = "testQuery"
    var data;
    var http = new XMLHttpRequest();
    http.open("POST", url + "?query=" + encodeURIComponent(testQuery), true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {

            console.log("Successfull");
            getdata = http.responseText;
            fs.writeFileSync('data.txt', getdata);
            var value = JSON.parse(getdata);

            var dataset = value["results"]["bindings"];
            var subject = [];
            var counter = 0;
            for (var i in dataset) {
                var flag = true;
                subject.forEach(element => {
                    if (element === dataset[i].subject.value) {
                        flag = false;
                    }
                });
                if (flag == true) {
                    subject[counter] = dataset[i].subject.value;
                   
                    counter = counter + 1;
                }

            }
            subject.forEach(element => {
                var counter = 0;
                for (var i in dataset) {
                    if (element === dataset[i].subject.value) {
                        counter++;
                    }
                }

            });
            // subjectdata = subject;
            // fulldataset = dataset;
            //console.log(req.query.q);
            var selectedsubject = req.query.q;
            selectedsubject ='http://bigmedilytics.eu/vocab/'+selectedsubject;
            //console.log(selectedsubject);
            // var subject = subjectdata;
            // var dataset = fulldataset;
            var counter = 0;
            var predicate = [];
            var object = [];
            for (var i in dataset) {
                if (selectedsubject === dataset[i].subject.value) {
                    predicate[counter] = dataset[i].predicate.value;
                    object[counter] = dataset[i].object.value;
                    //console.log(dataset[i].predicate);
                    counter++;
                }
            }
            for (var i in subject) {
                subject[i] = subject[i].replace('http://bigmedilytics.eu/vocab/', '');
            }
            selectedsubject = selectedsubject.replace('http://bigmedilytics.eu/vocab/','');
            for(var i in predicate)
            {
                if (predicate[i].charAt(predicate[i].length - 1) == '/') {
                    predicate[i] = predicate[i].substr(0, predicate[i].length - 1);
                }
                var words=predicate[i].split('/');
                console.log(words[words.length-1]);
                
                predicate[i] = words[words.length - 1];
                var finalword = predicate[i].split('#');
                predicate[i] = finalword[finalword.length - 1];
                
            }
            for (var i in object)
            {
                if (object[i].charAt(object[i].length - 1) == '/') {
                    object[i] = object[i].substr(0, object[i].length - 1);
                }
                var words = object[i].split('/');
                object[i] = words[words.length - 1];
                var finalword = object[i].split('#');
                object[i] = finalword[finalword.length - 1];
            }

            res.render('index', { data: subject, object: object, predicate: predicate, subject: selectedsubject });


        }


    }
    http.send();

    
});


module.exports = router;