using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Clase10.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController:ControllerBase
    {

        public static List<Producto> Productos=new List<Producto>()
        {
            new Producto(){ Id=1, Nombre="Cuaderno", Descripcion="rayado" , Precio=200, TieneStock=true, FechaCreacion=new DateTime(2020,10,14)},
            new Producto(){ Id=2, Nombre="Lapiz", Descripcion="negro" , Precio=140, TieneStock=true, FechaCreacion=new DateTime(2020,07,07)},
            new Producto(){ Id=3, Nombre="Borrador", Descripcion="" , Precio=300, TieneStock=true, FechaCreacion=new DateTime(2020,10,06)},
            new Producto(){ Id=4, Nombre="Marcador", Descripcion="azul" , Precio=200, TieneStock=false, FechaCreacion=new DateTime(2020,09,13)},
            new Producto(){ Id=5, Nombre="Cuaderno", Descripcion="cuadriculado" , Precio=100, TieneStock=false, FechaCreacion=new DateTime(2020,10,14)},
        };

        [HttpGet]
        [Authorize] 
        public List<Producto> GetProductos(){
            return Productos;
        }

        [HttpGet("{id}")]
        public Producto GetProductoByID(int id){
            var prod= Productos.Where(x=> x.Id==id).FirstOrDefault();
            return prod;
        }

        [HttpGet("tienestock/{id}")]
        public bool VerificarStock(int id){
            var prod= Productos.Where(x=> x.Id==id).FirstOrDefault();
            return prod.TieneStock;
        }

        [HttpGet("busqueda/{nombre}/descripcion/{descripcion}")]
        public List<Producto> Busqueda(string nombre, string descripcion){
            var productos=Productos.Where(x=> x.Nombre.ToUpper()==nombre.ToUpper()
            || x.Descripcion.ToUpper()==descripcion.ToUpper()).ToList();
            return productos;
        }


        [HttpPost]
        public void Insertar(Producto prod){
            Productos.Add(prod);
        }

        [HttpPut("{id}")]
        public bool Modificar(int id, Producto prod){
             var prodanterior= Productos.Where(x=> x.Id==id).FirstOrDefault();
             if (prodanterior is null)
             return false;

             Productos.Remove(prodanterior);
             Productos.Add(prod);
             return true;

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id){
            var prodanterior= Productos.Where(x=> x.Id==id).FirstOrDefault();
             if (prodanterior is null)
             return NotFound("No se encontro el producto con ese ID");

             Productos.Remove(prodanterior);
             return Ok("se borro el producto");
        }



    }


    public class Producto{
        public int Id{get;set;}

        public string Nombre{get;set;}

        public string Descripcion {get;set;}

        public double Precio {get;set;}

        public bool TieneStock {get;set;}

        public DateTime FechaCreacion {get;set;}
    }

}