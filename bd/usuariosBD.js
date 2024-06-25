const ConectarBD=require("./conectarBD");

class UsuarioBD extends ConectarBD{
    constructor(){
        super();
    }

    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuario values (null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
        await this.conectarMysql();
        await this.conexion.execute(sql);
        console.log("Crea un nuevo usuario");
        await this.cerrarConexion();
        } catch (error) {
            console.log("Error al agreagar el usuario "+error);
        }
    }

    async mostrarUsuarios() {
        const sql="SELECT * FROM usuario;";
        try {
            await this.conectarMysql();
            const [usuariosMySql]=await this.conexion.query(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return(usuariosMySql);
        } catch (error) {
            console.log("Error al obtener los datos");
            console.error(sql);
            
        }
    }

  async usuarioId(id){
    const sql="SELECT * FROM usuario WHERE idusuario = "+id+";";
    try {
        await this.conectarMysql();
        const [[usuario]]= await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("Consulta correcta por id");
        return usuario;
    } catch (error) {
        console.error("Error al consultar por id "+ error);
        console.error(sql);
    }

  }
  async editarUsuario(usuario){
    const sql="UPDATE usuario SET nombre='"+usuario.nombre+"',celular='"+usuario.celular+"',correo='"+usuario.correo+"';"
    const sql2=`UPDATE usuario SET 
    nombre='${usuario.nombre}',
    celular='${usuario.celular}',
    correo='${usuario.correo}'
    WHERE idusuario=${usuario.idusuario};`;
    try {
        await this.conectarMysql();
        await this.conexion.execute(sql2)
        await this.cerrarConexion();
        console.log("Actualizacion correcta del usuario ");
    } catch (error) {
        console.error("Error al editar usuario "+ error);
        console.error(sql2);
        
    }
  }

  async borrarUsuario(idusuario){
    const sql="DELETE FROM usuario WHERE idusuario="+idusuario;
    try {
        await this.conectarMysql();
        await this.conexion.execute(sql);
        await this.cerrarConexion();
        console.log("Usuario borrado");

    } catch (error) {
        console.error("Error al borrar el usuario");
        console.log(sql);
    }
  }

}

module.exports=UsuarioBD;