import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public nombre: string = '';
  constructor(public ws: WebsocketService, private router: Router) { }

  ngOnInit() {
  }
  ingresar() {

    if (this.nombre.length === 0) {
      return;
    }
    this.ws.loginWS(this.nombre).then(() => {

      this.router.navigate(['/mensajes']);
    });
  }
}
