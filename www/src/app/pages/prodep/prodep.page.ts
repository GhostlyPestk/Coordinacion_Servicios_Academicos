import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { ModalComponent } from "../../components/modal/modal.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-prodep",
  templateUrl: "./prodep.page.html",
  styleUrls: ["./prodep.page.scss"],
})
export class ProdepPage implements OnInit {
  results: Observable<any>;
  codigo = "";
  dataFilter;
  data;
  type;
  constructor(private authService: AuthService, public modal: ModalController) {
    this.type = this.authService.getType();
    this.authService.getCA().subscribe((data) => {
      this.data = data["resp"];
      this.dataFilter = data["resp"];
    });
  }

  ngOnInit() {}

  salir(){
    this.authService.logout();
  }

  searchChanged() {
    //this.results = this.authService.getProd();
  }
  openModal() {
    this.presentModal();
  }
  openModalData(data) {
    this.presentModalData(data);
  }
  async presentModalData(data) {
    var dat = data;
    var isCreated = 2;
    const modal2 = await this.modal.create({
      component: ModalComponent,
      componentProps: {
        cre: isCreated,
        nombre: dat["nombre"],
        clave: dat["clave"],
        anio: dat["anio_creacion"],
        nivel: dat["nivel"],
        id: dat["_id"],
      },
    });
    return await modal2.present();
  }
  async presentModal() {
    var isCreated = 1;
    const modal = await this.modal.create({
      component: ModalComponent,
      componentProps: {
        cre: isCreated,
        nombre: "",
        clave: "",
        anio: "",
        nivel: "",
      },
    });
    return await modal.present();
  }
  verCA(obj) {
    this.authService.setCAObj(obj);
  }
  filterData(event) {
    let aux = [];
    aux = this.data;
    this.dataFilter = aux.filter((data) =>
      data.clave.toLowerCase().includes(event.toLowerCase())
    );
  }
  descargar(item) {
    this.authService.descargarExpediente(item.clave);
  }
}
