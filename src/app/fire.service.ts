import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from './interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  popover = null;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore ) { }

  async login( email:string , pass: string ){
    await this.auth.signInWithEmailAndPassword( email, pass );
  }
  registrar( email:string , pass: string ){
    this.auth.createUserWithEmailAndPassword( email, pass );
  }
  salir(){
    this.auth.signOut();
  }
  async crearProducto( producto : Producto, imagen:string ){
    const productoFinal = { ...producto, imagen };
    await this.afs.collection('productos').add( productoFinal );
  }
  traerProductos(){
    return this.afs.collection<Producto>('productos');
  }
  traerProductoId( id: string ){
    return this.afs.collection('productos').doc(id) ; 
  }
  eliminar( id: string ){
    this.afs.collection('productos').doc(id).delete();
  }
  
}
