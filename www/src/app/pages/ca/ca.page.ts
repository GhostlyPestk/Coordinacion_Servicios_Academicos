import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-ca",
  templateUrl: "./ca.page.html",
  styleUrls: ["./ca.page.scss"],
})
export class CaPage implements OnInit {
  type;
  data;
  integrantes;
  codigo;
  tipo;
  constructor(public auth: AuthService) {
    this.type = this.auth.getType();
    this.data = auth.getCAObj();
    this.integrantes = this.data["integrantes"];
  }

  ngOnInit() {}
  agregar() {
    let obj = {
      codigo: this.codigo,
      tipo: this.tipo,
    };
    this.auth.addIntegrante(obj, this.data.clave);
  }
  eliminar(item) {
    let code = item["integrante"].codigo;
    this.auth.eliminarIntegrante(code);
  }
  subirDictamenCA($event, item) {
    this.auth.uploadDictamenCA($event.target.files[0], this.data.clave);
  }
  subirExpedienteCA($event, item) {
    this.auth.uploadExpedienteCA($event.target.files[0], this.data.clave);
  }
  actualizarExpedienteCA($event, item) {
    this.auth.putExpedienteCA($event.target.files[0], this.data.clave);
  }
}
