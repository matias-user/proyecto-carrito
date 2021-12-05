import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/fire.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { tap } from 'rxjs/operators';

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
    descripcion:[ '', [Validators.required]],

  })

  private file = '';
  private ref ;
  private fileRef : AngularFireStorageReference;

  downloadURL: string;

  constructor( private fb: FormBuilder,
                private fireService: FireService,
                private storage: AngularFireStorage) { }

  ngOnInit() {}

  async crearProducto(){
    if( this.miFormulario.invalid ){
      return;
    }
     const task =  await this.ref.put( this.file );
    this.fileRef.getDownloadURL().pipe(
      tap( url =>  this.downloadURL = url ),
    ).subscribe( {
      complete: () => this.fireService.crearProducto( {...this.miFormulario.value, }, this.downloadURL )
    } );
    
  }
  obtenerImagen( event ){
    this.file = event.target.files[0];
    const filePath = event.target.files[0].name;
    this.fileRef = this.storage.ref(filePath);
    this.ref = this.storage.ref(filePath);
    
  }
}
