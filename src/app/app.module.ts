import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LayoutModule } from "./layout/layout.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
