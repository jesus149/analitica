import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfiguracionService } from '../../services/pages/configuracion.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { rfcData } from 'src/app/shared/model/rfc-data';
import { IrfcData } from '../../shared/model/rfc-data';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguracionDialogComponent } from './configuracion-dialog.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})

export class ConfiguracionComponent implements OnInit {
  alert:string;
  alert_text: string;
  hide : boolean;
  reques: Resques;
  membership_razones_sociales: number;
  onChange: Function;
  file: File | null = null;
  listRFC: IrfcData[] = [];
  dataSource: MatTableDataSource<IrfcData>;
  subscription_end_date: Date;
  subscription_start_date: Date;
  displayedColumns: string[] = ['#', 'RFC', 'Desde', 'Hasta', 'opc'];

  editForm = this.fb.group({
    user_rfc: new FormControl(null, [Validators.required]),
    key_file: new FormControl(null, [Validators.required]),
    key_file_name: new FormControl(null, [Validators.required]),
    cer_file: new FormControl(null, [Validators.required]),
    cer_file_name: new FormControl(null, [Validators.required]),
    user_rfc_clave: new FormControl(null, Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private configuracionService: ConfiguracionService,
    private usuarioService: UsuarioService,
    protected modalService: NgbModal
  ) {
    this.hide = false;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.usuarioService.userRFC(new rfcData()).subscribe((resul) => {
      this.subscription_start_date =
        resul['body']['subscription_duration']['subscription_end_date'][0];
      this.subscription_end_date =
        resul['body']['subscription_duration']['subscription_start_date'][0];
      this.membership_razones_sociales =
        resul['body']['membership_status'].membership_razones_sociales;
      this.onSaveSuccess(resul['body']);
    });
  }

  protected onSaveSuccess(result: any): void {
    if (result['response'] != undefined) {
      this.listRFC = result['response'][0];
      this.dataSource = new MatTableDataSource(this.listRFC);
    } else {
      this.onSaveError();
    }
    Swal.close();
  }

  protected onSaveError(): void {}

  cargarArchivo() {
    Swal.showLoading();

    const formData = new FormData();
    formData.append('key_file', this.editForm.get(['key_file'])!.value);
    formData.append('cer_file', this.editForm.get(['cer_file'])!.value);
    formData.append('user_rfc', this.editForm.get(['user_rfc'])!.value);
    formData.append(
      'user_rfc_clave',
      this.editForm.get(['user_rfc_clave'])!.value
    );
    // formData.append('aKey',  environment.aKey);

    this.configuracionService.cargaArchivos(formData).subscribe((data) => {
      console.log(data);
      /**
       * CASO EN EL QUE LOS DATOS SON CORRECTOS
       */
      if (data['response'] != undefined) {
        if (data['response'][0]['sucess']) {
          
          this.alert = 'success';
          this.alert_text='Se realizo la carga correctamente.';
          Swal.close();
          this.getData();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al realizo la carga. ',
          });
        }
      }else{
        this.alert = 'danger';
        this.alert_text=data['message'][0]['message'];
          Swal.close();
      }
    });
  }

  handleClick(tipo: string) {
    document.getElementById(tipo).click();
  }

  addAttachment(fileInput: File, tipo: string) {
    if (tipo === 'key') {
      console.log('fileReaded  KEY: ', fileInput['target'].files[0]);

      if (fileInput['target'].files.length > 0) {
        const file = fileInput['target'].files[0];
        this.editForm.patchValue({
          key_file: file,
          key_file_name: file.name,
        });
      }
    }

    if (tipo === 'cer') {
      console.log('fileReaded  CER: ', fileInput['target'].files[0]);

      if (fileInput['target'].files.length > 0) {
        const file = fileInput['target'].files[0];
        this.editForm.patchValue({
          cer_file: file,
          cer_file_name: file.name,
        });
      }
    }
  }

  deleteRFC(user_rfc: string) {
    
    const modalRef = this.modalService.open(ConfiguracionDialogComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.user_rfc = user_rfc;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if(receivedEntry.delete){
        Swal.showLoading();
        this.configuracionService.deleteRFC(receivedEntry).subscribe(data => {
          this.getData();
          Swal.close();
          
        });


      }
      })
    modalRef.result
      .then(
        resul => {

          console.log('resul: ' ,resul);
          this.loadPage();
        },
        () => {
          this.loadPage2();
        }
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    console.log(user_rfc);
    // const reques = {
    //   'user_rfc': user_rfc
    // }
    // this.configuracionService.deleteRFC( reques ).subscribe(data => {
    //   console.log(data);
    // })
  }
  loadPage() {
    console.log('PREPARAR NGINT');
  }

  loadPage2() {
    console.log('PREPARAR NGINT2222');
  }
}

interface Resques {
  message: String;
  status: Boolean;
}
