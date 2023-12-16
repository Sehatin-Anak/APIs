//
// *****Code ini buat percobaan jwt aja*****
// *****Implementasi authnya tetep pake firebase*****
//

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// const firebase = require('firebase')
const firebase = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} = require("firebase/auth");
const firebaseConfig = require("../firebase/config");
const provider = new GoogleAuthProvider()

firebase.initializeApp(firebaseConfig);
const auth = getAuth()

exports.register = async (req, res) => {
  const { email, password } = req.body;

  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred.user);
    res.json({
      user: cred.user,
    });
  });
};
//
exports.login = async (req, res) => {
  
  signInWithPopup(auth, provider).then(data => {
    const cred = data.user
    res.status(200).json({
      user: cred
    })
  })

  // const { email, password } = req.body;
  // signInWithEmailAndPassword(auth, email, password).then((cred) => {
  //   console.log(cred.user);
  //   res.statusjson({
  //     user: cred.user,
  //   });
  // });
};

exports.logout = async (req, res) => {
  auth.signOut().then(() => {
    console.log("user signed out");
    res.json("logged out");
  });
};
