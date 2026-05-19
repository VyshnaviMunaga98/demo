const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;


  // CHECK TOKEN EXISTS
  if (!authHeader) {

    return res.status(401).json({
      success: false,
      message: "Access denied"
    });
  }


  // TOKEN FORMAT:
  // Bearer TOKEN

  const token = authHeader.split(" ")[1];


  try {

    const decoded = jwt.verify(
      token,
      "audit_demo_secret_key"
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

};


module.exports = verifyToken;