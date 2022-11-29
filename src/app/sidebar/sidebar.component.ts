import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard',       title: 'Dashboard',         icon:'fa-th-large',       class: '' },
  // { path: '/user',            title: 'Perfil',            icon:'fa-user-circle',    class: '' },
  {
    path: "/instituciones",
    title: "Instituciones",
    icon: "fa-building-o",
    class: "",
  },
  { path: "/hospitales", title: "Hospitales", icon: "fa-h-square", class: "" },
  { path: "/personal", title: "Personal", icon: "fa-user-md", class: "" },
  { path: "/ingresados", title: "Ingresados", icon: "fa-male", class: "" },
  { path: "/busquedas", title: "Búsquedas", icon: "fa-search", class: "" },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
