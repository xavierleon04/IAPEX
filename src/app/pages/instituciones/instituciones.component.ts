import { Component, OnInit } from "@angular/core";
import { Constants } from "assets/Config";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../services/data.service";
import { Institution, User } from "../../interfaces/index";
import { StorageService } from "../core/services/storage.service";
import { EmployeeService } from "../../services/employee.service";
import { InstitutionsService } from "../../services/institutions.service";

@Component({
  moduleId: module.id,
  selector: "instituciones-cmp",
  templateUrl: "instituciones.component.html",
})
export class InstitucionesComponent {
  institution: Institution[];
  user: User[];
  indx: number = 0;
  Nombre_institucion: String;
  Direccion: String;
  Estado: String;
  Ciudad: String;
  Codigo_postal: String;
  Id_user: Number;

  NombreInstitucionError: string = '';
  DireccionError: string = '';
  EstadoError: string = '';
  CiudadError: string = '';
  CPError: string = '';
  IdUserError: string = '';

  constructor(
    private modal: NgbModal,
    private service: DataService,
    private storageService: StorageService,
    private institutionService: InstitutionsService,
    private employeeSevice: EmployeeService
  ) {
    this.institutionService
      .getInstitutions()
      .toPromise()
      .then((data) => {
        this.institution = data;
        console.log(data);
      });
    this.employeeSevice.getEmployees().subscribe((request) => {
      this.user = request;
      console.log(this.user);
    });

    console.log(storageService.headerToken());
  }
  openSM(contenido) {
    this.modal.open(contenido, { size: "lg" });
  }
  openUp(update, index) {
    this.Nombre_institucion = this.institution[index].nombre_institucion;
    this.Direccion = this.institution[index].direccion;
    this.Estado = this.institution[index].estado;
    this.Ciudad = this.institution[index].ciudad;
    this.Codigo_postal = this.institution[index].codigo_postal;
    this.Id_user = this.institution[index].id_user;

    console.log(this.institution[index].id_user);
    this.modal.open(update, { size: "lg" });
    this.indx = index;
  }
  openDl(borrar, indx) {
    this.modal.open(borrar, { size: "lg" });
    this.indx = indx;
  }

  private blanco() {
    this.Nombre_institucion = null;
    this.Direccion = null;
    this.Estado = null;
    this.Ciudad = null;
    this.Codigo_postal = null;
    this.Id_user = null;
  }

  validate(datas) {
    if (
      datas.Ciudad == null ||
      datas.Codigo_postal == null ||
      datas.Direccion == null ||
      datas.Estado == null ||
      isNaN(datas.Id_user) ||
      datas.Nombre_institucion == null ||
      datas.Ciudad == " " ||
      datas.Codigo_postal == " " ||
      datas.Direccion == " " ||
      datas.Estado == " " ||
      datas.Nombre_institucion == " " ||
      datas.Ciudad == "" ||
      datas.Codigo_postal == "" ||
      datas.Direccion == "" ||
      datas.Estado == "" ||
      datas.Nombre_institucion == ""
    ) {
      if (datas.Nombre_institucion == null || datas.Nombre_institucion == " " || datas.Nombre_institucion == "") {
        this.NombreInstitucionError = Constants.MesaggeError.requiredError;
      } else {
        this.NombreInstitucionError = '';
      }

      if (datas.Direccion == null || datas.Direccion == " " || datas.Direccion == "") {
        this.DireccionError = Constants.MesaggeError.requiredError;
      } else {
        this.DireccionError = '';
      }

      if (datas.Estado == null || datas.Estado == " " || datas.Estado == "") {
        this.EstadoError = Constants.MesaggeError.requiredError;
      } else {
        this.EstadoError = '';
      }

      if (datas.Ciudad == null || datas.Ciudad == " " || datas.Ciudad == "") {
        this.CiudadError = Constants.MesaggeError.requiredError;
      } else {
        this.CiudadError = '';
      }

      if (datas.Codigo_postal == null || datas.Codigo_postal == " " || datas.Codigo_postal == "") {
        this.CPError = Constants.MesaggeError.requiredError;
      } else {
        this.CPError = '';
      }

      if (isNaN(datas.Id_user)) {
        this.IdUserError = Constants.MesaggeError.requiredError;
      } else {
        this.IdUserError = '';
      }

      return false;
    } else if (this.validateNombreInstitucion(datas)) {
      this.clear();
      this.NombreInstitucionError = Constants.MesaggeError.nombreInstitucionDuplicateError;
      return false;
    } else if (datas.Codigo_postal.length < 5) {
      this.CPError = Constants.MesaggeError.codigoPostalLengthError;
      return false;
    } else {
      this.clear();
      return true;
    }
  }

  validateUpdate(datas) {
    if (
      datas.Ciudad == null ||
      datas.Codigo_postal == null ||
      datas.Direccion == null ||
      datas.Estado == null ||
      isNaN(datas.Id_user) ||
      datas.Nombre_institucion == null ||
      datas.Ciudad == " " ||
      datas.Codigo_postal == " " ||
      datas.Direccion == " " ||
      datas.Estado == " " ||
      datas.Nombre_institucion == " " ||
      datas.Ciudad == "" ||
      datas.Codigo_postal == "" ||
      datas.Direccion == "" ||
      datas.Estado == "" ||
      datas.Nombre_institucion == ""
    ) {
      if (datas.Nombre_institucion == null || datas.Nombre_institucion == " " || datas.Nombre_institucion == "") {
        this.NombreInstitucionError = Constants.MesaggeError.requiredError;
      } else {
        this.NombreInstitucionError = '';
      }

      if (datas.Direccion == null || datas.Direccion == " " || datas.Direccion == "") {
        this.DireccionError = Constants.MesaggeError.requiredError;
      } else {
        this.DireccionError = '';
      }

      if (datas.Estado == null || datas.Estado == " " || datas.Estado == "") {
        this.EstadoError = Constants.MesaggeError.requiredError;
      } else {
        this.EstadoError = '';
      }

      if (datas.Ciudad == null || datas.Ciudad == " " || datas.Ciudad == "") {
        this.CiudadError = Constants.MesaggeError.requiredError;
      } else {
        this.CiudadError = '';
      }

      if (datas.Codigo_postal == null || datas.Codigo_postal == " " || datas.Codigo_postal == "") {
        this.CPError = Constants.MesaggeError.requiredError;
      } else {
        this.CPError = '';
      }

      if (isNaN(datas.Id_user)) {
        this.IdUserError = Constants.MesaggeError.requiredError;
      } else {
        this.IdUserError = '';
      }

      return false;
    } else if (datas.Codigo_postal.length < 5) {
      this.clear();
      this.CPError = Constants.MesaggeError.codigoPostalLengthError;
      return false;
    } else {
      this.clear();
      return true;
    }
  }

  validateNombreInstitucion(datas) {
    for (let i = 0; i < this.institution.length; i++) {
      if (datas.Nombre_institucion === this.institution[i].nombre_institucion) {
        this.NombreInstitucionError = '';
        return true;
      }
    }
    return false;
  }

  CreateInstitution(validar) {
    let datas = {
      Nombre_institucion: this.Nombre_institucion,
      Direccion: this.Direccion,
      Estado: this.Estado,
      Ciudad: this.Ciudad,
      Codigo_postal: this.Codigo_postal,
      Id_user: Number(this.Id_user),
    };
    if (this.validate(datas)) {
      this.institutionService.createInstitution(datas).subscribe((response) => {
        console.log(response);
        this.institution.push(response);
      });

      this.blanco();
      this.modal.dismissAll();
    }
  }

  updateInstitution(id) {
    let datas = {
      id: id,
      nombre_institucion: this.Nombre_institucion,
      direccion: this.Direccion,
      estado: this.Estado,
      ciudad: this.Ciudad,
      codigo_postal: this.Codigo_postal,
      id_user: Number(this.Id_user),
    };
    if (this.validateUpdate(datas)) {
      this.institutionService.updateInstitution(datas).subscribe((request) => {
        console.log(request);
      });
      this.blanco();
      this.modal.dismissAll();
    }
  }

  deleteInstitution(id, indx) {
    this.institutionService.deleteInstitution(id).subscribe((request) => {
      console.log(request);
      this.institution.splice(indx, 1);
    });
    this.modal.dismissAll();
  }

  clear() {
    this.NombreInstitucionError = '';
    this.DireccionError = '';
    this.EstadoError = '';
    this.CiudadError = '';
    this.CPError = '';
    this.IdUserError = '';
  }
}
