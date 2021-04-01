import express from 'express';
import mysql from "mysql2";

var stock = express.Router();



stock.get('/', function(req, res) {
    res.send('What!?');
  });


stock.post('/create', function(req, res) {
    const connection = mysql.createConnection({ //подключаем бд
        host: "localhost",
        user: "root",
        database: "PutinCoin",
        password: "semgo2004"
      });

      connection.connect();
    
      connection.end();
});


  
export default stock;