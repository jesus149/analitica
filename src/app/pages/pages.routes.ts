import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { DescargaSatComponent } from './descarga-sat/descarga-sat.component';
import { CargaContaComponent } from './carga-conta/carga-conta.component';
import { ComparacionComponent } from './comparacion/comparacion.component';
import { ListaNegraComponent } from './lista-negra/lista-negra.component';
import { AnalisisContableComponent } from './analisis-contable/analisis-contable.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AcoutSettingsComponent } from './acout-settings/acout-settings.component';
import { PlanesComponent } from './planes/planes.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { AuthGuard } from '../guards/auth.guard';
import { CargaContaDialogComponent } from './carga-conta/carga-conta-dialog/carga-conta-dialog.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'membresias', component:MembresiasComponent, canActivate: [AuthGuard]  },
            { path: 'descargaSat', component: DescargaSatComponent , canActivate: [AuthGuard]  },
            { path: 'cargaConta', component: CargaContaComponent , canActivate: [AuthGuard]  },
            { path: 'cargaContaDeatil', component: CargaContaDialogComponent , canActivate: [AuthGuard]  },
            { path: 'comparacion', component: ComparacionComponent , canActivate: [AuthGuard]  },
            { path: 'listaNegra', component: ListaNegraComponent , canActivate: [AuthGuard]  },
            { path: 'analisisContable', component: AnalisisContableComponent , canActivate: [AuthGuard]  },
            { path: 'accountSettings', component: AcoutSettingsComponent , canActivate: [AuthGuard]  },
            { path: 'planes', component: PlanesComponent, canActivate: [AuthGuard]  },
            { path: 'confg', component: ConfiguracionComponent , canActivate: [AuthGuard]  },
            { path: '', redirectTo: '/login', pathMatch: 'full' },
        ],
      },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
