using AuthetntacationJWT.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AuthetntacationJWT.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/usuarios")]
    public class UsersController : ApiController
    {
        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(Usuarios usuario)
        {

            if (usuario == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            SQLConexion _conexion = new SQLConexion();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            List<Usuarios> _list = new List<Usuarios>();
            try
            {
                _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
                _Parametros.Add(new SqlParameter("@nick", usuario.Nick));
                _Parametros.Add(new SqlParameter("@pass", usuario.Password));
                _conexion.PrepararProcedimiento("sp_auth", _Parametros);
                _dtr = _conexion.EjecutarTableReader();
                if (_dtr.HasRows && _dtr.Read())
                {
                    var token = TokenGenerator.GenerateTokenJwt(usuario.Password);
                    return Ok(token);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            //TODO: Validate credentials Correctly, this code is only for demo !!           
        }
    }
}
