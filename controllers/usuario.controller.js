const UsuarioDB = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getOrCreateUserRole } = require("../utils/rolDefault");
const JWT_SECRET = process.env.JWT_SECRET || "secret_local";

// Registrar un nuevo usuario
const registrar = async (req, res) => {
    try {
        const { nombre, usuario, password, rol, roles } = req.body;

        // Verificar compos obligatorios
        if (!nombre || !usuario || !password) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios"
            });
        }

        // verificar si el usuario ya existe
        const existe = await UsuarioDB.findOne({ usuario }).lean();
        if (existe) {
            return res.status(400).json({
                status: "error",
                message: "El nombre de usuario ya está en uso"
            });
        }

        const rolDefecto = await getOrCreateUserRole();

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const passwordEncriptada = bcrypt.hashSync(password, salt);

        const nuevoUsuario = new UsuarioDB({
            nombre,
            usuario,
            password: passwordEncriptada,
            rol,
            roles:[rolDefecto._id]
        });

        const usuarioGuardado = await nuevoUsuario.save();

        return res.status(201).json({
            status: "success",
            message: "Usuario registrado exitosamente",
            data: usuarioGuardado
        });

    } catch (error) {
        console.log("Error al registrar usuario: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
}


const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const user = await UsuarioDB.findOne({ usuario })
      .populate({
        path: "roles",
        populate: {
          path: "permisos",
          model: "Permiso",
        },
      });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    const passwordValida = bcrypt.compareSync(password, user.password);
    if (!passwordValida) {
      return res.status(400).json({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }

    // 🔹 Normalizar roles a arreglo
    const rolesRaw = user.roles;
    const rolesArray = Array.isArray(rolesRaw)
      ? rolesRaw
      : rolesRaw
      ? [rolesRaw]
      : [];

    // roles del usuario (solo id + nombre para el front)
    const rolesUsuario = rolesArray.map((rol) => ({
      id: rol._id,
      nombre: rol.nombre,
    }));

    // permisos = unión de todos los permisos activos de todos los roles
    const permisosUsuario = Array.from(
      new Set(
        rolesArray.flatMap((rol) =>
          (rol.permisos || [])
            .filter((p) => p && p.activo)
            .map((p) => p.nombre)
        )
      )
    );

    const payload = {
      uid: user._id,
      roles: rolesUsuario.map((r) => r.id),
      permisos: permisosUsuario,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Roles del usuario:", JSON.stringify(rolesArray, null, 2));
    console.log("Permisos calculados:", permisosUsuario);
    return res.status(200).json({
      status: "success",
      message: "Inicio de sesión exitoso",
      data: {
        user: {
          id: user._id,
          nombre: user.nombre,
          usuario: user.usuario,
          roles: rolesUsuario,
          permisos: permisosUsuario,
        },
        token,
      },
    });
  } catch (error) {
    console.log("Error en login: ", error);
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor",
      error: error.message,
    });
  }
};

// Listar todos los usuarios
const listar = async (req, res) => {
    try {
        const usuarios = await UsuarioDB.find().populate("roles").select("-password").lean();

        return res.status(200).json({
            status: "success",
            message: "Lista de usuarios",
            data: usuarios
        });
    } catch (error) {
        console.log("Error al listar usuarios: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
}

// Buscar usuario por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioDB.findById(id).select("-password").lean();

        if (!usuario) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario encontrado",
            data: usuario
        });
    } catch (error) {
        console.log("Error al buscar usuario por ID: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
}

// Actualizar usuario
const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, usuario, password, roles } = req.body;

        const datosActualizar = {};

        if (nombre) datosActualizar.nombre = nombre;
        if (usuario) datosActualizar.usuario = usuario;
        if (roles) datosActualizar.roles = roles;

        // Si va a actualizar contraseña, encriptar
        if (password) {
            const salt = await bcrypt.genSalt(10);
            datosActualizar.password = await bcrypt.hash(password, salt);
        }

        const actualizado = await UsuarioDB.findByIdAndUpdate(id, datosActualizar, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!actualizado) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario actualizado correctamente",
            data: actualizado
        });

    } catch (error) {
        console.log("Error al actualizar usuario:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// eliminar un usuario por ID
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;

        const eliminado = await UsuarioDB.findByIdAndDelete(id).lean();

        if (!eliminado) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario eliminado exitosamente",
            data: eliminado
        });
    } catch (error) {
        console.log("Error al eliminar usuario:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Exportar las funciones
module.exports = {
    registrar,
    login,
    listar,
    BuscarId,
    actualizar,
    eliminar
};