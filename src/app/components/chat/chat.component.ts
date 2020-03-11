import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto: string = "";
  mensajeSubscription: Subscription;
  constructor(public chat: ChatService) { }
  elemento: HTMLElement;

  mensajes: any[] = [];

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajeSubscription = this.chat.obtenerMensaje().subscribe(res => {
      this.mensajes.push(res);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }
  enviar() {



    this.chat.enviarMensaje(this.texto);
    this.texto = '';

  }



}
