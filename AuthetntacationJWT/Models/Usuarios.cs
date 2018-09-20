using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AuthetntacationJWT.Models
{
    public class Usuarios
    {
        public int Id { get; set; }
        public string FName { get; set; }
        public string Nick { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

    }
}