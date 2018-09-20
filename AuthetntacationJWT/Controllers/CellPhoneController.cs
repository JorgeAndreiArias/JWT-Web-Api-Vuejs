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
    [Authorize]
    //[RoutePrefix("api/cell")]
    public class CellPhoneController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetId(int id)
        {
            SQLConexion _conexion = new SQLConexion();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            List<CellPhones> _list = new List<CellPhones>();
            try
            {
                _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
                _Parametros.Add(new SqlParameter("@id", id));
                _conexion.PrepararProcedimiento("sp_GetById", _Parametros);
                _dtr = _conexion.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    while (_dtr.Read())
                    {
                        CellPhones _cellPhones = new CellPhones()
                        {
                            //Se recuperan los valores de acuerdo al alias que se definio en el procedimiento almacenado
                            Id = Int32.Parse(_dtr["IdCellPhone"].ToString()),
                            Name = _dtr["NamePhone"].ToString(),
                            Firmware = _dtr["Firmware"].ToString(),
                            Price = Double.Parse(_dtr["Price"].ToString()),
                            Brand = _dtr["Brand"].ToString()
                        };
                        _list.Add(_cellPhones); //Se agrega elemento 2

                        //HttpContext.Current.Session["Identificador"] = _user.Id;

                    }
                    //JavaScriptSerializer js = new JavaScriptSerializer();
                    //Context.Response.Write(js.Serialize(_list));
                    _dtr.Close();
                    return Ok(_list);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _conexion.Desconectar();
                _conexion = null;
                _dtr = null;
            }
            return Ok(_list);
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {

            SQLConexion _conexion = new SQLConexion();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            List<CellPhones> _list = new List<CellPhones>();
            try
            {
                _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
                _conexion.PrepararProcedimiento("sp_GetAllPhones", _Parametros);
                _dtr = _conexion.EjecutarTableReader();
                if (_dtr.HasRows)
                {
                    while (_dtr.Read())
                    {
                        CellPhones _cellPhones = new CellPhones()
                        {
                            //Se recuperan los valores de acuerdo al alias que se definio en el procedimiento almacenado
                            Id = Int32.Parse(_dtr["IdCellPhone"].ToString()),
                            Name = _dtr["NamePhone"].ToString(),
                            Firmware = _dtr["Firmware"].ToString(),
                            Price = Double.Parse(_dtr["Price"].ToString()),
                            Brand = _dtr["Brand"].ToString()
                        };
                        _list.Add(_cellPhones); //Se agrega elemento 2

                        //HttpContext.Current.Session["Identificador"] = _user.Id;

                    }
                    //JavaScriptSerializer js = new JavaScriptSerializer();
                    //Context.Response.Write(js.Serialize(_list));
                    _dtr.Close();
                    return Ok(_list);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _conexion.Desconectar();
                _conexion = null;
                _dtr = null;
            }
            return Ok(_list);
        }

        [HttpPost]
        [Route("api/post")]
        public IHttpActionResult PostCell(CellPhones cell)
        {

            SQLConexion _conexion = new SQLConexion();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            List<CellPhones> _list = new List<CellPhones>();
            try
            {
                _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
                _Parametros.Add(new SqlParameter("@namephone", cell.Name));
                _Parametros.Add(new SqlParameter("@price", cell.Price));
                _Parametros.Add(new SqlParameter("@firmware", cell.Firmware));
                _Parametros.Add(new SqlParameter("@brand", cell.Brand));
                _conexion.PrepararProcedimiento("sp_InsertCellPhone", _Parametros);
                _dtr = _conexion.EjecutarTableReader();
                _dtr.Close();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _conexion.Desconectar();
                _conexion = null;
                _dtr = null;
            }
            return Ok(_list);
        }

        [HttpPost]
        [Route("api/put")]
        public IHttpActionResult PutCell(CellPhones cell)
        {

            SQLConexion _conexion = new SQLConexion();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            List<CellPhones> _list = new List<CellPhones>();
            try
            {
                _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
                _Parametros.Add(new SqlParameter("@id", cell.Id));
                _Parametros.Add(new SqlParameter("@namephone", cell.Name));
                _Parametros.Add(new SqlParameter("@price", cell.Price));
                _Parametros.Add(new SqlParameter("@firmware", cell.Firmware));
                _Parametros.Add(new SqlParameter("@brand", cell.Brand));
                _conexion.PrepararProcedimiento("sp_UpdateCellPhone", _Parametros);
                _dtr = _conexion.EjecutarTableReader();
                _dtr.Close();
                
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _conexion.Desconectar();
                _conexion = null;
                _dtr = null;
            }
            return Ok(_list);
        }

        [HttpPost]
        [Route("api/delete")]
        public IHttpActionResult DeleteCell(CellPhones cell)
        {

            SQLConexion _conexion = new SQLConexion();
            List<SqlParameter> _Parametros = new List<SqlParameter>();
            DataTableReader _dtr = null;
            List<CellPhones> _list = new List<CellPhones>();
            try
            {
                _conexion.Conectar(System.Configuration.ConfigurationManager.ConnectionStrings["MiBD"].ToString());
                _Parametros.Add(new SqlParameter("@id", cell.Id));
                _conexion.PrepararProcedimiento("sp_DeleteCellPhone", _Parametros);
                _dtr = _conexion.EjecutarTableReader();
                _dtr.Close();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                _conexion.Desconectar();
                _conexion = null;
                _dtr = null;
            }
            return Ok(_list);
        }
    }
}
