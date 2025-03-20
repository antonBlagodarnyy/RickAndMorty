import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
@Output() searchedTerm = new EventEmitter<RegExp>();


  sendTerm(value: RegExp){
    this.searchedTerm.emit(value);
  }
  createRegAndSend(event: Event){
    const inputValue= (event.target as HTMLInputElement).value;
    const regex = new RegExp(inputValue, 'i');
    this.sendTerm(regex)
  }
}
