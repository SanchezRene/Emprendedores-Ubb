/** Roles permitidos por la base de datos
    - user : Usuario normal, puede ingresar a la plataforma e inscribir su emprendimiento.
    - emprendedor: Usuario que ha inscrito un emprendimiento.
    - encargado: Usuario encargado de revisar los emprendimientos inscritos.
    - admin: administrador del sistema
 */
const ROLES = ["user", "admin", "encargado", "emprendedor"];


module.exports = ROLES;
