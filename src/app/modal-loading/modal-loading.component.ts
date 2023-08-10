import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.css']
})
export class ModalLoadingComponent {
@Input() loading:boolean = false;
}
