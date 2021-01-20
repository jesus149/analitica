import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { IUsuario } from '../shared/model/usuario';
import { SettingsService } from '../services/settings.service';
import Swal from 'sweetalert2';

/**
 * Inicia los plugis para el correcto funcionamiento
 */
declare function int_plugins();

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isOK: boolean;
  alert:string;
  alert_text: string;
  loginForm = this.fb.group({
    user_email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    user_pass: [null, [Validators.required]],
  });

  checked = false;
  disabled = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private settingsService: SettingsService,
    public matDialog: MatDialog
  ) {
    this.settingsService.clean()
  }

  ngOnInit(): void {
    int_plugins();
  }

  login() {
    const usuario = this.createFromForm();
    if (usuario != null) {
      console.log(usuario);
      
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      this.usuarioService.userInfo(usuario).subscribe((resul) => {
      this.onSaveSuccess(resul['body']);
      }, err => {
        console.error('error generado: ' , err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          allowOutsideClick: false,
          text: 'Error en la comunicación',
        });
      });
    }
  }
  register() {
    this.router.navigate(['register']);
  }

  private createFromForm(): IUsuario {
    return {
      ...this.loginForm.value,
    };
  }

  protected onSaveSuccess(result: any): void {
    if (result['generalData'] != undefined) {
      console.log(result);
      this.settingsService.setLocalUser(result);
      this.isOK = true;
      this.router.navigate(['descargaSat']);
      Swal.close();
    } else {
      this.onSaveError();
      this.alert = 'danger';
      this.alert_text=result['message'][0]['message'];
    }
  }

  protected onSaveError(): void {
    this.isOK = false;
  }
}

