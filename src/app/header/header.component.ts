import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDiv: boolean = false;

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue.toLowerCase());
  }

  showCart: boolean = false;

  @Output()
  toggled: EventEmitter<any> = new EventEmitter<any>();
  cartClicked(){
    this.showCart != this.showCart;
    this.toggled.emit(this.showCart);
  }
}