import { Injectable, Inject } from '@angular/core';
import { Iproducto } from '../interfaces/iproducto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 
  private apiURL : string=this.baseUrl + "api/productos";

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient  ) { }

  MostrarTodos(): Observable<Iproducto[]>{
    return this.http.get<Iproducto[]>(this.apiURL);
  }
  
  MostrarPorId(id:number){
    return this.http.get<Iproducto>(this.apiURL + "/" + id);
  }

  Buscar(palabraBuscada:string, descripcionBuscada: string): Observable<Iproducto[]>{
    return this.http.get<Iproducto[]>(this.apiURL +'/busqueda/' + palabraBuscada + '/descripcion/' + descripcionBuscada );
  }
  Borrar(prodId:number): Observable<any>{
    const headers= {
      'Accept':'application/json'
    }
    return this.http.delete<any>(this.apiURL + '/' + prodId,{headers});
  }

  Crear(prod: Iproducto): Observable<void>{
    const headers={
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'http://localhost:5000',
      'Access-Control-Allow-Methods': 'POST, PUT, GET, DELETE',
    }
    return this.http.post<void>(this.apiURL,prod,{headers});
  }
  Actualizar(prod:Iproducto):Observable<boolean>
  {
    prod.id= +prod.id;
    return this.http.put<boolean>(this.apiURL + '/' + prod.id, prod );
  }

  VerificarStock(prodId: number):Observable<boolean>{
    return this.http.get<boolean>(this.apiURL + '/tienestock/' +  prodId );
  }




}
