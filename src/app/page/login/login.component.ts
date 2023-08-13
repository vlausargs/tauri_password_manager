import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { invoke } from "@tauri-apps/api/tauri";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private router: Router) {}
  login(event: SubmitEvent, username: string, password: string): void {
    this.router.navigate(["/home"]);
  }
}
