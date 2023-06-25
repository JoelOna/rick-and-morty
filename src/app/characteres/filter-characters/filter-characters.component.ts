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
 
 ngOnInit(): void {//Obtener todas las especies para mostrarlas en el filtro y hacer que no se repitan las especies
    let i = 1
    let pages = true
 
    let species: any[] = [] 
    let speciesName: any[] = [] 
      do {
        this.charactersService.getCharactersPage(i).subscribe(
          resp => {
            species.push(resp.body.results)
            for (let index = 0; index < species.length; index++) {
              // speciesName[index] = species[index].species
              
            }
          }
        )
        i++
      } while (i<42);

      console.log(species)
    
  }
 names: string[] = []

 @Output() newItemEvent = new EventEmitter<any>();
 charactersFiltered : ICharacter [] = []
  
  onFilterHandeler(){
    let checkboxesName = this.elementRef.nativeElement.querySelectorAll('input[name="name"]')
    let checkboxesStatus = this.elementRef.nativeElement.querySelectorAll('input[name="status"]')
    let checkboxesSpecies = this.elementRef.nativeElement.querySelectorAll('input[name="status"]')


    let nameSelected = ''
    let statusSelected = ''
    let speciesSelected = ''
    
    for (var i = 0; i < checkboxesName.length; i++) {
      if (checkboxesName[i].checked) {
        nameSelected = checkboxesName[i].value;
      }
    }
    
    for (var i = 0; i < checkboxesStatus.length; i++) {
      if (checkboxesStatus[i].checked) {
        statusSelected = checkboxesStatus[i].value;
      }
    }
    

    this.charactersService.getCharactersFilter(nameSelected,statusSelected,'','','').subscribe(
      resp =>{
        this.charactersFiltered = resp.body.results
        this.newItemEvent.emit(this.charactersFiltered)//sends the array filtered by the checkboxs
      }
    )
  }

  removeSelection() {
    const inputs = this.elementRef.nativeElement.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
       inputs[i].checked = false
      }
    }
    this.charactersService.getCharacters().subscribe(
      response => {
        this.charactersFiltered = response.body.results
        this.newItemEvent.emit(this.charactersFiltered)//sends the array filtered by the checkboxs
        console.log(response.body.results);
        
      }
    )
    console.log(inputs);
    
  }
  
}
