import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/fire.service';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor( private fs :FireService ) { }

  arrProductos: Producto[] = [];
  valor:number = 0;

  ngOnInit() {
      this.traerLocalStorage();

      if( !this.arrProductos ) return;
      this.valorTotal();
  }
  salir(){
    this.fs.popover.dismiss();
    
  }
  traerLocalStorage(){
    this.arrProductos =  JSON.parse( localStorage.getItem('productos') );
  }
  quitar( indice: number ){//Esta es de los items
    this.arrProductos.splice( indice, 1 ); 
    localStorage.setItem( 'productos', JSON.stringify( this.arrProductos ) );
    this.valorTotal();
  }

  valorTotal(){
    this.valor = 0;
    this.arrProductos.forEach( producto => {
      this.valor += producto.precio
    })    
    
  }
}
