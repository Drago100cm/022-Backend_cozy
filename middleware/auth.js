// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret_local";

const auth = (req, res, next) => {
  try {
    // 1. Leer el token desde los headers
    let token = req.headers["x-token"] || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "No se proporcionó token de autenticación",
      });
    }

    // Si viene como "Bearer xxx"
    if (typeof token === "string" && token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    // 2. Verificar el token con la misma clave que usas en login
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded = { uid, roles, permisos, iat, exp }

    // 3. Normalizar lo que vas a usar en el resto del backend
    req.user = {
      id: decoded.uid,
      roles: decoded.roles || [],
      permisos: decoded.permisos || [],
      raw: decoded, // opcional, por si luego quieres todo
    };

    next();
  } catch (error) {
    console.log("Error en autenticación: ", error);
    return res.status(401).json({
      status: "error",
      message: "Token inválido o expirado",
      error: error.message,
    });
  }
};

module.exports = auth;
