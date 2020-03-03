import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private socket: Socket) { 
    this.checkStatus();
  }
  public socketSatatus = false;


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
}
