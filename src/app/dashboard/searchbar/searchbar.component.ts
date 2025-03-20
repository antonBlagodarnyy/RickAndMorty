import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
@Output() searchedTerm = new EventEmitter<string>();


  sendTerm(value: string){
    this.searchedTerm.emit(value);
  }
  getTerm(event: Event){
    const inputValue= (event.target as HTMLInputElement).value;

    this.sendTerm(inputValue)
  }
}
