import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DescargaSatComponent } from './descarga-sat/descarga-sat.component';
import { CargaContaComponent } from './carga-conta/carga-conta.component';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { ListaNegraComponent } from './lista-negra/lista-negra.component';
import { AnalisisContableComponent } from './analisis-contable/analisis-contable.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { AcoutSettingsComponent } from './acout-settings/acout-settings.component';
import { PlanesComponent } from './planes/planes.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { MembresiasPipe } from '../membresias.pipe';
import { ConfiguracionDialogComponent } from './configuracion/configuracion-dialog.component';
import { PlanesDialogComponent } from './planes/planes-dialog.component';
import { PlanesDetailDialogComponent } from './planes/planes-detail-dialog.component';
import { CargaContaDialogComponent } from './carga-conta/carga-conta-dialog/carga-conta-dialog.component';
import { CargaContaDetailComponent } from './carga-conta/carga-conta-detail.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    DescargaSatComponent,
    CargaContaComponent,
    ComparacionComponent,
    ListaNegraComponent,
    AnalisisContableComponent,
    ConfiguracionComponent,
    PlanesComponent,
    AcoutSettingsComponent,
    MembresiasComponent,
    MembresiasPipe,
    ConfiguracionDialogComponent,
    PlanesDialogComponent,
    PlanesDetailDialogComponent,
    CargaContaDialogComponent,
    CargaContaDetailComponent
  ],
  entryComponents: [
    ConfiguracionDialogComponent,
    PlanesDialogComponent,
    PlanesDetailDialogComponent,
    CargaContaDialogComponent
  ],
  exports: [
    DashboardComponent,
    DescargaSatComponent,
    CargaContaComponent,
    ComparacionComponent,
    ListaNegraComponent,
    AnalisisContableComponent,
    ConfiguracionComponent,
    SharedModule,
  ],
  imports: [PAGES_ROUTES, SharedModule],
})
export class PagesModule {}
