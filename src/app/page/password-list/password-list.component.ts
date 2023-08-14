import { Component, OnInit } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { UtilFunctionService } from "src/app/utils/util-function.service";
@Component({
  selector: "app-password-list",
  templateUrl: "./password-list.component.html",
  styleUrls: ["./password-list.component.css"],
})
export class PasswordListComponent implements OnInit {
  ngOnInit(): void {}

  createPassword(
    event: SubmitEvent,
    name: string,
    url: string,
    password: string,
  ): void {
    invoke<void>("create_password", {
      newPassword: {
        name: name,
        url: url,
        password: password,
      },
    }).then(() => {
      window.location.reload();
    });
  }
}
