import { Component, Input } from '@angular/core';
import { UserApp } from '../models/userApp';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isMenuOpen= false;

  @Input() user!:UserApp;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
