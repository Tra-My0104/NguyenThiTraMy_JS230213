const express = require("express");
const server = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./conection");
const port = 3000;

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.get("/", (req,res) => {
    res.send("Hello Word")
})

// lấy tất cả dữ liệu trong mảng
server.get("/api/v1/noteapp", (req, res) => {
    const query = "select * from noteapp";
    database.query(query , (err,result) => {
        if(err) {
            res.status(500)
            console.log("không lấy được dữ liệu");
        } else {
            res.status(200).json({
                mesage:"OK",
                data:result,
            })
        }
    })
});

server.post("/api/v1/noteapp" , (req,res) => {
    const {Tilte} = req.body;
    const value = [Tilte];

    const query = "insert into noteapp(Tilte) values (?)"
    database.query(query, value, (err, result) => {
        console.log(value);
        if (err) {
          console.log("kết nối thất bại");
          res.status(500);
        } else {
          return res.status(200).json({
            status: "success",
            data: result,
          });
        }
      });
    });


server.delete("/api/v1/noteapp/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM noteapp WHERE NoteappId=?";
    database.query(query, id, (err, result) => {
      if (err) {
        console.log("kết nối thất bại");
        res.status(500);
      } else {
        return res.status(200).json({
          status: "success",
          message: "Xóa thành công",
          data: result,
        });
      }
    });
  });

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
