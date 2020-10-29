import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../servicios/productos.service';
import {Iproducto} from '../interfaces/iproducto';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public listadoProductos: Iproducto[];
  public campobuscado:string;

  constructor(private servicio: ProductosService) { }

  ngOnInit() {
    this.mostrarListado();
  }
  
  mostrarListado(){
    
    this.servicio.MostrarTodos()
    .subscribe(
      resultado =>{
        this.listadoProductos=resultado;
        //console.table(resultado);
        //console.dir(resultado);
      },
      error=> console.log(error),
      ()=> console.log("termino de listar")
    );
  }

  Buscar(){
    if(this.campobuscado){
      this.servicio.Buscar(this.campobuscado, this.campobuscado)
      .subscribe(
        resultado=> this.listadoProductos=resultado,
        error=> console.log(error),
        ()=> console.log("busqueda")
      );
    }
    else{
      alert("Debe ingresar un campo buscado");
    }
 
  }

  Crear(){
    var productoNuevo: Iproducto;
    productoNuevo={
      id:1919,
      nombre: "Producto nuevo",
      descripcion: "Descripcion nueva",
      precio:1000,
      tieneStock:true,
      fechaCreacion: new Date("2020-10-21"),
    };
    this.servicio.Crear(productoNuevo)
    .subscribe(
      ()=> this.mostrarListado(),
    );
  }


  Modificar(pId:number){
    var productoModificado: Iproducto;
    productoModificado={
      id:pId,
      nombre: "Modificado",
      descripcion: "Descripcion modificado",
      precio:9999,
      tieneStock:true,
      fechaCreacion: new Date("2020-10-21"),
    };
    this.servicio.Actualizar(productoModificado)
    .subscribe(
      resultado=> alert("Actualizado: " + resultado ),
      error=> alert(error),
      ()=>   this.mostrarListado() ,
    );
  }


  borrar(prodId:number){
    this.servicio.Borrar(100)
    .subscribe(
      resultado=> console.dir(resultado),
      error => console.dir(error),
      ()=>this.mostrarListado(),
    );
  }

  TieneStock(id:number){
    this.servicio.VerificarStock(id)
    .subscribe(
      resul=> alert(resul)
    );
  }








}
