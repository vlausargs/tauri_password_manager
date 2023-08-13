import { Component, OnInit } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";
import { UtilFunctionService } from "src/app/utils/util-function.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  greetingMessage = "";
  users: any = [];
  constructor(private _utilFunctionService: UtilFunctionService) {}

  tableModel = [
    { prop: "id", label: "ID", width: "500", sortable: true },
    { prop: "name", label: "Name", width: "1400", sortable: true },
    { prop: "created_at", label: "Created At", width: "100", sortable: true },
  ];

  ngOnInit(): void {
    setTimeout(() => this.getUser(), 1000);
  }
  getUser(): void {
    // console.log("run greeting init");
    invoke<any>("list_users").then((array: any) => {
      console.log(array);
      this.users = array.map((user: any) => ({
        ...user,
        created_at: this._utilFunctionService.convertApiDate(
          user.created_at,
          "DD/MM/YYYY",
        ),
      }));
      // this.msg = array;+
    });
  }
  createUser(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    invoke<void>("create_user", { newUser: { name: name } }).then(() => {
      window.location.reload();
    });
  }
  deleteUser(id: string): void {
    invoke<void>("delete_user", { id: id }).then(() => {
      window.location.reload();
    });
  }
}
