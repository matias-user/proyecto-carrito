import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EliminarComponent } from './eliminar/eliminar.component';

import { PanelPage } from './panel.page';

const routes: Routes = [
  {
    path: '',
    component: PanelPage,
    children:[
      { path:'crear', component:CrearComponent },
      { path:'eliminar', component:EliminarComponent },
      { path:'editar/:id', component:CrearComponent },
      { path: '**', redirectTo:'crear' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelPageRoutingModule {}
