import { Component, OnInit } from "@angular/core";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.listener();
  }
  listener() {
    listen("reload", () => {
      window.location.reload();
    });
  }
}
