// middleware/permissions.js

// Este middleware asume que YA pasó por auth
// y que auth puso req.user = { id, roles, permisos, ... }

const requirePermission = (permisoNecesario) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "No autenticado",
      });
    }

    const permisos = Array.isArray(user.permisos) ? user.permisos : [];

    if (!permisos.includes(permisoNecesario)) {
      return res.status(403).json({
        status: "error",
        message: `No tienes el permiso requerido: ${permisoNecesario}`,
      });
    }

    next();
  };
};

module.exports = {
  requirePermission,
};
