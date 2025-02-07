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

  // products = [
  //   {
  //     id: 1,
  //     name: 'Ejemplo Producto',
  //     description: 'Esta es una descripción del producto.',
  //     time: '30 minutos',
  //     difficulty: 'Fácil',
  //     price: 50,
  //     image: 'https://via.placeholder.com/150'
  //   }
  // ];

  loginService = inject(LoginService);
  mascotasService = inject(MascotasService);
  toastrService = inject(ToastrService);

  allMacotas: Mascotas[] = [];


  showMascota() {
    this.mascotasService.getMascotas().subscribe({
      next: (res: any) => {
        console.log(res)
        this.allMacotas = res.mascotas
        console.log(this.allMacotas)
      },
      error: (error: any) => {
        console.log(error)
      }
    })

  }


  ngOnInit() {
    this.showMascota()
  }

  logout() {
    console.log('Cerrando sesión...');
    this.loginService.cierreSesion()
  }

}

