import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { EliminarComponent } from './eliminar/eliminar.component';

import { PanelPage } from './panel.page';

const routes: Routes = [
  {
    path: '',
    component: PanelPage,
    children:[
      { path:'crear', component:CrearComponent },
      { path:'editar', component:EditarComponent },
      { path:'eliminar', component:EliminarComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelPageRoutingModule {}
