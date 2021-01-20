import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ConfiguracionComponent } from '../../pages/configuracion/configuracion.component';
import { IMembership } from '../../shared/model/membership';
import { PlanesDetailDialogComponent } from './planes-detail-dialog.component';

@Component({
  templateUrl: './planes-dialog.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesDialogComponent implements OnInit {
  membershipData: IMembership;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    protected modalService: NgbModal
  ) {
    console.log(this.membershipData);
  }

  ngOnInit(): void { }


  clear(): void {
    this.activeModal.dismiss();
  }

  delete(item: any) {
    const reques = {
      user_rfc: this.membershipData,
      membershipSelect : item
    };
    // this.passEntry.emit(reques);
    // this.activeModal.dismiss();

    const modalRef = this.modalService.open(PlanesDetailDialogComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.membershipData = 'OBJETO DE ENTRADA'
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


  }
}

// membership_price_1_month
// membership_price_12_month
// membership_price_24_month
// membership_price_36_month
