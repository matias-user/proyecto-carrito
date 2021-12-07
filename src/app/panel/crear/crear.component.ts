import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/fire.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { map, pluck, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ToastController } from '@ionic/angular';

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
  file = '';
  ref ;
  fileRef : AngularFireStorageReference;
  downloadURL: string;

  constructor( private fb: FormBuilder,
                private fireService: FireService,
                private storage: AngularFireStorage,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                public toastController: ToastController) { }
  
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
      switchMap( resp => resp ),//Se subscribe al observable de traerProductos.
      tap<Producto>( result => {
        const { descripcion, nombre, precio, stock, sku, imagen } = result;
        this.miFormulario.get('nombre').setValue(nombre);
        this.miFormulario.get('precio').setValue(precio);
        this.miFormulario.get('stock').setValue(stock);
        this.miFormulario.get('sku').setValue(sku);
        this.miFormulario.get('descripcion').setValue(descripcion);
        this.miFormulario.get('imagen').setValue(imagen);
        
      })
    )
    .subscribe( result => this.editar = true ); 
  }

  async crearProducto(){
    const toast = await this.toastController;
    

    if( !this.editar ){
      if( this.miFormulario.invalid ){
        const toastErr = toast.create({ message: 'Debe ingresar todos los campos', duration:1500, color:'danger' } );
         (await toastErr).present();
        return;
      }
       const task =  await this.ref.put( this.file );//Aqui se ejecuta el subir la imagen.
      this.fileRef.getDownloadURL().pipe(
        tap( url =>  this.downloadURL = url ),
      ).subscribe( {
        complete: () => {
          this.fireService.crearProducto( {...this.miFormulario.value, }, this.downloadURL );
          this.miFormulario.reset();
        } 
      } );
      const toastOk = toast.create({ message: 'Producto guardado', duration:1200, color:'success' } );
      (await toastOk).present();
    }else{
      if( !this.router.url.includes('editar') ){
        return;
      }
      
      this.fireService.traerProductoId(this.id).update( this.miFormulario.value );
      const toastOk = toast.create({ message: 'Producto editado', duration:1200, color:'success' } );
      (await toastOk).present();
      this.miFormulario.reset();
    }
  }
  obtenerImagen( event ){
    this.file = event.target.files[0];
    const filePath = event.target.files[0].name;
    this.fileRef = this.storage.ref(filePath);
    this.ref = this.storage.ref(filePath);
  }
}
