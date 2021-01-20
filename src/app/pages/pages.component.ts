import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { MatDrawer } from '@angular/material/sidenav';

declare function int_plugins() ;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(protected toolbarService: SharedService) {}

  ngOnInit(): void {
    int_plugins();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked(): void {
    this.toolbarService.setDrawer(this.drawer);
    //this.toolbarService.toggle();
  }

}
