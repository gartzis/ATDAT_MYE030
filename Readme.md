# Γιάννης Μπάρζας 2765
# Χρίστος Γκάρτζιος 2666
# Γρηγόριος Μακρής 3022


## Description
This project implements a  query selection of countries,indicators,year range type of group and type of graph from user 
and shows the results in  d3 charts.


## Installation
1. Install MySQL
2. Install javacript 3.15
3. Install Nodejs
4. Install npm mamanger(include in npm express,cors,mssql,mysql,socket.io,socket.io-client,nodemon)
5. Set the database in the DBMS and run  MySQL Server
6. execute npm run devStart  (this run the server.js (nodejs) )
7. open index.html in a browser.
   


## Details

server.js 
In this file in nodejs frame is set a server in port 3000 to communicate with client.js (browser side included in index.html)
Server communicates with client.js to take a query and comunicates as well with mySQL server to take the data from db an return them back to client in order to load the one of the three type d3 charts that are available.

client.js
In this file in js included d3 graphs.This file load the menu according the db and take the  user 's options create dynamically the sql query,then it send it to server and when the result is ready it is called the appropriate event to take the data.After that change the data format in order to load the data in one of the the tree types of d3 graphs.

index.html

This file has the html object including the menu with the filters we need.Include d3, the file client.js and style.css and other.

style.css

This file include the css option we need to render the data properly.
 


###  Problem
-


## To Run

Make sure that mySQL Server listen.
1. execute npm run devStart  (this run the server.js (nodejs) )
2. open index.html in a browser. 
   


