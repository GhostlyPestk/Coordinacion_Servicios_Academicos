import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "cuerposacademicos",
    loadChildren: () =>
      import("./pages/prodep/prodep.module").then((m) => m.ProdepPageModule),
  },

  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "info",
    loadChildren: () =>
      import("./pages/info/info.module").then((m) => m.InfoPageModule),
  },
  {
    path: "ca",
    loadChildren: () =>
      import("./pages/ca/ca.module").then((m) => m.CaPageModule),
  },
  {
    path: "prodep",
    loadChildren: () =>
      import("./pages/prodp/prodp.module").then((m) => m.ProdpPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
