import { Component, ElementRef, OnInit } from '@angular/core';
import { CharacteresDataService } from 'src/app/services/characteres-data.service';
import { ICharacter } from '../../interfaces/icharacter';
import { Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-filter-characters',
  templateUrl: './filter-characters.component.html',
  styleUrls: ['./filter-characters.component.scss']
})
export class FilterCharactersComponent{
 
 constructor(private charactersService : CharacteresDataService, private elementRef :ElementRef,private snackBar: MatSnackBar){}
 

 names: string[] = []


 @Output() newItemEvent = new EventEmitter<any>();
 charactersFiltered : ICharacter [] = []
  
  onFilterHandeler(){
    let checkboxesName = this.elementRef.nativeElement.querySelectorAll('input[name="name"]')
    let checkboxesStatus = this.elementRef.nativeElement.querySelectorAll('input[name="status"]')
    let checkboxesSpecies = this.elementRef.nativeElement.querySelectorAll('input[name="species"]')
    let checkboxesGender = this.elementRef.nativeElement.querySelectorAll('input[name="gender"]')


    let nameSelected = ''
    let statusSelected = ''
    let speciesSelected = ''
    let genderSelected = ''
    
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

    for (var i = 0; i < checkboxesSpecies.length; i++) {
      if (checkboxesSpecies[i].checked) {
        speciesSelected = checkboxesSpecies[i].value;
      }
    }

    for (var i = 0; i < checkboxesGender.length; i++) {
      if (checkboxesGender[i].checked) {
        genderSelected = checkboxesGender[i].value;
      }
    }
    

    this.charactersService.getCharactersFilter(nameSelected,statusSelected,speciesSelected,genderSelected).subscribe(
      resp =>{
        this.charactersFiltered = resp.body.results
        this.newItemEvent.emit(this.charactersFiltered)//sends the array filtered by the checkboxs
      },error =>{
        this.openSnackBar('Not found')
      }
      
    )
  }
  openSnackBar(message:string) {
    this.snackBar.open(message,'Ok',{
      duration: 4000,
    })
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
