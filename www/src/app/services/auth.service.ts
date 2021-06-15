import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { NavController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = "http://localhost:3000";
  private readonly TOKEN = "token";
  private readonly TIPOUSUARIO = "usertype";

  public codeUser: string;
  public userType: string;
  public ca;
  constructor(private http: HttpClient, private nav: NavController, public alertController: AlertController) {}

  async presentAlert(errors) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: errors.status,
      message: errors.error.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentMean(tree) {
    const alert = await this.alertController.create({
      header: 'Monto',
      subHeader: 'Monto sugerido:',
      message: tree.mean,
      buttons: ['OK']
    });

    await alert.present();
  }

  async isLoggedIn() {
    // logica para obtener el token en el localStorage, si existe y no esta expirado entonces proceder
    try {
      const resp = await this.validateToken();
      console.log("esta logeado?", resp);
      return resp;
    } catch (err) {
      console.log("error", err);
      return false;
    }
  }

  async login(user: { code: string; password: string }) {
    return await this.http
      .post(`${this.API_URL}/OAuth/iniciar`, {
        codigo: +user.code,
        nip: user.password,
      })
      .pipe(
        tap((token) => {
          if (token["ok"]) {
            var decoded = jwt_decode(token["token"]);
            console.log(decoded);
            localStorage.setItem(this.TIPOUSUARIO, decoded["tipo"]);
            this.saveCredentials(user.code, token["token"]);
          }
        }),
        map((response) => {
          return response["ok"];
        })
      )
      .toPromise();
  }

  /* getUsuario(id_usuario: string) {
    return this.http.get(`${this.API_URL}/usuario/?id=${id_usuario}`).pipe(
      map(response => {
        if(response['ok']){
          return response['body'];
        }else{
          return response['ok'];
        }
      })
    ).toPromise();
  }*/

  /*modifyUsuario(
    usuario: {
      nombres: string,
      apellidos: string,
      area_adscripcion: string,
      plaza_laboral: string,
      nss: string
    }
){
  return this.http.put(`${this.API_URL}/usuario`, {
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    area_adscripcion: usuario.area_adscripcion,
    plaza_laboral: usuario.plaza_laboral,
    numero_social: usuario.nss
  }).pipe(
      tap(resp => {
        console.log(resp);
        if (resp['ok']) {
          return resp['body'];
        }
      }),
      map(response => {
        return response['ok'];
      })
  ).toPromise();
}*/

  /*async createUser(user: { programa_evento
  code: Number,
  name: string,
  lastname: string,
  nip: string,
  area_adscripcion: string,
  plaza_laboral: string,
  numero_social:  Number,
  date: string
}) {
  return await this.http.post(`${this.API_URL}/usuario`, {
    codigo: user.code,
    nombres: user.name,
    apellidos: user.lastname,
    tipo_usuario: "P",
    nip: user.nip,
    area_adscripcion: user.area_adscripcion,
    plaza_laboral: user.plaza_laboral,
    fecha_creacion: user.date,
    numero_social: user.numero_social
  }).pipe(
    tap(token => {
      if (token['ok']) {
        this.saveCredentials(user.code.toString(), token['token']);
      }
    }),
    map(response => {
      return response['ok'];
    })
  ).toPromise();

}*/

  async validateToken() {
    return await this.http
      .post(`${this.API_URL}/OAuth/validar`, null)
      .pipe(
        map((response) => {
          console.log(response);
          if (response["ok"]) {
            this.codeUser = response["body"][0]["codigo"];
            this.userType = response["body"][0]["tipo_usuario"];
            console.log("its a response");
            console.log(response);
          }
          return response["ok"];
        })
      )
      .toPromise();
  }

  private saveCredentials(code: string, token: any) {
    localStorage.removeItem(this.TOKEN);
    localStorage.setItem(this.TOKEN, token);
    localStorage.setItem("id_usuario", code);
  }

  restorePassword(data) {
    return this.http
      .put(`${this.API_URL}/OAuth/recuperar`, {
        codigo: data.code,
        nombres: data.name,
        apellidos: data.lastname,
        numero_social: data.imss,
        nueva_contraseña: data.newpassword,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  changePassword(value) {
    return this.http
      .post(`${this.API_URL}/OAuth/cambiar`, {
        password: value.password,
        changeToken: value.token,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  logout() {
    console.log("Cerrar Sesión");
    this.codeUser = null;
    this.userType = null;
    localStorage.clear();
    //window.location.reload();
    this.nav.navigateRoot('/login');
    //this.nav.navigateRoot("/login", { animated: true });
  }

  getProd(codigo) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .get(`${this.API_URL}/pro/${codigo}`, { headers: headers1 })
      .subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }

  getCA() {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    console.log(headers1);
    return this.http.get(`${this.API_URL}/ca`, { headers: headers1 });
  }
  crearCuerpoAcademico(obj) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .post(`${this.API_URL}/ca`, obj, { headers: headers1 })
      .subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  actualizarCuerpoAcademico(obj) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .put(`${this.API_URL}/ca/${obj.clave}`, obj, { headers: headers1 })
      .subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  setCAObj(obj) {
    this.ca = obj;
    this.nav.navigateForward("ca");
  }
  getCAObj() {
    console.log(this.ca);
    return this.ca;
  }
  addIntegrante(obj, id) {
    console.log(id);
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .post(`${this.API_URL}/ca/${id}/integrante`, obj, { headers: headers1 })
      .subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  eliminarIntegrante(_id) {
    var id = this.ca["clave"];
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .request("delete", `${this.API_URL}/ca/${id}/integrante/${_id}`, {
        headers: headers1,
        body: { codigo: _id },
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  descargarExpediente(id) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .get(`${this.API_URL}/ca/${id}/expediente/descargar`, {
        headers: headers1,
        responseType: 'blob'
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  crearProdep(obj) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
      this.http
      .post(`${this.API_URL}/pro/${obj.codigo}`, obj, {
        headers: headers1,
      })
      .subscribe((dat) => {},(err)=>{this.presentAlert(err)});
    
  }
  getArbol(obj) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
      this.http.post(`${this.API_URL}/pro/arbol/ver`, obj, {
        headers: headers1,
      })
      .subscribe((dat) => {this.presentMean(dat)},(err)=>{this.presentAlert(err)});
    
  }
  getProdep(str) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    return this.http.get(`${this.API_URL}/pro/${str}`, {
      headers: headers1,
    });
  }
  actualizarProdep(obj) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    this.http
      .put(`${this.API_URL}/pro/${obj.codigo}/actualizar`, {
        headers: headers1,
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  getType() {
    var type = localStorage.getItem(this.TIPOUSUARIO);
    if (type === "coordinador de personal") {
      return 1;
    } else if (type === "jefe de departamento") {
      return 2;
    } else if (type === "maestro") {
      return 3;
    }
  }
  uploadExpediente(pdf, code) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    let formData: FormData = new FormData();
    formData.append("expediente", pdf);
    this.http
      .post(`${this.API_URL}/pro/${code}/expediente`, formData, {
        headers: headers1,
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  uploadDictamen(pdf, code) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    let formData: FormData = new FormData();
    formData.append("dictamen", pdf);
    this.http
      .post(`${this.API_URL}/pro/${code}/dictamen`, formData, {
        headers: headers1,
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  uploadDictamenCA(pdf, code) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      authorization: 'Bearer ' + token,
    });
    let formData: FormData = new FormData();
    formData.append("dictamen", pdf);
    this.http
      .post(`${this.API_URL}/ca/${code}/dictamen`, formData, {
        headers: headers1,
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
  uploadExpedienteCA(pdf, code) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      Authorization: token,
    });
    let formData: FormData = new FormData();
    formData.append("expediente", pdf);
    this.http
      .post(`${this.API_URL}/ca/${code}/expediente`, formData, {
        headers: headers1,
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }

  putExpedienteCA(pdf, code) {
    let token = localStorage.getItem(this.TOKEN);
    let headers1 = new HttpHeaders({
      Authorization: token,
    });
    let formData: FormData = new FormData();
    formData.append("expediente", pdf);
    this.http
      .put(`${this.API_URL}/ca/${code}/expediente`, formData, {
        headers: headers1,
      }).subscribe((dat) => {},(err)=>{this.presentAlert(err)});
  }
}
