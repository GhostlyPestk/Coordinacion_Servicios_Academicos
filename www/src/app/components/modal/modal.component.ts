import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { NavParams } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() cre: number;
  @Input() nombre: string;
  @Input() clave: string;
  @Input() anio: string;
  @Input() nivel: string;
  @Input() id: string;
  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public auth: AuthService
  ) {
    this.cre = this.navParams.get("cre");
  }
  crearCuerpoAcademico() {
    let obj = {
      nombre: this.nombre,
      clave: this.clave,
      anio_creacion: this.anio,
      nivel: this.nivel,
    };
    this.auth.crearCuerpoAcademico(obj);
  }
  actualizarCuerpoAcademico() {
    let obj = {
      nombre: this.nombre,
      clave: this.clave,
      anio_creacion: this.anio,
      nivel: this.nivel,
    };
    this.auth.actualizarCuerpoAcademico(obj);
  }
  ngOnInit() {}
}
