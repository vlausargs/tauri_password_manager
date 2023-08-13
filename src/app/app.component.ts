import { Component, OnInit } from "@angular/core";
import { invoke } from "@tauri-apps/api/tauri";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    // console.log("run dbinit");
    // invoke<string>("init_connection");
  }
}
