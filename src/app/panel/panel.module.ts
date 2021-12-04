import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelPageRoutingModule } from './panel-routing.module';

import { PanelPage } from './panel.page';
import { CrearComponent } from './crear/crear.component';
import { EliminarComponent } from './eliminar/eliminar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PanelPage,
    CrearComponent,
    EliminarComponent
  ]
})
export class PanelPageModule {}
