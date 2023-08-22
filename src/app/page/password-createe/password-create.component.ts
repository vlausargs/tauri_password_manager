import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { invoke } from "@tauri-apps/api/tauri";
import { UtilFunctionService } from "src/app/utils/util-function.service";
import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { emit } from "@tauri-apps/api/event";

@Component({
  selector: "app-password-create",
  templateUrl: "./password-create.component.html",
  styleUrls: ["./password-create.component.css"],
})
export class PasswordCreateComponent implements OnInit {
  passwords: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private _utilFunctionService: UtilFunctionService,
  ) {}
  requestForm = this.formBuilder.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    url: ["", Validators.required],
    password: ["", Validators.required],
  });
  ngOnInit(): void {}

  createPassword(
    event: SubmitEvent,
    name: string,
    url: string,
    username: string,
    password: string,
  ): void {
    event.preventDefault();
    invoke<void>("create_password", {
      newPassword: {
        name: name,
        url: url,
        username: username,
        password: password,
      },
    }).then(async (e) => {
      let em = await emit("reload");
      appWindow.close();
    });
  }
  generateRandomPassword(): void {
    invoke<void>("generate_random_password").then((e: any) => {
      this.requestForm.get("password")?.setValue(e);
    });
  }
}
