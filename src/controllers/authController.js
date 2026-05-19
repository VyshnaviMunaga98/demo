const jwt = require("jsonwebtoken");

const db = require("../config/db");


// REGISTER USER
const register = (req, res) => {

  const {
    name,
    email,
    password,
    role,
    department
  } = req.body;


  // CHECK EXISTING USER
  const checkQuery = `
    SELECT *
    FROM users
    WHERE email = ?
  `;


  db.query(checkQuery, [email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }


    // USER ALREADY EXISTS
    if (checkResults.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }


    // CREATE USER
    const user = {
      name,
      email,
      password,
      role,
      department
    };


    const insertQuery = `
      INSERT INTO users
      SET ?
    `;


    db.query(insertQuery, user, (insertErr) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).json({
          success: false,
          message: "Database error"
        });
      }

      res.status(201).json({
        success: true,
        message: "User created successfully"
      });
    });
  });
};


// LOGIN USER
const login = (req, res) => {
  const { email, password } = req.body;


  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `;


  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }


    // USER NOT FOUND
    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = results[0];


    // PASSWORD CHECK
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }


    // JWT PAYLOAD
    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    };


    // GENERATE TOKEN
    const token = jwt.sign(
      payload,
      "audit_demo_secret_key",
      {
        expiresIn: "1d"
      }
    );


    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });

  });

};


module.exports = {
  register,
  login
};