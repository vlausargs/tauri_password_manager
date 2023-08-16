import { Component, OnInit } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { UtilFunctionService } from "src/app/utils/util-function.service";
@Component({
  selector: "app-password-list",
  templateUrl: "./password-list.component.html",
  styleUrls: ["./password-list.component.css"],
})
export class PasswordListComponent implements OnInit {
  passwords: any = [];

  tableModel = [
    { prop: "id", label: "ID", width: "500", sortable: true },
    { prop: "name", label: "Name", width: "1400", sortable: true },
    { prop: "created_at", label: "Created At", width: "100", sortable: true },
  ];

  ngOnInit(): void {
    this.getPassword();
  }
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

  getPassword(): void {
    // console.log("run greeting init");
    invoke<any>("list_passwords").then((array: any) => {
      console.log(array);
      this.passwords = array.map((password: any) => ({
        ...password,
        created_at: this._utilFunctionService.convertApiDate(
          user.created_at,
          "DD/MM/YYYY",
        ),
      }));
      // this.msg = array;+
    });
  }
}
