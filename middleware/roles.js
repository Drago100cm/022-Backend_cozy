
const requireRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    status: "error",
                    message: "Usuario no autenticado"
                });
            }

            const rolUsuario = req.user.rol;
            const idUsuario = req.user.id;
            const idTarget = req.params.id;

            // Reglas especiales del cajero
            if (rolUsuario === "cajero") {
                if (idTarget && idTarget !== idUsuario) {
                    return res.status(403).json({
                        status: "error",
                        message: "Los cajeros solo pueden modificar o eliminar su propia cuenta"
                    });
                }
            }

            // Validar rol general
            if (!rolesPermitidos.includes(rolUsuario)) {
                return res.status(403).json({
                    status: "error",
                    message: "No tienes permisos para realizar esta acción"
                });
            }

            next();
        } catch (error) {
            console.log("Error en verificación de roles: ", error);
            return res.status(500).json({
                status: "error",
                message: "Error en el servidor",
                error: error.message
            });
        }
    };
};

module.exports = requireRole;
