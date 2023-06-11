
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errorMsg = "";

  // Llamo a mi servicio de autorizacion
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getUserInfo();
  }


  login(){
    if (this.username.trim().length === 0){
      this.errorMsg = "Username is required";
    } else if (this.password.trim().length === 0){
      this.errorMsg = "Password is required";
    } else{
      this.errorMsg = "";
      // Llamo al servicios auth para verficar el username y el password
      let res = this.auth.login(this.username, this.password);
      // si la respuesta fue el codigo 200 avanzo a la pagina home
      if (res === 200){
        this.router.navigate(['home']);
      }
      // si la respuesta fue 403 se cambia en mensaje de error
      if (res === 403){
        this.errorMsg = "Invalid Credentials";
      }
    }
  }
}
