import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { LoginObject } from "../../services/login-object.model";
import { AuthenticationService } from "app/shared/authentication.service";
import { StorageService } from "../core/services/storage.service";
import { Router } from "@angular/router";
import { Session } from "../core/models/session.model";
@Component({
  selector: "login",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  contrasena: String;
  data: any;
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: { code: number; message: string } = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Usuario: ["", Validators.required],
      Contrasena: ["", Validators.required],
    });
  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.valid) {
      const log = new LoginObject(this.loginForm.value);
      this.authenticationService.login(log).subscribe(
        (response) => {
          console.log("puras maamadas aqui");
          this.correctLogin(response);
        },
        (error) => {
          console.log(error);
          console.log(error.error.text);
          this.data = {
            token: error.error.text,
            user: {
              nombre: "",
              Apellido_paterno: "",
              Apellido_materno: "",
              Correo: log.Usuario,
              Contrasena: log.Contrasena,
              Telefono: "",
              Curp: "",
              Ine: "",
              Fecha_nacimiento: "",
              creado_en: "",
              modificado_en: "",
              borrado_en: false,
            },
          };

          this.correctLogin(this.data);
        }
      );
    }
  }

  private correctLogin(data: Session) {
    console.log("ando aca");
    this.storageService.setCurrentSession(data);
    this.router.navigate(["dashboard"]);
  }
}
