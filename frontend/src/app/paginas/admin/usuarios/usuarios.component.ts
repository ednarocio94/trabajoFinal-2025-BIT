import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  loginService = inject(LoginService);
  usuariosService= inject(UsuariosService);
  

  allUser: User[] = []
  
  showUsuario() {

    this.usuariosService.getUsuarios().subscribe({
      next: (res: any) => {
        console.log(res)
        this.allUser = res
        // console.log(this.allUser)
      },
      error: (error: any) => {
        console.log(error)
      }
    })

  }


  ngOnInit() {
    this.showUsuario()
  }
loginout(){
  this.loginService.cierreSesion()
  
  }


 }

