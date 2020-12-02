# semantic-web-application
For Running this application First you have download the fuseki server.<br>
Download the fuseki sever from this URL: https://jena.apache.org/download/ => Apache Jena Fuseki(apache-jena-fuseki-3.17.0.tar.gz)<br>
After downloading, unzip the file and rename the folder as "Fuseki" and move it to C:\\ <br>
Clone the repositry to your local machine.<br>
Copy the rdf.ttl file which is located on repositoryfolder(semantic-web-application-master)=>datafiles=>rdf.ttl and then put it to Fuseki folder.<br>
Start the command prompt on Fuseki folder and run the command "fuseki-server --file=rdf.ttl /dataset"<br>
It will run the server on port 3030 and you can see the data on localhost:3030<br>

Now at first you have to download the Node.js(https://nodejs.org/en/) and then install it<br>
If you have then you do not have to. You can check the node.js version using "node -v" command.<br>
After download the Node.js and then go to command on project folder <br>
Run the project using "nodemon index"<br>
Go to "localhost:1234"<br>
