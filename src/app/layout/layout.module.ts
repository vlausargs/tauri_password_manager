import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { RouterModule } from "@angular/router";
import { LoginLayoutComponent } from "./login-layout/login-layout.component";
import { BrowserModule } from "@angular/platform-browser";
import { BlankLayoutComponent } from "./blank-layout/blank-layout.component";

@NgModule({
  declarations: [
    AppLayoutComponent,
    LoginLayoutComponent,
    BlankLayoutComponent,
  ],
  imports: [CommonModule, BrowserModule, RouterModule.forChild([])],
  exports: [AppLayoutComponent, LoginLayoutComponent, BlankLayoutComponent],
})
export class LayoutModule {}
