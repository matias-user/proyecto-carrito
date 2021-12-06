import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
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
  cantidad:number = 1;
  talla:number = 39;

  constructor( private fireService: FireService,
          public popoverController: PopoverController,
          public toastController: ToastController) {}

  ngOnInit(): void {
    this.fireService.traerProductos().valueChanges().pipe(
      tap( productos => this.arrProductos = productos ),
    ).subscribe()
    
  }
  
  agregarCarrito( producto: Producto ){
    this.carritoCompra = JSON.parse( localStorage.getItem('productos') ) || [];
    producto['cantidad'] = this.cantidad;
    producto['talla'] = this.talla; 
    this.carritoCompra.push( producto );
    localStorage.setItem('productos', JSON.stringify(this.carritoCompra) );
    
    this.presentToast();
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Has agregado el producto al carrito de compra',
      duration: 1500,
      color: 'success'
    });
    toast.present();
  }
}
