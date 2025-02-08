import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _httpClient = inject(HttpClient);
  private URL_ADMIN = 'http://143.110.152.97:3000/admin'; // Ruta base del backend

  // Crear un administrador
  postAdmin(admin: Admin) {
    return this._httpClient.post(this.URL_ADMIN + '/crear', admin);
  }

  // Obtener todos los administradores
  getAdmin() {
    return this._httpClient.get(this.URL_ADMIN);
  }

  // Actualizar un administrador
  putAdmin(id: string, admin: Admin) {
    return this._httpClient.put(this.URL_ADMIN + '/actualizar/' + id, admin);
  }

  // Eliminar un administrador
  deleteAdmin(id: string) {
    return this._httpClient.delete(this.URL_ADMIN + '/eliminar/' + id);
  }
}