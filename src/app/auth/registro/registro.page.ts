import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/fire.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    correo: [ '', [Validators.required, Validators.email] ],
    contra: [ '', [Validators.required, Validators.minLength(6)] ]
  })

  constructor(private fb: FormBuilder,
              public toastController: ToastController,
              private fireService: FireService
    ) { }

  ngOnInit() {
  }

  async registrar ( ){
    if( this.miFormulario.invalid ){
      const toast = await this.toastController.create({
        message:'Debes ingresar un correo o contraseña validos',
        duration:2000,
        color:'danger'
      });
      toast.present();
    }
    const { correo, contra } = this.miFormulario.value;
    this.fireService.registrar( correo, contra );
    this.miFormulario.reset();
    
  }
}
