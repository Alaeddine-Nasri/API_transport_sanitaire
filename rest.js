var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var app = express();

// var connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "transport_sanitaire",
//   // Server: "remotemysql.com",
// });
var connection = mysql.createPool({
  host: "remotemysql.com",
  user: "Ifa2JN0cXZ",
  password: "oUmLpPhmvd",
  database: "Ifa2JN0cXZ",
  connectionLimit: 100,
  multipleStatements: true,
  // Server: "remotemysql.com",
});
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// var conn = mysql.createConnection({
//   // host: "transportsanitaire.mysql.database.azure.com",
//   // user: "Alaeddine",
//   // password: "",
//   // database: "{your_database}",
//   // port: 3306,
//   // ssl: { ca: fs.readFileSync("{ca-cert filename}") },
// });

app.get("/users", function (req, res, next) {
  // var a = req.params.a;
  var query = `select * from user`;
  connection.query(query, function (error, resutls) {
    if (error) {
      next(error);
    } else {
      res.send(JSON.stringify(resutls));
    }
  });
});
app.get("/getadrs", function (req, res, next) {
  // var a = req.params.a;
  var query = `select useradresse,structadresse,operatoradr from demande`;
  connection.query(query, function (error, resutls) {
    if (error) {
      next(error);
    } else {
      res.send(JSON.stringify(resutls));
    }
  });
});

app.get("/getdemandes", function (req, res, next) {
  // var a = req.params.a;
  var query = `select * from demande`;
  connection.query(query, function (error, resutls) {
    if (error) {
      next(error);
    } else {
      res.send(JSON.stringify(resutls));
    }
  });
});

app.post("/adduser", function (req2, res2) {
  let id = req2.query.id;
  let name = req2.query.name;
  let family_name = req2.query.family_name;
  let Age = req2.query.Age;
  let NSS = req2.query.NSS;

  // }
  let sql = "INSERT INTO  user(id,name,family_name,Age,NSS) VALUES(?,?,?,?,?)";
  connection.query(sql, [id, name, family_name, Age, NSS], (err, results) => {
    if (!err) {
      res2.send(`User has been Added.`);
    } else {
      console.log(err);
    }
  });
});

app.post("/adddemande", function (req2, res2) {
  //http://localhost:8082/adduser?id=2&name=faiez&family_name=Kami&Age=12&NSS=1224212
  // res2.writeHead(200, { "Content-type": "test/html" });

  ///adddemande?id=1&title=demande1&corps=corps de la 1ere demande&NSS=322321&Age=11&userid=1&username=Ala Eddine&userfamily_name=Nasri&useradresse=&struct=Mustafa Basha&structadresse=&operator=&operatoradr=&kilometrage=&cost=0
  let id = req2.query.id;
  let title = req2.query.title;
  let corps = req2.query.corps;
  let NSS = req2.query.NSS;
  let Age = req2.query.Age;
  let usedid = req2.query.userid;
  let username = req2.query.username;
  let userfamily_name = req2.query.userfamily_name;
  let useradresse = req2.query.useradresse;
  let struct = req2.query.struct;
  let structadresse = req2.query.structadresse;
  let operator = req2.query.operator;
  let operatoradr = req2.query.operatoradr;
  let kilometrage = req2.query.kilometrage;
  let cost = req2.query.cost;
  // }
  let sql =
    "INSERT INTO `demande` (`id`, `title`, `corps`, `NSS`, `Age`, `userid`, `username`, `userfamily_name`, `useradresse`, `struct`, `structadresse`, `operator`, `operatoradr`, `kilometrage`, `cost`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  connection.query(
    sql,
    [
      id,
      title,
      corps,
      NSS,
      Age,
      usedid,
      username,
      userfamily_name,
      useradresse,
      struct,
      structadresse,
      operator,
      operatoradr,
      kilometrage,
      cost,
    ],
    (err, results) => {
      if (!err) {
        res2.send(`Demande has been Added.`);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/addrecla", function (req2, res2) {
  //http://localhost:8082/addrecla?id=2&title=recla 2&mail=Kami&corps=Je ne peux pas faire une demande&NSS=1224212
  let id = req2.query.id;
  let title = req2.query.title;
  let mail = req2.query.mail;
  let corps = req2.query.corps;
  let NSS = req2.query.NSS;

  let sql = "INSERT INTO  recla(id,title,mail,corps,NSS) VALUES(?,?,?,?,?)";
  connection.query(sql, [id, title, mail, corps, NSS], (err, results) => {
    if (!err) {
      res2.send(`Reclamation sent.`);
    } else {
      console.log(err);
    }
  });
});
app.get("/getrecla", function (req, res, next) {
  // var a = req.params.a;
  var query = `select * from recla`;
  connection.query(query, function (error, resutls) {
    if (error) {
      next(error);
    } else {
      res.send(JSON.stringify(resutls));
    }
  });
});

app.put("/updatedemande/:a", function (req2, res2) {
  var a = req2.params.a;
  let id = req2.query.id;
  let title = req2.query.title;
  let corps = req2.query.corps;
  let NSS = req2.query.NSS;
  let Age = req2.query.Age;
  let usedid = req2.query.userid;
  let username = req2.query.username;
  let userfamily_name = req2.query.userfamily_name;
  let useradresse = req2.query.useradresse;
  let struct = req2.query.struct;
  let structadresse = req2.query.structadresse;
  let operator = req2.query.operator;
  let operatoradr = req2.query.operatoradr;
  let kilometrage = req2.query.kilometrage;
  let cost = req2.query.cost;
  let state = req2.query.state;
  // }
  let sql =
    "UPDATE INTO `demande` (`id`, `title`, `corps`, `NSS`, `Age`, `userid`, `username`, `userfamily_name`, `useradresse`, `struct`, `structadresse`, `operator`, `operatoradr`, `kilometrage`, `cost`, `state`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  connection.query(
    sql,
    [
      id,
      title,
      corps,
      NSS,
      Age,
      usedid,
      username,
      userfamily_name,
      useradresse,
      struct,
      structadresse,
      operator,
      operatoradr,
      kilometrage,
      cost,
      state,
    ],
    (err, results) => {
      if (!err) {
        res2.send(`demande has been updated.`);
      } else {
        console.log(err);
      }
    }
  );
});

// endpoints Connection 2

app.get("/getoperator", function (req, res, next) {
  // var a = req.params.a;
  var query = `select * from operator`;
  connection.query(query, function (error, resutls) {
    if (error) {
      next(error);
    } else {
      res.send(JSON.stringify(resutls));
    }
  });
});

app.get("/admin", function (req, res, next) {
  // var a = req.params.a;
  var query = `select * from admin`;
  connection.query(query, function (error, resutls) {
    if (error) {
      next(error);
    } else {
      res.send(JSON.stringify(resutls));
    }
  });
});

//

// app.get("(/getallpharma)", function (req, res2, next) {
//   var query2 = "select * from pharmacy";
//   connection2.query(query2, function (error, resutls2) {
//     if (error) {
//       next(error);
//     } else {
//       res2.send(JSON.stringify(resutls2));
//     }
//   });
// });

// app.get("/getpharmabyname/:search", function (req, res2, next) {
//   var search = req.params.search;

//   var query2 = `select * from pharmacy where name LIKE '%${search}%' OR wilaya LIKE '%${search}%' OR adresse LIKE '%${search}%' `;
//   connection2.query(query2, function (error, resutls2) {
//     if (error) {
//       next(error);
//     } else {
//       res2.send(JSON.stringify(resutls2));
//     }
//   });
// });

// app.get("/getpharmabywilaya/:wilaya", function (req, res2, next) {
//   var wilaya = req.params.wilaya;

//   var query2 = `select * from pharmacy where wilaya LIKE '%${wilaya}%' `;
//   connection2.query(query2, function (error, resutls2) {
//     if (error) {
//       next(error);
//     } else {
//       res2.send(JSON.stringify(resutls2));
//     }
//   });
// });

// app.get("(/getalltrait)", function (req, res2, next) {
//   var query2 = "select * from traitement";
//   connection2.query(query2, function (error, resutls2) {
//     if (error) {
//       next(error);
//     } else {
//       res2.send(JSON.stringify(resutls2));
//     }
//   });
// });

// app.get("(/user)", function (req, res2, next) {
//   var query2 = "select * from user";
//   connection2.query(query2, function (error, resutls2) {
//     if (error) {
//       next(error);
//     } else {
//       res2.send(JSON.stringify(resutls2));
//     }
//   });
// });

// //*******************************************************************************//// */

// app.get("/getaut", function (req, res3, next) {
//   var query3 = "select * from user";
//   connection3.query(query3, function (error, resutls3) {
//     if (error) {
//       next(error);
//     } else {
//       res3.send(JSON.stringify(resutls3));
//     }
//   });
// });

// app.get("/getconseil", function (req, res5, next) {
//   var query5 = "select * from conseil";
//   connection2.query(query5, function (error, resutls5) {
//     if (error) {
//       next(error);
//     } else {
//       res5.send(JSON.stringify(resutls5));
//     }
//   });
// });

// PORT = 8082;
//end add new stock
// var server = app.listen(process.env.PORT, function () {
//   // var host = server.address().address;
//   // var port = server.address().port;
// });

let port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
