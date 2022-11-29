import { Component, OnInit } from "@angular/core";
import { Constants } from "assets/Config";
import { Hospital, User } from "../../interfaces/index";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "app/services/data.service";
import { HospitalService } from "app/services/hospital.service";
import { EmployeeService } from "app/services/employee.service";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
})
export class HospitalesComponent {
  user: User[];
  hospital: Hospital[];
  indx: number = 0;
  nombre_hospital: String;
  direccion: String;
  estado: String;
  ciudad: String;
  codigo_postal: String;
  id_user: number;
  show: boolean = false;
  auxHospital: Hospital;

  NombreHospitalError: string = '';
  DireccionError: string = '';
  EstadoError: string = '';
  CiudadError: string = '';
  CPError: string = '';
  IdUserError: string = '';

  constructor(
    private modal: NgbModal,
    private service: DataService,
    private hospitalService: HospitalService,
    private employeeService: EmployeeService
  ) {
    this.hospitalService.getHospitals().subscribe((request) => {
      localStorage.setItem("hospitals", JSON.stringify(request));
      this.hospital = JSON.parse(localStorage.getItem("hospitals"));
      console.log(this.hospital);
    });

    this.employeeService.getEmployees().subscribe((response) => {
      localStorage.setItem("users", JSON.stringify(response));
      this.user = JSON.parse(localStorage.getItem("users"));
      console.log(this.user);
    });
  }

  openSM(contenido) {
    this.modal.open(contenido, { size: "lg" });
  }
  openUp(update, index) {
    console.log(this.hospital[index]);
    this.nombre_hospital = this.hospital[index].nombre_hospital;
    this.direccion = this.hospital[index].direccion;
    this.estado = this.hospital[index].estado;
    this.ciudad = this.hospital[index].ciudad;
    this.codigo_postal = this.hospital[index].codigo_postal;
    this.id_user = this.hospital[index].id_user;

    this.modal.open(update, { size: "lg" });
    this.indx = index;
  }
  openDl(borrar, index) {
    this.modal.open(borrar, { size: "lg" });
    this.indx = index;
  }

  private blanco() {
    this.nombre_hospital = null;
    this.direccion = null;
    this.estado = null;
    this.ciudad = null;
    this.codigo_postal = null;
    this.id_user = null;
  }

  validate(datas) {
    if (
      datas.ciudad == null ||
      datas.codigo_postal == null ||
      datas.direccion == null ||
      datas.estado == null ||
      isNaN(datas.id_user) ||
      datas.nombre_hospital == null ||
      datas.ciudad == " " ||
      datas.codigo_postal == " " ||
      datas.direccion == " " ||
      datas.estado == " " ||
      datas.nombre_hospital == " " ||
      datas.ciudad == "" ||
      datas.codigo_postal == "" ||
      datas.direccion == "" ||
      datas.estado == "" ||
      datas.nombre_hospital == ""
    ) {
      if (datas.nombre_hospital == null || datas.nombre_hospital == " " || datas.nombre_hospital == "") {
        this.NombreHospitalError = Constants.MesaggeError.requiredError;
      } else {
        this.NombreHospitalError = '';
      }

      if (datas.direccion == null || datas.direccion == " " || datas.direccion == "") {
        this.DireccionError = Constants.MesaggeError.requiredError;
      } else {
        this.DireccionError = '';
      }

      if (datas.estado == null || datas.estado == " " || datas.estado == "") {
        this.EstadoError = Constants.MesaggeError.requiredError;
      } else {
        this.EstadoError = '';
      }

      if (datas.ciudad == null || datas.ciudad == " " || datas.ciudad == "") {
        this.CiudadError = Constants.MesaggeError.requiredError;
      } else {
        this.CiudadError = '';
      }

      if (datas.codigo_postal == null || datas.codigo_postal == " " || datas.codigo_postal == "") {
        this.CPError = Constants.MesaggeError.requiredError;
      } else {
        this.CPError = '';
      }

      if (isNaN(datas.id_user)) {
        this.IdUserError = Constants.MesaggeError.requiredError;
      } else {
        this.IdUserError = '';
      }

      return false;
    } else if (this.validateNombreHospital(datas)) {
      this.clear();
      this.NombreHospitalError = Constants.MesaggeError.nombreHospitalDuplicateError;
      return false;
    } else if (datas.codigo_postal.length < 5) {
      this.CPError = Constants.MesaggeError.codigoPostalLengthError;
      return false;
    } else {
      this.clear();
      return true;
    }
  }

  validateUpdate(datas) {
    if (
      datas.ciudad == null ||
      datas.codigo_postal == null ||
      datas.direccion == null ||
      datas.estado == null ||
      isNaN(datas.id_user) ||
      datas.nombre_hospital == null ||
      datas.ciudad == " " ||
      datas.codigo_postal == " " ||
      datas.direccion == " " ||
      datas.estado == " " ||
      datas.nombre_hospital == " " ||
      datas.ciudad == "" ||
      datas.codigo_postal == "" ||
      datas.direccion == "" ||
      datas.estado == "" ||
      datas.nombre_hospital == ""
    ) {
      if (datas.nombre_hospital == null || datas.nombre_hospital == " " || datas.nombre_hospital == "") {
        this.NombreHospitalError = Constants.MesaggeError.requiredError;
      } else {
        this.NombreHospitalError = '';
      }

      if (datas.direccion == null || datas.direccion == " " || datas.direccion == "") {
        this.DireccionError = Constants.MesaggeError.requiredError;
      } else {
        this.DireccionError = '';
      }

      if (datas.estado == null || datas.estado == " " || datas.estado == "") {
        this.EstadoError = Constants.MesaggeError.requiredError;
      } else {
        this.EstadoError = '';
      }

      if (datas.ciudad == null || datas.ciudad == " " || datas.ciudad == "") {
        this.CiudadError = Constants.MesaggeError.requiredError;
      } else {
        this.CiudadError = '';
      }

      if (datas.codigo_postal == null || datas.codigo_postal == " " || datas.codigo_postal == "") {
        this.CPError = Constants.MesaggeError.requiredError;
      } else {
        this.CPError = '';
      }

      if (isNaN(datas.id_user)) {
        this.IdUserError = Constants.MesaggeError.requiredError;
      } else {
        this.IdUserError = '';
      }

      return false;
    } else if (datas.codigo_postal.length < 5) {
      this.clear();
      this.CPError = Constants.MesaggeError.codigoPostalLengthError;
      return false;
    } else {
      this.clear();
      return true;
    }
  }

  validateNombreHospital(datas) {
    for (let i = 0; i < this.hospital.length; i++) {
      if (datas.nombre_hospital === this.hospital[i].nombre_hospital) {
        this.NombreHospitalError = '';
        return true;
      }
    }
    return false;
  }

  createHospital(validar) {
    let datas = {
      nombre_hospital: this.nombre_hospital,
      direccion: this.direccion,
      estado: this.estado,
      ciudad: this.ciudad,
      codigo_postal: this.codigo_postal,
      id_user: Number(this.id_user),
    };
    if (this.validate(datas)) {
      this.hospitalService.createHospital(datas).subscribe((request) => {
        console.log(request);
        this.hospital.push(request);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  updateHospital(id) {
    let datas = {
      id: id,
      nombre_hospital: this.nombre_hospital,
      direccion: this.direccion,
      estado: this.estado,
      ciudad: this.ciudad,
      codigo_postal: this.codigo_postal,
      id_user: Number(this.id_user),
    };
    datas.id_user = Number(datas.id_user);
    console.log(datas);
    if(this.validateUpdate(datas)) {
      this.hospitalService
        .editHospital(datas)
        .subscribe((request) => console.log(request));
      this.blanco();
      this.modal.dismissAll();
    }
  }

  deleteHospital(id, indx) {
    this.hospitalService.deleteHospital(id).subscribe((request) => {
      console.log(request, indx);
      this.hospital.splice(indx, 1);
    });
    this.modal.dismissAll();
  }

  clear() {
    this.NombreHospitalError = '';
    this.DireccionError = '';
    this.EstadoError = '';
    this.CiudadError = '';
    this.CPError = '';
    this.IdUserError = '';
  }
}
