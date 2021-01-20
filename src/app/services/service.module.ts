import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescargaSatService } from './service.index';
// import { UsuarioService } from './usuario.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    DescargaSatService,
    // UsuarioService
  ]
})
export class ServiceModule { }
