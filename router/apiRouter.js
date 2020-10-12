var express = require("express");
var router = express.Router();
const crypto = require("crypto");

const UserData = require("../models/UserData");
const { models } = require("mongoose");
const salt = "1138596780685";

router.post("/pra", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  console.log("----");
  console.log(email);
  console.log(password);

  UserData.findOne({ email: email }, function (err, result) {
    if (result) {
      console.log("아이디 중복");
      res.send("이미 해당 이메일이 있습니다.");
    } else {
      let hashPassword = crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex");
      console.log(hashPassword);
      UserData.create({
        email: email,
        password: hashPassword,
        salt: salt,
      });
      res.send("회원가입 완료");
    }
  });

  // 1. req.body에서 회원정보입력받음.(email, password)
  // 2. email 중복체크
  //    2-1. (mongoose에서 email로 user 조회.)
  //    2-2. (있으면, resp: 403, 없으면 3번으로)
  // 3.password hashing(암호화)
  // 4. 저장.
  // 5. resp
  //   res.send("회원가입 완료");
});

router.get("/sign_up", (req, res) => {
  res.render("user/signup");
});

router.get("/", (req, res) => {
  res.send("환영합니다~");
});

router.get("/login", (req, res) => {
  res.render("views/login");
});

router.post("/login", async (req, res) => {
  const data = req.body;

  const result = await models.UserData.findOne({
    email: data.email,
  });
  console.log(result);
  if (!result) {
    res.send("가입된 유저 없음.");
  } else {
    const dbPassword = result.dataValues.password;
    const password = data.password;
    const salt = result.dataValues.salt;
    let hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");

    if (dbPassword === hashPassword) {
      console.log("비밀번호 일치");
      res.redirect("/mainPage");
    } else {
      console.log("비밀번호 불일치");
      res.redirect("/views/login");
    }
  }
});
////////////////////////////////////////////////////////////////////
router.post("/pra", async function (req, res, next) {
  //let body = req.body;
  //let inputPassword = body.password;
  let salt = Hash.round(new Date().valueOf() * crypto.Hash.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");

  let result = models.user.create({
    name: body.userName,
    email: body.Email,
    password: hashPassword,
    salt: salt,
  });
  res.redirect("");
});
module.exports = router;
