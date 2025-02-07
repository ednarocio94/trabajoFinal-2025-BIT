import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";
import { UsuariosService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, NavBarComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  // Inyección de dependencias
  _usuarioService = inject(UsuariosService);
  _toastrService = inject(ToastrService);
  _router = inject(Router);

  // Definición del formulario
  formularioRegistro = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('', [Validators.required]),
    isAdult: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    role: new FormControl('user', [Validators.required]), // Campo role agregado
  });

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.formularioRegistro.invalid) {
      this._toastrService.error('Por favor, completa todos los campos correctamente.', 'Error');
      return;
    }

    // Obtiene los valores del formulario
    const { fullName, email, password, phone, isAdult, address, role } = this.formularioRegistro.value;

    // Convierte isAdult a booleano
    const isAdultBoolean = isAdult === 'true';

    // Crea el objeto nuevoUsuario
    const nuevoUsuario: User = {
      fullName: fullName as string,
      email: email as string,
      password: password as string,
      phone: phone as string,
      isAdult: isAdultBoolean,
      address: address as string,
      role: role as string, // Incluye el campo role
    };

    console.log(nuevoUsuario);

    // Llama al servicio para registrar el usuario
    this._usuarioService.postUsuarios(nuevoUsuario).subscribe({
      next: (res: any) => {
        console.log('Respuesta exitosa:', res);
        this._toastrService.success('Usuario registrado exitosamente', 'Registro');
        this._router.navigate(['/']); // Redirige al inicio
      },
      error: (err: any) => {
        console.log('Error al registrar usuario:', err.error.mensaje);
        this._toastrService.error(err.error.mensaje || 'Ocurrió un error al registrar el usuario');
        this.formularioRegistro.reset(); // Resetea el formulario
      }
    });
  }
}