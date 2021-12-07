import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    correo: [ 'test1@test.cl', [Validators.required, Validators.email] ],
    contra: [ '123456', [Validators.required, Validators.minLength(6)] ]
  })

  constructor( private fb: FormBuilder,
              private router: Router,
              public toastController: ToastController,
              private fireService: FireService ) { }

  ngOnInit() {
  }

  async ingresar(){
    if( this.miFormulario.invalid ){
      const toast = await this.toastController.create({
        message:'El usuario o la contraseña no son validos',
        duration:2000,
        color:'danger'
      });
      toast.present();
  }
    
    const { correo, contra } = this.miFormulario.value;
    await this.fireService.login( correo, contra );
    console.log('paso');
    this.router.navigateByUrl('/panel/crear');
    this.miFormulario.reset();
  }
  irRegistro(){
    
    this.router.navigateByUrl('registro');
  }
}

