import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../class/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {



  constructor(private socket: Socket) {
    this.checkStatus();
    this.cargarStorage();
  }
  public socketSatatus = false;
  public usuario: Usuario;

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketSatatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketSatatus = false;

    });
  }

  emitir(evento: string, payload?: any, callback?: Function) {
    console.log('emitiendo .. ', evento);
    this.socket.emit(evento, payload, callback);
  }

  escuchar(evento: string) {
    return this.socket.fromEvent(evento);
  }


  loginWS(nombre: string) {


    return new Promise((resolve, reject) => {
      this.emitir('configurar-usuario', { nombre }, (res: any) => {
        if (res.ok) {

          this.usuario = new Usuario(nombre);
          this.guardarStorage();
          resolve();
        }
      });

    });

  }


  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {

    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    } else {
      this.usuario = null;
    }
  }

  getUsuario() {
    return this.usuario;
  }
}
