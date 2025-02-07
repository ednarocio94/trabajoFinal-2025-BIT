import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/obtener`);
  }

  postUsuarios(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/crear`, user);
  }

  putUsuarios(user: User, id: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/actualizar/${id}`, user);
  }

  deleteUsuarios(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}