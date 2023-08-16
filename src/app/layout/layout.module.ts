import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { RouterModule } from "@angular/router";
import { LoginLayoutComponent } from "./login-layout/login-layout.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [AppLayoutComponent, LoginLayoutComponent],
  imports: [CommonModule, BrowserModule, RouterModule.forChild([])],
  exports: [AppLayoutComponent, LoginLayoutComponent],
})
export class LayoutModule {}
