import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../interfaces/admin';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-gestion-admin',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-admin.component.html',
  styleUrl: './gestion-admin.component.css',
})
export class GestionAdminComponent {
  AdminService = inject(AdminService);
  loginService = inject(LoginService);
  fb = inject(FormBuilder);

  allAdmin: Admin[] = [];
  adminForm: FormGroup;
  editingAdminId: string | null = null;

  constructor() {
    this.adminForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Admin', Validators.required],
    });
  }

  ngOnInit() {
    this.showAdmin();
  }

  // Obtener todos los administradores
  showAdmin() {
    this.AdminService.getAdmin().subscribe({
      next: (res: any) => {
        this.allAdmin = res.datos;
      },
      error: (error: any) => {
        console.log('Error al obtener administradores', error);
      },
    });
  }

  // Crear un nuevo administrador
  createAdmin() {
    if (this.adminForm.valid) {
      this.AdminService.postAdmin(this.adminForm.value).subscribe({
        next: () => {
          this.showAdmin();
          this.adminForm.reset();
        },
        error: (error: any) => {
          console.log('Error al crear administrador', error);
        },
      });
    }
  }

  // Cargar datos de un administrador para editar
  loadAdminForEdit(admin: Admin) {
    this.editingAdminId = admin._id ?? null;
    this.adminForm.patchValue(admin);
  }

  // Actualizar un administrador
  updateAdmin() {
    if (this.adminForm.valid && this.editingAdminId) {
      this.AdminService.putAdmin(this.editingAdminId, this.adminForm.value).subscribe({
        next: () => {
          this.showAdmin();
          this.adminForm.reset();
          this.editingAdminId = null;
        },
        error: (error: any) => {
          console.log('Error al actualizar administrador', error);
        },
      });
    }
  }

  // Eliminar un administrador
  deleteAdmin(adminId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
      this.AdminService.deleteAdmin(adminId).subscribe({
        next: () => {
          this.showAdmin();
        },
        error: (error: any) => {
          console.log('Error al eliminar administrador', error);
        },
      });
    }
  }

  // Cerrar sesión
  logout() {
    console.log('Cerrando sesión...');
    this.loginService.cierreSesion();
  }
}