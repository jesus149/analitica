import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  Validators,
  FormGroupDirective,
  FormControl,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { RouterLink, Router } from '@angular/router';
import { IUsuario } from '../shared/model/usuario';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // loginForm = new FormControl('', [Validators.required, Validators.email]);

  checked = false;
  disabled = false;

  matcher = new MyErrorStateMatcher();

  loginForm = this.fb.group({
    user_email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    user_email_b: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    user_pass: [null, [Validators.required]],
    user_pass_b: [null, [Validators.required]],
    user_name: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.validatorFields();
    });
  }

  registrar(): void {
    const usuario = this.createFromForm();
    // Swal.fire({
    //   icon: 'success',
    //   title: 'El registro se creo correctamente ' ,
    //   showConfirmButton: false,
    //   timer: 1500,
    // });

    if (usuario) {
      this.usuarioService.create(usuario).subscribe(
        (result: any) => {
          console.log('resultado: ', JSON.stringify(result));
          Swal.fire({
            icon: 'success',
            title: 'El registro se creo correctamente ' + result.status,
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['login']);
        },
        (err: any) => {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      );
    }
  }

  private createFromForm(): IUsuario {
    return {
      ...this.loginForm.value,
    };
  }

  private validatorFields(): void {
    if (
      this.loginForm.get(['user_email'])!.value &&
      this.loginForm.get(['user_email_b'])!.value
    ) {
      if (
        this.loginForm.get(['user_email'])!.value !==
        this.loginForm.get(['user_email_b'])!.value
      ) {
        this.loginForm.controls['user_email'].setErrors({ incorrect: true });
        this.loginForm.controls['user_email_b'].setErrors({ incorrect: true });
      } else {
        this.loginForm.controls['user_email'].setErrors(null);
        this.loginForm.controls['user_email_b'].setErrors(null);
      }
    }

    if (
      this.loginForm.get(['user_pass'])!.value &&
      this.loginForm.get(['user_pass_b'])!.value
    ) {
      if (
        this.loginForm.get(['user_pass'])!.value !==
        this.loginForm.get(['user_pass_b'])!.value
      ) {
        this.loginForm.controls['user_pass'].setErrors({ incorrect: true });
        this.loginForm.controls['user_pass_b'].setErrors({ incorrect: true });
      } else {
        this.loginForm.controls['user_pass'].setErrors(null);
        this.loginForm.controls['user_pass_b'].setErrors(null);
      }
    }
  }
}
