
var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');


const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
    database: "gdb_schema"
});
   
   con.connect(function(err) {
     if (err) throw err;
     console.log("[UPDATE]: Server is now connected with MySQL.");
   
   });





 
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection',(socket) =>{
     socket.emit('connected','Connection established.+..')

     
     socket.on('years',(request)=>{
          q="select * from year;"
          q2="select min(year) ,max(year) from year;"
          con.query(q, function (err, result) {
               if (err) throw err;
               values = result;
               
               console.log('[UPDATE]: data just transfered to the frontend app.')
               socket.emit('years',JSON.stringify(values))
             });
             con.query(q2, function (err, result) {
               if (err) throw err;
               values = result;
               
               console.log('[UPDATE]: data just transfered to the frontend app.')
               socket.emit('yearminmax',values)
             });
          });

     socket.on('countries',(request)=>{
          q="select * from country;"

          con.query(q, function (err, result) {
               if (err) throw err;
               values = result;
               
               console.log('[UPDATE]: data just transfered to the frontend app.')
               socket.emit('countries',JSON.stringify(values))
             });
          

     });
     socket.on('indicators',(request)=>{
          q="select * from indicator;"

          con.query(q, function (err, result) {
               if (err) throw err;
               values = result;
               
               console.log('[UPDATE]: data just transfered to the frontend app.')
               socket.emit('indicators',JSON.stringify(values))
             });
          

     });
     socket.on('request',(request) =>{
          console.log(request)
          request=JSON.parse(request);
          
          var notes = []

          socket.emit('wait','perimene makh...')
          let query="select "+request["select"]+" from "+request["from"]+" where "+request["where"]

          con.query(query, function (err, result) {
               if (err) throw err;
               values = result;
               
               console.log('[UPDATE]: data just transfered to the frontend app.')
               socket.emit('answer',JSON.stringify(values))
             });
          

     })
     

})





