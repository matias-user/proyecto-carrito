import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  constructor( private fs: FireService,
              private router: Router) { }

  ngOnInit() {
  }
  salirSesion(){

    this.fs.salir();
    this.router.navigateByUrl('/login');
  }

}
