import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanesDialogComponent } from './planes-dialog.component';
import { MembershipService } from '../../services/pages/membership.service';
import { IMembership } from '../../shared/model/membership';
import Swal from 'sweetalert2';
import { allowedNodeEnvironmentFlags } from 'process';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  listMembresias: any;
  tipo={
    BASICA: 2, 
    INDIVIDUAL: 3,
    NEGOCIOS: 4,
    CONTADOR: 5,
    DESPACHO_CONTABLE: 6,
    CORPORATIVOS: 7
  }
  
  membership: IMembership;

  constructor(protected modalService: NgbModal, protected membershipService: MembershipService) { }

  ngOnInit(): void {
    const request ={
      value: 'all'
    }
    this.membershipService.getAllMembership(request).subscribe( data =>{
      this.listMembresias = data['body']['membershipData'][0];
      console.log( 'RESULTADO DE LA CONSULTA DEL SERVICIO: ', this.listMembresias);
      console.log( 'RESULTADO DE LA CONSULTA DEL SERVICIO: ', JSON.stringify(this.listMembresias));
      
    })

  }

  elegirPlan(tipo: number){
    console.log(tipo);
    const request ={
      value: tipo
    }

    Swal.showLoading();

    this.membershipService.getXMembership(request).subscribe( data =>{
      console.log( 'RESULTADO DE LA CONSULTA DEL SERVICIO: ', JSON.stringify(data['body']['membershipData'][0]));
      const modalRef = this.modalService.open(PlanesDialogComponent, {
        size: 'lg',
        backdrop: 'static',
      });
      modalRef.componentInstance.membershipData = data['body']['membershipData'][0];
      modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        if(receivedEntry.delete){
          console.log( 'OBJETO DE RETORNO', receivedEntry);      
        }
        })
      modalRef.result
        .then(
          () => { }
        )
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
        Swal.close();
    })




  }

}
