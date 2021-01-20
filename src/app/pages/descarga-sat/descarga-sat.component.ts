import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DescargaSatService } from 'src/app/services/service.index';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { rfcData } from 'src/app/shared/model/rfc-data';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { SettingsService } from '../../services/settings.service';
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';

export interface UserData {
  registro: string;
  rfc: string;
  range: string;
  document: string;
  descarga: string;
  detalle: string;
}


@Component({
  selector: 'app-descarga-sat',
  templateUrl: './descarga-sat.component.html',
  styleUrls: ['./descarga-sat.component.css'],
})
export class DescargaSatComponent implements OnInit {
  alert:string;
  alert_text: string;
  maxDate = new Date();
  solicitud: FormGroup;
  listRFC: rfcData[] = [];
  listCfdi: any[] = [];
  listSolicitudes: any;
  alerta: string = 'alert-danger';
  loading: boolean = false;
  aux: boolean = true;
  index: number;


  displayedColumns: string[] = [
    'registro',
    'rfc',
    'range',
    'document',
    'descarga',
    'status',
    'accion',
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private descargaSatService: DescargaSatService,
    private fb: FormBuilder,
    private settingsService: SettingsService,
    protected http: HttpClient,
    private _FileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.solicitud = this.fb.group({
      rfc: [null, [Validators.required]],
      tipo_cfdi: [null, [Validators.required]],
      startdate: [null, [Validators.required]],
      enddate: [null, [Validators.required]],
    });

    this.descargaSatService.listRFC(new rfcData()).subscribe((resul) => {
      this.onSaveSuccess(resul['body']);
    });

    this.listCfdi = this.descargaSatService.getCatDfdi();
  }

  protected onSaveSuccess(result: any): void {
    if (result['response'] != undefined) {
      this.listRFC = result['response'][0];
    } else {
      this.onSaveError();
    }
  }

  protected onSaveError(): void {}

  public searchRfcs(item: any) {
    const request = {
      rfc: item.user_rfc,
    };

    this.descargaSatService.getlstDescarga(request).subscribe((data) => {
      this.listSolicitudes = data['body']['solicitudes'][0];
      console.log("Solicitudes:",this.listSolicitudes);
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.listSolicitudes);
    });
  }

  public onSolicitar() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    const request = {
      rfc: this.solicitud.value['rfc'],
      cfdi_solicitud_tipo: this.solicitud.value['tipo_cfdi'],
      startdate: formatDate(
        this.solicitud.value['startdate'],
        'yyyy-M-dd',
        'en_US'
      ),
      enddate: formatDate(
        this.solicitud.value['enddate'],
        'yyyy-M-dd',
        'en_US'
      ),
      cfdi_solicitud_pdf:'no',
    };

    this.descargaSatService.solicitarDescarga(request).subscribe((data) => {
      console.log(data['body']);
      if (data['body']['query'][0]['sucess']) {
       this.alert = 'success';
       this.alert_text = 'Solicitud Aprobada.';
       Swal.close();
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Solicitud Rechazada',
        });
      }
    });
  }

  public onVerificar(data: any) {
    this.loading = true;
    setTimeout(() => (this.loading = false), 3000);

    const request = {
      cfdi_solicitud_id: data.cfdi_solicitud_id,
      cfdi_solicitud_sat_id: data.cfdi_solicitud_sat_id,
    };

    this.descargaSatService.verificarDescarga(request).subscribe((data) => {
      console.log(data['body']);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClick(i, row) {
    this.loading = true; 
    this.index = i;
    
    console.log(JSON.stringify(row.api_url_verifica_solicitud) )

    const request = {
      cfdi_solicitud_id: row.cfdi_solicitud_id,
      cfdi_solicitud_sat_id: row.cfdi_solicitud_sat_id
    };

    // for (let contador = 0; contador <= 1; contador++) {
      this.descargaSatService.verificarDescarga(request).subscribe((data) => {
        console.log('es la primera peticion... ');
        console.log(data['body']);

        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...',
          });
          Swal.showLoading();

        this.loading = false
        console.log( 'LA RUTA DEL ARCHIVO...', data['body']['zip_download']);
        if( data['body']['zip_download'] && data['body']['zip_download'] !== 'No disponible'){

            this.getArchivo(data['body']['zip_download'])
        }else{
          this.onClick(i, row);
        }
      });
      this.loading = true
      
    // }
  }




  getArchivo( url: string ): void {
    Swal.showLoading();
    if(url && url !== 'No disponible'){
      this.http.get(`http://${url}`, {responseType: 'blob'})
      .subscribe(res => {
        this._FileSaverService.save(res, 'download');
        Swal.close();
      });
    }
    
  }

  validarEstatus( i ): boolean{
    console.log(i);

    if( i === this.index && this.loading){
      this.aux = false
    }else if( this.index === undefined  ){
      this.aux = true;
    }
   

    return this.aux

  }
}
