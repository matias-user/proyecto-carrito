import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { FireService } from '../fire.service';
import { Producto } from '../interfaces/producto.interface';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  carritoCompra: Producto[] = [];
  arrProductos: Producto[];

  constructor( private fireService: FireService,
          public popoverController: PopoverController) {}

  ngOnInit(): void {
    this.fireService.traerProductos().valueChanges().pipe(
      tap( productos => this.arrProductos = productos )
    ).subscribe()
    
  }
  
  agregarCarrito( producto: Producto ){
    this.carritoCompra = JSON.parse( localStorage.getItem('productos') ) || [];
    this.carritoCompra.push( producto );
    localStorage.setItem('productos', JSON.stringify(this.carritoCompra) );
  }


  async mostrarCarrito(ev: any){
    const popoverCurrient = await this.popoverController.create({
      component: PopoverComponent,
      translucent: true,
      event:ev
      
    });
    await popoverCurrient.present();
    new Promise( res => {
      
      res( this.fireService.popover = popoverCurrient )
    } )
    
  }

}
