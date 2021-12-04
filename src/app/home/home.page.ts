import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FireService } from '../fire.service';
import { Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  arrProductos: Producto[];

  constructor( private fireService: FireService) {}

  ngOnInit(): void {
    this.fireService.traerProductos().valueChanges().pipe(
      tap( productos => this.arrProductos = productos )
    ).subscribe()


  }
}
