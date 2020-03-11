import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {


  usuariosActivos: Observable<any>;
  constructor(private ws: ChatService) { }

  ngOnInit() {
    this.usuariosActivos = this.ws.usuariosActivos();
  }

}
