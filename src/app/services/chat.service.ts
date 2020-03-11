import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public ws: WebsocketService) { }

  enviarMensaje(mensaje: string) {
    const payload = {
      de: this.ws.getUsuario().nombre,
      cuerpo: mensaje
    }

    this.ws.emitir('mensaje', payload);
  }
  obtenerMensaje() {
    return this.ws.escuchar('mensaje-nuevo');
  }


  obtenerMensajePrivado() {
    return this.ws.escuchar('mensaje-privado');
  }
}
