import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NavParams } from "@ionic/angular";

@Component({
  selector: "app-modalpro",
  templateUrl: "./modalpro.component.html",
  styleUrls: ["./modalpro.component.scss"],
})
export class ModalproComponent implements OnInit {
  cre;
  @Input() codigo: string;
  @Input() fecha: string;
  @Input() duracion: string;
  @Input() monto: string;
  constructor(public auth: AuthService, public navParams: NavParams) {
    this.cre = this.navParams.get("cre");
  }

  ngOnInit() {}
  crearProdep() {
    let obj = {
      codigo: this.codigo,
      fecha: this.fecha,
      duracion: this.duracion,
      monto: this.monto,
    };
      this.auth.crearProdep(obj);
  }
  actualizarProdep() {
    let obj = {
      codigo: this.codigo,
      fecha: this.fecha,
      duracion: this.duracion,
      monto: this.monto,
    };
    this.auth.actualizarProdep(obj);
  }
  arbol(){
    let obj = {
      fecha: this.fecha,
      duracion: this.duracion
    }
    this.auth.getArbol(obj);
  }
}
