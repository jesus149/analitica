import { Component, OnInit} from '@angular/core';
import { ConfiguracionService } from 'src/app/services/pages/configuracion.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;

  constructor( private settingsService: SettingsService ) {
    this.user = this.settingsService.getLocalUser();
  }
  ngOnInit(): void {
  }
}
