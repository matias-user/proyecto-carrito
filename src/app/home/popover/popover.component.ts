import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/fire.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor( private fs :FireService ) { }

  ngOnInit() {
      
  }
  salir(){
    this.fs.popover.dismiss();
    
  }

}
