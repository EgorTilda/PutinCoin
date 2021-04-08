import { createServer } from "http";
import { Server } from "socket.io";
import { auth } from "./auth.js";
import easyvk from "easyvk"
import express from "express";
import sequelize from "./sequelize.js";
import readline from "readline";


const app = express();



const server = createServer(app);
const io = new Server(server, {
});




const User = sequelize.model('User');
const Stock = sequelize.model('Stock');
const Buy = sequelize.model('Buy');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  switch(input) {
    case "/kill":
      io.allSockets().then(sockets => {
        sockets.forEach((socket) => {
          User.update({ online: false, socket_id: "" }, { where: { socket_id: socket }});
        })
      })
      io.emit("kill");
      io.disconnectSockets(0);
      console.log("We killed all)")
    break;

    case "/cr_stock":
      let stock = {

      };
      rl.question("Promt speed ", (speed) => {
          stock.speed = speed;
          rl.question("Promt cost ", (cost) => {
            stock.cost = cost;
            Stock.create(stock).then(() => {
              console.log("comlete");
            })
          })
      })
    break;


    default: 
      console.log("pop");
  }
});


easyvk({
  token: "f1f0e049f1f0e049f1f0e0494ef1863a13ff1f0f1f0e04991bb519afb90f22aa006c152",
  v: "5.130"
}).then(async vk => {

  //------------------------------------------------------------

  io.on("connection", (socket) => {


    const user_id = auth(socket.handshake.url);
    console.log("connected user " + user_id);
    if(!user_id) {
      socket.emit("error", "Ошибка подключения");
      socket.disconnect(0);
    } else {
      // ---------------------------------------------------------------------------------------------

      User.findByPk(user_id).then(user => {
        if(user) {
          if(!user.online) {
            user.update({ online: true, socket_id: socket.id }, { where: { user_id }}).then(() => {
              vk.call("users.get", { user_id, lang: "ru", fields: ["photo_200"] }).then(data => {
                socket.emit("init", { ...data[0], ...user.dataValues });
              });
            });
          } else {
            socket.emit("two_source");
            socket.disconnect(0)
          }
        } else {
          User.create({ user_id, socket_id: socket.id }).then((user) => {
            vk.call("users.get", { user_id, lang: "ru", fields: ["photo_200"] }).then(data => {
              socket.emit("init", { ...data[0], ...user.dataValues });
            });
          });
        }
      })

      socket.on("buy", data => {
        const { user_id, stock_id} = data;
        Buy.findAll({ where: { user_id, stock_id } }).then((buys) => {
          const count = buys.length;
          Stock.findOne({ where: { stock_id }}).then(stock => {
            const cost = stock.cost_buy*(count+1)*2;
            User.findByPk(user_id).then(user => {
              if(user.score >= cost) {
                User.update({ score: user.score-cost }, { where: { user_id}  }).then(() => {
                  Buy.create({ user_id, stock_id }).then((buy) => {
                      socket.emit("buy_create", buy);
                  })
                })
              } else {
                socket.emit("error_cost_change");
              }
            })
          })
        })
      })

      socket.on("get_stocks", () => {
        Stock.findAll().then(stocks => {
          socket.emit("updated_stocks", stocks)
        }) 
      })

      socket.on("get_buys", (user_id) => {
        Buy.findAll({ where: { user_id }}).then(buys => {
          socket.emit("updated_buys", buys)
        }) 
      })


      socket.on("add_score_timer", (user_id) => {
        User.findOne({ where: { user_id } }).then((user) => {
          let add_score =  Number(user.speed);
          Buy.findAll({ where: { user_id }}).then(buys => {
            Stock.findAll().then(stocks => {
              buys.forEach((buy) => {
                add_score += Number(stocks[stocks.findIndex((i) => i.stock_id === buy.stock_id)].speed);
              })
              User.update({ score:  Number(user.score) + add_score }, { where: { user_id }}).then(() => {
                socket.emit("updated_score", { score: Number(user.score) + add_score , add_score});
              })   
            })
          })
        })
      })

      socket.on("disconnect", () => {
          User.update({ online: false, socket_id: "" }, { where: { socket_id: socket.id } }).then(() => {

          })
      })
    }


  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server started on port " + process.env.PORT);
})

setInterval(() => {
  console.log("updated stock " + new Date())

    Stock.findAll().then((stocks) => {
      for (let i = stocks.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [stocks[i], stocks[j]] = [stocks[j], stocks[i]];
      }
      console.log(JSON.stringify(stocks))
      stocks.forEach((stock, i) => {
        Stock.update({ speed: stock.speed, cost_buy: stock.cost_buy }, { where: { stock_id: i+1 }}).then();
      })
      setTimeout(() => {
        Stock.findAll().then(stocks => {
          io.emit("updated_stocks", stocks);
        }) 
      }, 1000)
      
    })
}, 30*60*1000)

