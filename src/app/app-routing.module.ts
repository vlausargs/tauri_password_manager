import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppLayoutComponent } from "./layout/app-layout/app-layout.component";
import { LoginLayoutComponent } from "./layout/login-layout/login-layout.component";
import { BlankLayoutComponent } from "./layout/blank-layout/blank-layout.component";
import { LoginComponent } from "./page/login/login.component";
import { OauthComponent } from "./page/oauth/oauth.component";
import { PasswordListComponent } from "./page/password-list/password-list.component";
import { PasswordCreateComponent } from "./page/password-create/password-create.component";
import { PasswordList2Component } from "./page/password-list2/password-list2.component";
import { PasswordDetailComponent } from "./page/password-detail/password-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/passwordList", pathMatch: "full" },
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      { path: "passwordList", component: PasswordListComponent },
      { path: "passwordList2", component: PasswordList2Component },

      { path: "oauth", component: OauthComponent },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [{ path: "login", component: LoginComponent }],
  },
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      { path: "passwordCreate", component: PasswordCreateComponent },
      { path: "passwordDetail/:id", component: PasswordDetailComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    PasswordListComponent,
    PasswordList2Component,
    PasswordCreateComponent,
    PasswordDetailComponent,
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
