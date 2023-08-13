import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.css"],
})
export class AppLayoutComponent {
  constructor(private router: Router) {
    console.log("applayout");
  }
  goto(path: any) {
    console.log(path);
    this.router.navigate([path]);
  }
}
