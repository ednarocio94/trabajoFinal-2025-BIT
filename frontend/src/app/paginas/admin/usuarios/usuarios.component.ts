import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  private _usuariosService = inject(UsuariosService);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  usuarios: User[] = [];
  userForm: FormGroup;
  editingUserId: string | null = null;

  constructor() {
    this.userForm = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdult: ['', Validators.required],
      address: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this._usuariosService.getUsuarios().subscribe({
      next: (usuarios: User[]) => {
        this.usuarios = usuarios;
        console.log('Usuarios obtenidos:', this.usuarios);
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      const userData: User = {
        ...this.userForm.value,
        isAdult: this.userForm.value.isAdult === 'Sí',
      };

      this._usuariosService.postUsuarios(userData).subscribe({
        next: () => {
          this.obtenerUsuarios(); // Actualiza la lista de usuarios
          this.userForm.reset(); // Limpia el formulario
        },
        error: (error: any) => {
          console.error('Error al crear usuario:', error);
        },
      });
    }
  }

  loadUserForEdit(user: User): void {
    this.editingUserId = user._id ?? null;
    this.userForm.patchValue({
      ...user,
      isAdult: user.isAdult ? 'Sí' : 'No',
      password: '', // No mostrar la contraseña
    });
  }

  updateUser(): void {
    if (this.userForm.valid && this.editingUserId) {
      const updatedData = {
        ...this.userForm.value,
        isAdult: this.userForm.value.isAdult === 'Sí',
      };

      if (!updatedData.password) {
        delete updatedData.password;
      }

      this._usuariosService.putUsuarios(updatedData, this.editingUserId).subscribe({
        next: () => {
          this.obtenerUsuarios(); // Actualiza la lista de usuarios
          this.userForm.reset(); // Limpia el formulario
          this.editingUserId = null; // Limpia el ID de edición
        },
        error: (error: any) => {
          console.error('Error al actualizar usuario:', error);
        },
      });
    }
  }

  deleteUser(userId: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this._usuariosService.deleteUsuarios(userId).subscribe({
        next: () => {
          this.obtenerUsuarios(); // Actualiza la lista de usuarios
        },
        error: (error: any) => {
          console.error('Error al eliminar usuario:', error);
        },
      });
    }
  }

  loginout(): void {
    this._router.navigate(['/login']);
  }
}