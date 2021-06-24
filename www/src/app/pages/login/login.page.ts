import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, AlertController, Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  fgLogin: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform 
  ) {
    this.fgLogin = this.formBuilder.group({
      code: [
        "",
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(1),
        ],
      ],
      password: ["", Validators.required],
    });
  }

  async showPlatform(){
    let text = 'Corriendo en: ' + this.platform.platforms();
    let alert = await this.alertCtrl.create({
      header: 'Entorno',
      subHeader: text,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {}

  async login() {
    if (this.fgLogin.valid) {
      const resp = await this.auth.login(this.fgLogin.value);
      if (resp) {
        this.router.navigateByUrl("/cuerposacademicos");
      } else {
        this.presentToast();
      }
    } else {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Usuario o contraseña incorrectos.",
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }
}
