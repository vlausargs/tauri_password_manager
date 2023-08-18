import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";

@Component({
  selector: "app-oauth",
  templateUrl: "./oauth.component.html",
  styleUrls: ["./oauth.component.css"],
})
export class OauthComponent {
  validateOtp(otp: any) {
    invoke<any>("validate_totp", {
      otp: otp,
    }).then((e) => {
      console.log(e);
    });
  }
}
