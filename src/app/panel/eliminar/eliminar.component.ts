import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/fire.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { tap } from 'rxjs/operators';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {

  constructor( private fireService: FireService,
              private actionSheetController: ActionSheetController) { }
  
              arrProductos:Producto[] = [];

  ngOnInit() {
    this.traerProductos();
  }
  
  borrar(id:string ){
    this.arrProductos = [];
    this.fireService.eliminar( id );
  }
  traerProductos(){
    this.fireService.traerProductos().snapshotChanges().pipe(
      
      tap( resp => {
        this.arrProductos = [];
        resp.forEach( producto =>  {
          const data = producto.payload.doc.data();
          const id = producto.payload.doc.id;
          this.arrProductos.push( { ...data, id } )
        })
      }),
    ).subscribe()
  }
  async mostrarAcciones(id:string ){
    const actionSheet = await this.actionSheetController.create({
      header:'Opciones',
      buttons:[{
        text:'Eliminar',
        role:'destructive',
        icon: 'trash',
        handler: () => this.borrar(id)
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }
    ]
    })
    await actionSheet.present();
  }
}
