import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PAGES_ROUTES } from '../pages/pages.routes';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { ReplacePipe } from '../replace.pipe';
import { FileSaverModule } from 'ngx-filesaver';



@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        DialogComponent,
        ReplacePipe
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        MaterialModule,
        MatTabsModule,
        MatRadioModule,
        ReplacePipe    ], 
    imports: [
        PAGES_ROUTES,
        MaterialModule,
        MatTabsModule,
        MatRadioModule,
        RouterModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        FileSaverModule

    ]
})
export class SharedModule {
}
