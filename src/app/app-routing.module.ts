import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "./layout/app-layout/app-layout.component";
import { HomeComponent } from "./page/home/home.component";
import { LoginLayoutComponent } from "./layout/login-layout/login-layout.component";
import { LoginComponent } from "./page/login/login.component";
import { CommonModule } from "@angular/common";
import { PasswordListComponent } from "./page/password-list/password-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "passwordList", component: PasswordListComponent },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [{ path: "login", component: LoginComponent }],
  },
];

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
