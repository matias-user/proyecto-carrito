import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Producto } from './interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  productoCollection: AngularFirestoreCollection<Producto>;
  Productos: Observable<Producto[]>;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore ) { }

  login( email:string , pass: string ){
    this.auth.signInWithEmailAndPassword( email, pass );
  }
  registrar( email:string , pass: string ){
    this.auth.createUserWithEmailAndPassword( email, pass );
  }

  crearProducto( producto : Producto ){
    this.afs.collection('productos').add( producto );
  }
  traerProductos(){
    return this.productoCollection =  this.afs.collection<Producto>('productos');
  }
  eliminar(id: string){
    this.afs.collection('productos').doc(id).delete();
  }
}
