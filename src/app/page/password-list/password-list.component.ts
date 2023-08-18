import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { invoke } from "@tauri-apps/api/tauri";
import { UtilFunctionService } from "src/app/utils/util-function.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-password-list",
  templateUrl: "./password-list.component.html",
  styleUrls: ["./password-list.component.css"],
})
export class PasswordListComponent implements OnInit {
  passwords: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private _utilFunctionService: UtilFunctionService,
  ) {}
  requestForm = this.formBuilder.group({
    name: ["", Validators.required],
    url: ["", Validators.required],
    password: ["", Validators.required],
  });
  tableModel = [
    // { prop: "id", label: "ID", width: "500", sortable: true },
    { prop: "name", label: "Name", width: "1400", sortable: true },
    { prop: "url", label: "Url", width: "1000", sortable: true },
    { prop: "password", label: "password", width: "1000", sortable: true },
    { prop: "created_at", label: "Created At", width: "200", sortable: true },
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
    event.preventDefault();
    invoke<void>("create_password", {
      newPassword: {
        name: name,
        url: url,
        password: password,
      },
    }).then((e) => {
      console.log(e);
      window.location.reload();
    });
  }

  getPassword(): void {
    // console.log("run greeting init");
    invoke<any>("list_passwords").then((array: any) => {
      this.passwords = array.map((password: any) => ({
        ...password,
        created_at: this._utilFunctionService.convertApiDate(
          password.created_at,
          "DD/MM/YYYY",
        ),
      }));
      // this.msg = array;+
    });
  }

  deletePassword(id: string): void {
    Swal.fire({
      title: "Are you sure wan to delete this data?",
      icon: "warning",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        invoke<void>("delete_password", { id: id }).then(() => {
          Swal.fire("Saved!", "", "success").then(() => {
            window.location.reload();
          });
        });
      }
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
  generateTotp(): void {
    invoke<void>("generate_random_password").then((e: any) => {
      this.requestForm.get("password")?.setValue(e);
    });
  }

  validateTotp(otp: string): void {
    invoke<void>("generate_totp").then((e: any) => {
      console.log(e);
    });
  }
}
