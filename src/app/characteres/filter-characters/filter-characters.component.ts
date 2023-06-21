import { Component, ElementRef, OnInit } from '@angular/core';
import { CharacteresDataService } from 'src/app/services/characteres-data.service';
import { ICharacter } from '../../interfaces/icharacter';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-characters',
  templateUrl: './filter-characters.component.html',
  styleUrls: ['./filter-characters.component.scss']
})
export class FilterCharactersComponent implements OnInit{
 
 constructor(private charactersService : CharacteresDataService, private elementRef :ElementRef,){}
  ngOnInit(): void {
   if (this.elementRef.nativeElement.querySelector('#rick')) {
    console.log(this.elementRef.nativeElement.querySelector('#rick').checked)
   }
  }
 names: string[] = []

 @Output() newItemEvent = new EventEmitter<any>();
 charactersFiltered : ICharacter [] = []
  
  onFilterHandeler(){
    console.log(this.elementRef.nativeElement.querySelector('#rick').checked)
    this.charactersService.getCharactersFilter( this.elementRef.nativeElement.querySelector('#rick').value,'','','','').subscribe(
      resp =>{
        this.charactersFiltered = resp.body.results
        this.newItemEvent.emit(this.charactersFiltered)
      }
    )
  }
}
