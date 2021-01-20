import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CargaContaService } from '../../services/pages/carga-conta.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { element } from 'protractor';

export interface DataTable {
  origen?: any;
  valor?:any;
  destino?: any;
}

@Component({
  selector: 'app-carga-conta-detail',
  templateUrl: './carga-conta-detail.component.html',
  styleUrls: ['./carga-conta-detail.component.css']
})
export class CargaContaDetailComponent implements OnInit {
  dataSource: MatTableDataSource<DataTable>;
  displayedColumns: string[] = [
    'origen',
    'valor',
    'destino',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  formAddListMapper = this.fb.group({
    origen: new FormControl(null, [Validators.required]),
    destino: new FormControl(null, [Validators.required]),
  });


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

    catDestino = [
      {
        id: 1,
        descrip : 'RFC'
      },
      {
        id: 2,
        descrip : 'Fecha de Timbrado'
      },
      {
        id: 3,
        descrip : 'Forma de Pago'
      },
      {
        id: 4,
        descrip : 'SubTotal'
      },
      {
        id: 5,
        descrip : 'Moneda'
      },
      {
        id: 6,
        descrip : 'Total'
      },
      {
        id: 6,
        descrip : 'Tipo de Comprobante'
      },
      {
        id: 7,
        descrip : 'Metodo de Pago'
      }
    ]

  listaElementosOrigen:any[]=[];
  passEntry: any;
  listOriginal:any;
  lstJoisElem: any[] = [];

  @Input() user_file_location;

  constructor( private fb: FormBuilder, private cargaContaService: CargaContaService, ) { }

  ngOnInit(): void {
    if( this.user_file_location ){
      this.getData();
    }
  }

  addTable(){
    console.log("Agrenado a una lista");
    console.log(this.formAddListMapper.value);
    this.lstJoisElem.push(this.formAddListMapper.value);
    console.log('LISTA JOIN: ' , this.lstJoisElem);
    this.dataSource = new MatTableDataSource(this.lstJoisElem);
    console.log(JSON.stringify( this.lstJoisElem));
  
    // let obj = {
    //   key_origen: this.formAddListMapper.get(['origen'])
    // }
    // console.log(obj);
  }

  getData(){

       const request ={
      'user_file_location' : this.user_file_location,
    };

    this.cargaContaService.readPolizas(request).subscribe((data) => {
      this.listOriginal = data['body'];
      const lista:any[] = [];
      this.listaElementosOrigen = [];
      
      lista.push(this.listOriginal);
      console.log( 'lista:' , lista);
      let headers = this.getCabeceras(lista);
      console.log('headers: ' , headers);
      this.iterarList(headers, lista);
       

      
    });
  }

    /**
   * Busca las cabezaras 
   * @param lista 
   */
  private getCabeceras(lista:any[])  {
    let headers: string[] = [];
    lista.forEach(element => {
      Object.keys(element).forEach(key => {
        if(!headers.find((header) => header == key)){
          headers.push(key);
        }  
      }); 
    });
    return headers;
  }

  /**
   * Itera la lista con las cabeceras encontradas...
   * @param lstCabezeras 
   * @param lstToIterar 
   */
  private iterarList(lstCabezeras: string[], lstToIterar:any[]) {

    lstCabezeras.forEach(cabbezera => {
      lstToIterar[0][cabbezera].forEach(nodo => {
        if(nodo.elemento != undefined){

          
          if( this.listaElementosOrigen.length === 0 ){
            this.listaElementosOrigen.push(nodo);
          } else{
            
            // console.log('--------- elem: -------- ', nodo);

            let findElement =  this.listaElementosOrigen.filter(x => x.elemento ===  nodo.elemento)[0];
            console.log( findElement );
            if( findElement === undefined ){
              this.listaElementosOrigen.push(nodo);
            }else{

              let index = this.listaElementosOrigen.indexOf(findElement);

              // console.log('INDEX: ' ,index);

              console.log(findElement.valor.sort );
              if( findElement.valor.sort === undefined ){
                let lstValue:any[] = [];                
                lstValue.push(findElement.valor, nodo.valor);
                nodo.valor = lstValue;
                this.listaElementosOrigen[index] = nodo;

              }else{
                findElement.valor.push(nodo.valor);
              }
            }

          }

        }
        else{
          let lst:any[]= [];
          lst.push(nodo);
          // console.log('LISTA PENDIENTE DE BUSCAR: ' , lst );
          let cabeceras = this.getCabeceras(lst);
          this.iterarList(cabeceras, lst);
        }
      });
      // console.log( JSON.stringify(this.listaElementosOrigen));  
      
    });

  }

}
