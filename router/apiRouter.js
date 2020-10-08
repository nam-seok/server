var express = require("express");
var router = express.Router();

const UserData = require("../models/UserData");

router.post("/pra", (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  console.log(email);
  console.log(password);

  UserData.findOne({ email: email }, function (err, result) {
    if (result) {
      console.log("아이디 중복");
      res.send("이미 해당 이메일이 있습니다.");
    } else {
      UserData.create({
        email: email,
        password: password,
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

module.exports = router;
