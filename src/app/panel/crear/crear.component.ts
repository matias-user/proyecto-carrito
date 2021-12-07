import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/fire.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { map, pluck, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit, OnDestroy {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [Validators.required]],
    precio:[ '', [Validators.required]],
    stock:[ '', [Validators.required]],
    sku:[ '', [Validators.required]],
    descripcion:[ '', [Validators.required]],
    imagen:['',[Validators.required]]
  })
  editar:boolean = false;
  id: string = '';
  private file = '';
  private ref ;
  private fileRef : AngularFireStorageReference;

  downloadURL: string;

  constructor( private fb: FormBuilder,
                private fireService: FireService,
                private storage: AngularFireStorage,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }
  
  ngOnDestroy(): void {
    this.editar = false;
  }

  ngOnInit() {
    if( !this.router.url.includes('editar') ){
      return;
    }
    
    this.activatedRoute.params.pipe(
      pluck('id'),
      tap( id => this.id = id ),
      map( id => this.fireService.traerProductoId(id).valueChanges() ),
      switchMap( resp => resp ),
      tap<Producto>( result => {
        const { descripcion, nombre, precio, stock, sku } = result;
        this.miFormulario.get('nombre').setValue(nombre);
        this.miFormulario.get('precio').setValue(precio);
        this.miFormulario.get('stock').setValue(stock);
        this.miFormulario.get('sku').setValue(sku);
        this.miFormulario.get('descripcion').setValue(descripcion);
        
      })
    )
    .subscribe( result => this.editar = true ); 
  }

  async crearProducto(){
    if( !this.editar ){
      if( this.miFormulario.invalid ){
        return;
      }
       const task =  await this.ref.put( this.file );
      this.fileRef.getDownloadURL().pipe(
        tap( url =>  this.downloadURL = url ),
      ).subscribe( {
        complete: () => {
          this.fireService.crearProducto( {...this.miFormulario.value, }, this.downloadURL );
          this.miFormulario.reset();
        } 
      } );
    }else{
      if( !this.router.url.includes('editar') ){
        return;
      }

      this.fireService.traerProductoId(this.id).update( this.miFormulario.value );
      
    }
  }
  obtenerImagen( event ){
    this.file = event.target.files[0];
    const filePath = event.target.files[0].name;
    this.fileRef = this.storage.ref(filePath);
    this.ref = this.storage.ref(filePath);
  }
}
