import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppLayoutComponent } from "./layout/app-layout/app-layout.component";
import { HomeComponent } from "./page/home/home.component";
import { LoginLayoutComponent } from "./layout/login-layout/login-layout.component";
import { LoginComponent } from "./page/login/login.component";
import { CommonModule } from "@angular/common";
import { PasswordListComponent } from "./page/password-list/password-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { OauthComponent } from "./page/oauth/oauth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", redirectTo: "/passwordList", pathMatch: "full" },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      { path: "passwordList", component: PasswordListComponent },
      { path: "home", component: HomeComponent },
      { path: "oauth", component: OauthComponent },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [{ path: "login", component: LoginComponent }],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    PasswordListComponent,
    OauthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
