import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ConfiguracionComponent } from '../../pages/configuracion/configuracion.component';
import { IMembership } from '../../shared/model/membership';

@Component({
  templateUrl: './planes-detail-dialog.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesDetailDialogComponent implements OnInit {
  membershipData: IMembership;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
    console.log(this.membershipData);
  }

  ngOnInit(): void { }


  clear(): void {
    this.activeModal.dismiss();
  }

  detail(item: any) {
    console.log('DETAIL DIALOG');
    const reques = {
      user_rfc: this.membershipData,
      membershipSelect : item
    };
    this.passEntry.emit(reques);
    this.activeModal.dismiss();
  }
}

// membership_price_1_month
// membership_price_12_month
// membership_price_24_month
// membership_price_36_month
