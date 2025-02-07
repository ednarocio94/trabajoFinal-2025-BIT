import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-gestion-admin',
  imports: [ NgFor, NgIf, RouterLink],
  templateUrl: './gestion-admin.component.html',
  styleUrl: './gestion-admin.component.css'
})
export class GestionAdminComponent {
  
  loginService = inject(LoginService);



  logout() {
    console.log('Cerrando sesión...');
    this.loginService.cierreSesion()
  }
}


