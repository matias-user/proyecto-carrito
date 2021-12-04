import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/fire.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
})
export class EliminarComponent implements OnInit {

  constructor( private fireService: FireService) { }
  arrProductos:Producto[] = [];

  ngOnInit() {
    this.fireService.traerProductos().snapshotChanges().pipe(
      
      tap( resp => {
        resp.forEach( producto =>  {
          const data = producto.payload.doc.data();
          const id = producto.payload.doc.id;
          this.arrProductos.push( { ...data, id } )
        })
      })
    ).subscribe()
  }
  
  borrar(id:string ){
    console.log(id);
    this.fireService.eliminar( id );
    
    
  }
}
