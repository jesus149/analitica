import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carga-conta-dialog',
  templateUrl: './carga-conta-dialog.component.html',
  styleUrls: ['./carga-conta-dialog.component.css']
})
export class CargaContaDialogComponent implements OnInit {
  
  user_file_location: string

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  
  clear(): void {
    this.activeModal.dismiss();
  }

}
