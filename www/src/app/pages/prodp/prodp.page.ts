import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalproComponent } from "../../components/modalpro/modalpro.component";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-prodp",
  templateUrl: "./prodp.page.html",
  styleUrls: ["./prodp.page.scss"],
})
export class ProdpPage implements OnInit {
  fechaRecibido;
  duracion;
  monto;
  codigo;
  type;
  dat1;
  constructor(public modal: ModalController, public auth: AuthService, private route:ActivatedRoute) {
    route.params.subscribe(val =>{
      this.type = this.auth.getType();
      this.dat1 = localStorage.getItem("id_usuario");
      console.log(this.dat1);
      this.auth.getProdep(this.dat1).subscribe((dat) => {
      this.fechaRecibido = dat["prodep"][0].fecha_recibido;
      this.duracion = dat["prodep"][0].duracion_anios;
      this.monto = dat["prodep"][0].monto_economico;
    });
    });
    
  }

  ngOnInit() {
    this.type = this.auth.getType();
    var dat = localStorage.getItem("id_usuario");
    console.log(dat);
    this.auth.getProdep(dat).subscribe((dat) => {
      this.fechaRecibido = dat["prodep"][0].fecha_recibido;
      this.duracion = dat["prodep"][0].duracion_anios;
      this.monto = dat["prodep"][0].monto_economico;
    });
  }
  openModal() {
    this.presentModal();
  }
  salir(){
    this.auth.logout();
  }
  openModalData() {
    this.presentModalData();
  }
  async presentModalData() {
    var isCreated = 2;
    const modal2 = await this.modal.create({
      component: ModalproComponent,
      componentProps: {
        cre: isCreated,
        codigo: this.codigo,
        duracion: this.duracion,
        monto: this.monto,
        fecha: this.fechaRecibido,
      },
    });
    return await modal2.present();
  }
  async presentModal() {
    var isCreated = 1;
    const modal = await this.modal.create({
      component: ModalproComponent,
      componentProps: {
        cre: isCreated,
      },
    });
    return await modal.present();
  }
  filterData(dat) {
    this.codigo = dat;
    this.auth.getProdep(dat).subscribe((dat) => {
      this.fechaRecibido = dat["prodep"][0].fecha_recibido;
      this.duracion = dat["prodep"][0].duracion_anios;
      this.monto = dat["prodep"][0].monto_economico;
    });
  }
  subirExpediente($event) {
    this.auth.uploadExpediente($event.target.files[0], this.codigo);
  }
  subirDictamen($event) {
    this.auth.uploadDictamen($event.target.files[0], this.codigo);
  }
}
