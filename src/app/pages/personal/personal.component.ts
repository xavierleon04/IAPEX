import { Component, Injectable, Input, OnInit, Optional } from "@angular/core";
import { User } from "../../interfaces/index";
import { Constants } from "assets/Config";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "app/services/data.service";
import { ReactiveFormsModule } from "@angular/forms";
import { EmployeeService } from "app/services/employee.service";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { constants } from "buffer";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
})
export class PersonalComponent {
  ErroMessage: String;
  Aux: String;
  user: any[];
  indx: number = 0;
  Myform: FormGroup;
  local_data: any;
  datos: any;
  nombre: String;
  Apellido_paterno: String;
  Apellido_materno: String;
  Correo: String;
  Contrasena: String;
  Telefono: String;
  Curp: String;
  Ine: String;
  Fecha_nacimiento: Date;

  NombreError: string = '';
  ApPaternoError: string = '';
  ApMaternoError: string = '';
  CorreoError: string = '';
  ContrasenaError: string = '';
  TelefonoError: string = '';
  CURPError: string = '';
  FechaNacimientoError: string = '';
  INEError: string = '';

  constructor(
    private modal: NgbModal,
    private service: DataService,
    private employeeService: EmployeeService
  ) {
    this.employeeService.getEmployees().subscribe((response) => {
      localStorage.setItem("users", JSON.stringify(response));
      this.user = JSON.parse(localStorage.getItem("users"));
      console.log(this.user);
    });
  }

  getEmplo() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.user = response;
      console.log(response);
    });
  }

  openSMA(contenido) {
    this.modal.open(contenido, { size: "lg" });
  }
  openUp(update, index) {
    this.modal.open(update, { size: "lg" });
    this.indx = index;
    this.Apellido_materno = this.user[index].apellido_materno;
    this.Apellido_paterno = this.user[index].apellido_paterno;
    this.Contrasena = this.user[index].contrasena;
    this.Correo = this.user[index].correo;
    this.Curp = this.user[index].curp;
    this.Fecha_nacimiento = this.user[index].fecha_nacimiento;
    this.Ine = this.user[index].ine;
    this.Telefono = this.user[index].telefono;
    this.nombre = this.user[index].nombre;
  }
  openDl(borrar, indx) {
    this.modal.open(borrar, { size: "lg" });
    this.indx = indx;
  }

  private blanco() {
    this.nombre = null;
    this.Apellido_paterno = null;
    this.Apellido_materno = null;
    this.Correo = null;
    this.Contrasena = null;
    this.Telefono = null;
    this.Curp = null;
    this.Ine = null;
    this.Fecha_nacimiento = null;
  }

  validate(datas) {
    if (
      datas.nombre == null ||
      datas.Apellido_paterno == null ||
      datas.Apellido_materno == null ||
      datas.Correo == null ||
      datas.Contrasena == null ||
      datas.Telefono == null ||
      datas.Curp == null ||
      datas.Ine == null ||
      datas.Fecha_nacimiento == null ||
      datas.nombre == " " ||
      datas.Apellido_paterno == " " ||
      datas.Apellido_materno == " " ||
      datas.Correo == " " ||
      datas.Contrasena == " " ||
      datas.Telefono == " " ||
      datas.Curp == " " ||
      datas.Ine == " " ||
      datas.Fecha_nacimiento == " " ||
      datas.nombre == "" ||
      datas.Apellido_paterno == "" ||
      datas.Apellido_materno == "" ||
      datas.Correo == "" ||
      datas.Contrasena == "" ||
      datas.Telefono == "" ||
      datas.Curp == "" ||
      datas.Ine == "" ||
      datas.Fecha_nacimiento == ""
    ) {
      if (datas.nombre == null || datas.nombre == " " || datas.nombre == "") {
        this.NombreError = Constants.MesaggeError.requiredError;
      } else {
        this.NombreError = '';
      }

      if (datas.Apellido_paterno == null || datas.Apellido_paterno == " " || datas.Apellido_paterno == "") {
        this.ApPaternoError = Constants.MesaggeError.requiredError;
      } else {
        this.ApPaternoError = '';
      }

      if (datas.Apellido_materno == null || datas.Apellido_materno == " " || datas.Apellido_materno == "") {
        this.ApMaternoError = Constants.MesaggeError.requiredError;
      } else {
        this.ApMaternoError = '';
      }

      if (datas.Correo == null || datas.Correo == " " || datas.Correo == "") {
        this.CorreoError = Constants.MesaggeError.requiredError;
      } else {
        this.CorreoError = '';
      }

      if (datas.Contrasena == null || datas.Contrasena == " " || datas.Contrasena == "") {
        this.ContrasenaError = Constants.MesaggeError.requiredError;
      } else {
        this.ContrasenaError = '';
      }

      if (datas.Telefono == null || datas.Telefono == " " || datas.Telefono == "") {
        this.TelefonoError = Constants.MesaggeError.requiredError;
      } else {
        this.TelefonoError = '';
      }

      if (datas.Curp == null || datas.Curp == " " || datas.Curp == "") {
        this.CURPError = Constants.MesaggeError.requiredError;
      } else {
        this.CURPError = '';
      }

      if (datas.Ine == null || datas.Ine == " " || datas.Ine == "") {
        this.INEError = Constants.MesaggeError.requiredError;
      } else {
        this.INEError = '';
      }

      if (datas.Fecha_nacimiento == null || datas.Fecha_nacimiento == " " || datas.Fecha_nacimiento == "") {
        this.FechaNacimientoError = Constants.MesaggeError.requiredError;
      } else {
        this.FechaNacimientoError = '';
      }

      return false;
    } else if (datas.Telefono.length < 10) {
      this.clear();
      this.TelefonoError = Constants.MesaggeError.telefonoLengthError;
      return false;
    } else if (isNaN(datas.Telefono)) {
      this.TelefonoError = Constants.MesaggeError.telefonoisNaNError;
      return false;
    } else if (datas.Curp.length < 18) {
      this.TelefonoError = '';
      this.CURPError = Constants.MesaggeError.curpLengthError;
      return false;
    } else if (this.validateCurp(datas)) {
      this.CURPError = Constants.MesaggeError.curpWrongError;
      return false;
    } else if (this.validateEmail(datas)) {
      this.CorreoError = Constants.MesaggeError.correoDuplicateError;
      return false;
    } else {
      this.clear();
      return true;
    }
  }

  validateUpdate(datas) {
    if (
      datas.nombre == null ||
      datas.Apellido_paterno == null ||
      datas.Apellido_materno == null ||
      datas.Correo == null ||
      datas.Contrasena == null ||
      datas.Telefono == null ||
      datas.Curp == null ||
      datas.Ine == null ||
      datas.Fecha_nacimiento == null ||
      datas.nombre == " " ||
      datas.Apellido_paterno == " " ||
      datas.Apellido_materno == " " ||
      datas.Correo == " " ||
      datas.Contrasena == " " ||
      datas.Telefono == " " ||
      datas.Curp == " " ||
      datas.Ine == " " ||
      datas.Fecha_nacimiento == " " ||
      datas.nombre == "" ||
      datas.Apellido_paterno == "" ||
      datas.Apellido_materno == "" ||
      datas.Correo == "" ||
      datas.Contrasena == "" ||
      datas.Telefono == "" ||
      datas.Curp == "" ||
      datas.Ine == "" ||
      datas.Fecha_nacimiento == ""
    ) {
      if (datas.nombre == null || datas.nombre == " " || datas.nombre == "") {
        this.NombreError = Constants.MesaggeError.requiredError;
      } else {
        this.NombreError = '';
      }

      if (datas.Apellido_paterno == null || datas.Apellido_paterno == " " || datas.Apellido_paterno == "") {
        this.ApPaternoError = Constants.MesaggeError.requiredError;
      } else {
        this.ApPaternoError = '';
      }

      if (datas.Apellido_materno == null || datas.Apellido_materno == " " || datas.Apellido_materno == "") {
        this.ApMaternoError = Constants.MesaggeError.requiredError;
      } else {
        this.ApMaternoError = '';
      }

      if (datas.Correo == null || datas.Correo == " " || datas.Correo == "") {
        this.CorreoError = Constants.MesaggeError.requiredError;
      } else {
        this.CorreoError = '';
      }

      if (datas.Contrasena == null || datas.Contrasena == " " || datas.Contrasena == "") {
        this.ContrasenaError = Constants.MesaggeError.requiredError;
      } else {
        this.ContrasenaError = '';
      }

      if (datas.Telefono == null || datas.Telefono == " " || datas.Telefono == "") {
        this.TelefonoError = Constants.MesaggeError.requiredError;
      } else {
        this.TelefonoError = '';
      }

      if (datas.Curp == null || datas.Curp == " " || datas.Curp == "") {
        this.CURPError = Constants.MesaggeError.requiredError;
      } else {
        this.CURPError = '';
      }

      if (datas.Ine == null || datas.Ine == " " || datas.Ine == "") {
        this.INEError = Constants.MesaggeError.requiredError;
      } else {
        this.INEError = '';
      }

      if (datas.Fecha_nacimiento == null || datas.Fecha_nacimiento == " " || datas.Fecha_nacimiento == "") {
        this.FechaNacimientoError = Constants.MesaggeError.requiredError;
      } else {
        this.FechaNacimientoError = '';
      }

      return false;
    } else if (datas.Telefono.length < 10) {
      this.clear();
      this.TelefonoError = Constants.MesaggeError.telefonoLengthError;
      return false;
    } else if (isNaN(datas.Telefono)) {
      this.TelefonoError = Constants.MesaggeError.telefonoisNaNError;
      return false;
    } else if (datas.Curp.length < 18) {
      this.TelefonoError = '';
      this.CURPError = Constants.MesaggeError.curpLengthError;
      return false;
    } else {
      this.clear();
      return true;
    }
  }

  validateCurp(datas) {
    for (let i = 0; i < this.user.length; i++) {
      if (datas.Curp === this.user[i].Curp) {
        this.CURPError = '';
        return true;
      }
    }
    return false;
  }
  validateEmail(datas) {
    for (let i = 0; i < this.user.length; i++) {
      if (datas.Correo === this.user[i].correo) {
        this.CorreoError = '';
        return true;
      }
    }
    return false;
  }

  imprimo(validar) {
    const datas = {
      nombre: this.nombre,
      Apellido_paterno: this.Apellido_paterno,
      Apellido_materno: this.Apellido_materno,
      Correo: this.Correo,
      Contrasena: this.Contrasena,
      Telefono: this.Telefono,
      Curp: this.Curp,
      Ine: this.Ine,
      Fecha_nacimiento: this.Fecha_nacimiento,
    };
    console.log(datas);
    if (this.validate(datas)) {
      this.employeeService.createEmployee(datas).subscribe((response) => {
        this.user.push(response);
        console.log(response);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  updateEmployee(id, user) {
    const datas = {
      id: id,
      nombre: this.nombre,
      Apellido_paterno: this.Apellido_paterno,
      Apellido_materno: this.Apellido_materno,
      Correo: this.Correo,
      Contrasena: this.Contrasena,
      Telefono: this.Telefono,
      Curp: this.Curp,
      Ine: this.Ine,
      Fecha_nacimiento: this.Fecha_nacimiento,
    };
    console.log(datas, user);
    if (this.validateUpdate(datas)) {
      this.employeeService.updateEmployee(datas).subscribe((response) => {
        console.log(response);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  deleteEmployee(id, indx) {
    this.employeeService.deleteEmploye(id).subscribe((response) => {
      console.log(response);

      this.user.splice(indx, 1);
    });
    console.log(id);
    this.modal.dismissAll();
  }

  clear() {
    this.NombreError = '';
    this.ApPaternoError = '';
    this.ApMaternoError = '';
    this.CorreoError = '';
    this.ContrasenaError = '';
    this.TelefonoError = '';
    this.CURPError = '';
    this.FechaNacimientoError = '';
    this.INEError = '';
  }
}
