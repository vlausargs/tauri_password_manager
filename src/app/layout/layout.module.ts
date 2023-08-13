import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { RouterModule } from "@angular/router";
import { LoginLayoutComponent } from './login-layout/login-layout.component';


@NgModule({
  declarations: [AppLayoutComponent, LoginLayoutComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [AppLayoutComponent],
})
export class LayoutModule {}
