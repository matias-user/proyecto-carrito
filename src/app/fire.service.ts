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

  login( email:string , pass: string ){
    this.auth.signInWithEmailAndPassword( email, pass );
  }
  registrar( email:string , pass: string ){
    this.auth.createUserWithEmailAndPassword( email, pass );
  }
  async crearProducto( producto : Producto, imagen:string ){
    const productoFinal = { ...producto, imagen };
    await this.afs.collection('productos').add( productoFinal );
  }
  traerProductos(){
    return this.afs.collection<Producto>('productos');
  }
  eliminar(id: string){
    this.afs.collection('productos').doc(id).delete();
  }
}
