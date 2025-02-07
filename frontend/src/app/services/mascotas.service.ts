import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascotas } from '../interfaces/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private apiUrl = 'http://localhost:3000/mascotas'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<Mascotas[]> {
    return this.http.get<Mascotas[]>(this.apiUrl);
  }

  postMascota(mascota: Mascotas): Observable<Mascotas> {
    return this.http.post<Mascotas>(this.apiUrl, mascota);
  }

  putMascota(mascota: Mascotas, id: string): Observable<Mascotas> {
    return this.http.put<Mascotas>(`${this.apiUrl}/${id}`, mascota);
  }

  deleteMascota(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}