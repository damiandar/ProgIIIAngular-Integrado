import { Injectable } from '@angular/core'; 
import { Router, CanActivate } from '@angular/router';
import { AutenticacionService} from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPaginaService implements CanActivate {

  constructor(private srvAutenticacion: AutenticacionService, private router: Router) { }

  canActivate() {
      // If the user is not logged in we'll send them back to the home page
      if (!this.srvAutenticacion.estaLogueado()) {
          console.log('No estás logueado');
          this.router.navigate(['/']);
          return false;
      }

      return true;
  }
}
