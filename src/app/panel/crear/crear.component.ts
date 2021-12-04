import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/fire.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [Validators.required]],
    precio:[ '', [Validators.required]],
    stock:[ '', [Validators.required]],
    sku:[ '', [Validators.required]],
    descripcion:[ '', [Validators.required]]
  })

  constructor( private fb: FormBuilder,
                private fireService: FireService) { }

  ngOnInit() {}

  crearProducto(){
    this.fireService.crearProducto( this.miFormulario.value );
  }
}
