import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { invoke } from "@tauri-apps/api/tauri";
import Swal from "sweetalert2";

@Component({
  selector: "app-password-detail",
  templateUrl: "./password-detail.component.html",
  styleUrls: ["./password-detail.component.css"],
})
export class PasswordDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  id: any;

  password: any = {};
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getDetail();
  }

  getDetail(): void {
    Swal.fire({ title: "Loading", allowOutsideClick: false });
    Swal.showLoading();
    console.log(this.id);
    invoke<any>("get_password_detail", { id: this.id }).then((res) => {
      this.password = res;
      Swal.close();
    });
  }

  async getPasswordDecrypted(id: string) {
    const { value } = await Swal.fire({
      title: "OTP",
      input: "text",
      inputLabel: "Enter OTP",
      inputValue: "",
      inputAttributes: {
        autocomplete: "off",
      },
      showCancelButton: true,
      inputValidator: (value: any): any => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    invoke<void>("get_password_decrypted", { id: id, otp: value }).then(
      (e: any) => {
        console.log(e);
        if (!e) {
          Swal.fire({
            title: "Error!",
            text: "Wrong OTP!",
            icon: "error",
          });
          return;
        }
        navigator.clipboard.writeText(e?.password);
        Swal.fire("Success", "password copied to clipboard", "success");
      },
    );
  }
}
