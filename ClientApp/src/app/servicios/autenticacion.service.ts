import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  public usuarioActual:Observable<User>;
  private apiUrl=this.baseUrl + 'api/login'
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl ) { 

  }

  login(userName:string, password: string){

    const UsuarioApi:User= {
      userName:userName,
      password:password,
      fullName:"",
      userRole:"",
      token:""
    };

    return this.http.post<any>(this.apiUrl,UsuarioApi)
          .pipe(
            map(respuesta=> {
              console.log("Respuesta api: ", respuesta);
              return respuesta;
            })

          );


  }
}
