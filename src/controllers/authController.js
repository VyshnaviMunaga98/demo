const jwt = require("jsonwebtoken");


// LOGIN API
const login = (req, res) => {

  const { email, password } = req.body;


  // DEMO USER VALIDATION
  if (
    email !== "admin@test.com" ||
    password !== "admin123"
  ) {

    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }


  // JWT PAYLOAD
  const payload = {
    email,
    role: "admin"
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
      email,
      role: "admin"
    }
  });

};


module.exports = {
  login
};