import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CargaContaService } from 'src/app/services/pages/carga-conta.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargaContaDialogComponent } from './carga-conta-dialog/carga-conta-dialog.component';

export interface polizaData {
  file_id?: string;
  file_date?: string;
  user_file_location?: string;
  file_status?: string;
}



@Component({
  selector: 'app-carga-conta',
  templateUrl: './carga-conta.component.html',
  styleUrls: ['./carga-conta.component.css']
})

export class CargaContaComponent implements OnInit {
  editForm = this.fb.group({
    polizas_file: new FormControl(null, [Validators.required]),
    polizas_file_name: new FormControl(null, [Validators.required]),
  });



  listOriginal:any;
  listPolizas: polizaData[] = [];
  dataSource: MatTableDataSource<polizaData>;
  
  displayedColumns: string[] = [
    'file_id',
    'file_date',
    'user_file_location',
    'file_status',
  ];
  
  listaElementos:any[]=[];
  listOrigen:[]=[];
  arrayOrigen:[]=[];
  @Input() dataMessageResults: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  originalList: any;

  user_file_location: string;
  auxBandera = true;

  // catIndex : string[] = [
  //   'RFC' ,
  //   'Fecha de Timbrado', 
  //   'Forma de Pago', 
  //   'SubTotal', 
  //   'Moneda', 
  //   'Total',
  //   'Tipo de Comprobante',
  //   'Metodo de Pago',
  //   'RFC Emisor',
  //   'RFC Receptor',
  //   'Nombre Emisor',
  //   'Nombre Receptor',
  //   'Sello Sat'];

  constructor(
    private fb: FormBuilder,
    private cargaContaService: CargaContaService,
    protected modalService: NgbModal) {
      // this.catIndex;
  }

  ngOnInit(): void {
    this.getPolizas();
  }

  handleClick(tipo: string) {
    document.getElementById(tipo).click();
  }

  addAttachment(fileInput: File, tipo: string) {
    if (tipo === 'xml') {
      if (fileInput['target'].files.length > 0) {
        const file = fileInput['target'].files[0];
        this.editForm.patchValue({
          polizas_file: file,
          polizas_file_name: file.name,
        });
        this.cargarArchivo();
      }
      
    }
    
  }

  cargarArchivo() {
    Swal.showLoading();
    const formData = new FormData();
    formData.append('file', this.editForm.get(['polizas_file'])!.value);
    this.cargaContaService.cargaArchivos(formData).subscribe((data) => {
      console.log("retorno del archivo" , data['response'][0].user_file_location);
      this.readPolizas(data['response'][0].user_file_location);
    });
  }

  getPolizas(){
    const request ={
    };
    this.cargaContaService.getPolizas(request).subscribe((data) => {
      this.onSaveSuccess(data['body']);
      this.originalList = data['body'];
      console.log(this.originalList);
    });
  }

  getCatalogo(){
    this.cargaContaService.getCatalogo().subscribe((data) => {
      this.onSaveSuccess(data['body']);
      
    });
  }

  onClick(){
    this.user_file_location = '';
  }
  readPolizas(user_file_location:string){
    this.user_file_location = '';
    this.auxBandera = false;
    this.user_file_location = user_file_location;

    // const modalRef = this.modalService.open(CargaContaDialogComponent, {
    //   size: 'xl',
    //   backdrop: 'static',
    // });
    // modalRef.componentInstance.user_file_location = user_file_location;
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   if(receivedEntry.delete){
    //     console.log( 'OBJETO DE RETORNO', receivedEntry);      
    //   }
    //   });
    // modalRef.result
    //   .then(
    //     () => { }
    //   )
    //   .catch((error) => {
    //     // eslint-disable-next-line no-console
    //     console.log(error);
    //   });

    // const request ={
    //   'user_file_location' : user_file_location,
    // };

    // this.cargaContaService.readPolizas(request).subscribe((data) => {
    //   this.listOriginal = data['body'];
    //   const lista:any[] = [];
    //   this.listaElementos = [];
      
    //   lista.push(this.listOriginal);
    //   console.log( 'lista:' , lista);
    //   let headers = this.getCabeceras(lista);
    //   console.log('headers: ' , headers);
    //   this.iterarList(headers, lista);
    //   console.log(JSON.stringify(this.listaElementos));

      
    // });
  }






  protected onSaveSuccess(result: any): void {
    if (result['response'] != undefined) {
      this.listPolizas = result['response'][0];
      this.dataSource = new MatTableDataSource(this.listPolizas);
    } else {
      this.onSaveError();
    }
  }

  protected onSaveError(): void {}

  cancelar(){
    this.auxBandera = true;
  }


  

}
