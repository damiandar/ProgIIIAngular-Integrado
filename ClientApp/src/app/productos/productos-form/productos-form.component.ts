import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {Iproducto} from '../../interfaces/iproducto';
import {Router, ActivatedRoute} from '@angular/router';
import {ProductosService} from '../../servicios/productos.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css'],
  providers: [DatePipe]
})
export class ProductosFormComponent implements OnInit {
  formProductos:FormGroup;
  productoId:number;
  modoEdicion: boolean=false;

  constructor(private fb:FormBuilder,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private ProductosService: ProductosService,
              private datePipe: DatePipe) 
  { 

                this.activatedRoute.params.subscribe(
                  params => {
                    this.productoId=params['id'];
                    
                    if( isNaN(this.productoId)  )
                    {
                      //return;
                    }
                    else{
                      this.modoEdicion=true;
                      //buscar el producto con ese Id.
                      this.ProductosService.MostrarPorId(this.productoId)
                      .subscribe(
                          resultado => this.cargarFormulario(resultado),
                          error=> console.error(error)
                        );
                    }
                  }

                )

  }

  ngOnInit() {
    this.formProductos=this.fb.group(
      {
        nombre:'',
        descripcion:'',
        precio:0,
        tieneStock:true,
        fechaCreacion:''
      }
    );
  }

  cargarFormulario(producto:Iproducto){
      this.formProductos.patchValue({
        nombre:producto.nombre,
        descripcion:producto.descripcion,
        precio: producto.precio,
        tieneStock: producto.tieneStock,
        fechaCreacion: this.datePipe.transform(producto.fechaCreacion, 'yyyy-MM-dd'),
      })
  }

  save(){
    let productoFormulario: Iproducto =Object.assign({},this.formProductos.value);
    productoFormulario.precio=+productoFormulario.precio;

    if(this.modoEdicion){
        productoFormulario.id=+this.productoId;
        this.ProductosService.Actualizar(productoFormulario)
        .subscribe( 
                    ()=> alert("Modificado OK"),
                    error=> alert(error)
        );

    }
    else{
        this.ProductosService.Crear(productoFormulario)
            .subscribe( 
                    ()=> alert("Inserto OK"),
                    error=> alert("Error al crear: " + error)
            );
        }


  }
}
