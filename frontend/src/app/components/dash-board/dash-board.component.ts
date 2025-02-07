import { Component, inject } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascotas } from '../../interfaces/mascotas';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dash-board',
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashboardComponent {

  loginService = inject(LoginService);
  mascotasService = inject(MascotasService);
  toastrService = inject(ToastrService);

  allMacotas: Mascotas[] = [];
  isEditing: boolean = false;
  currentMascotaId: string | null = null;
  mascotaForm = new FormGroup({
    nombre: new FormControl(''),
    raza: new FormControl(''),
    edad: new FormControl(0),
    propietario: new FormControl(''),
    estaAdoptado: new FormControl(false),
    imagen: new FormControl('')
  });

  showMascota() {
    this.mascotasService.getMascotas().subscribe({
      next: (res: any) => {
        this.allMacotas = res.mascotas;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.showMascota();
  }

  logout() {
    this.loginService.cierreSesion();
  }

  addMascota() {
    if (this.mascotaForm.valid) {
      const mascota = this.mascotaForm.value as Mascotas;
      this.mascotasService.postMascota(mascota).subscribe({
        next: (res: any) => {
          this.toastrService.success('Mascota agregada exitosamente');
          this.showMascota();
          this.mascotaForm.reset();
        },
        error: (error: any) => {
          this.toastrService.error('Error al agregar mascota');
        }
      });
    }
  }

  editMascota(mascota: Mascotas) {
    this.isEditing = true;
    this.currentMascotaId = mascota._id;
    this.mascotaForm.patchValue({
      nombre: mascota.nombre,
      raza: mascota.raza,
      edad: mascota.edad,
      propietario: mascota.propietario,
      estaAdoptado: mascota.estaAdoptado,
      imagen: mascota.imagen
    });
  }

  updateMascota() {
    if (this.mascotaForm.valid && this.currentMascotaId) {
      const mascota = this.mascotaForm.value as Mascotas;
      this.mascotasService.putMascota(mascota, this.currentMascotaId).subscribe({
        next: (res: any) => {
          this.toastrService.success('Mascota actualizada exitosamente');
          this.showMascota();
          this.mascotaForm.reset();
          this.isEditing = false;
          this.currentMascotaId = null;
        },
        error: (error: any) => {
          this.toastrService.error('Error al actualizar mascota');
        }
      });
    }
  }

  deleteMascota(id: string) {
    this.mascotasService.deleteMascota(id).subscribe({
      next: (res: any) => {
        this.toastrService.success('Mascota eliminada exitosamente');
        this.showMascota();
      },
      error: (error: any) => {
        this.toastrService.error('Error al eliminar mascota');
      }
    });
  }
}