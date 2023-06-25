import { Component, OnInit } from '@angular/core';
import { CharacteresDataService } from '../services/characteres-data.service';
import { ICharacter } from '../interfaces/icharacter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private charactreService: CharacteresDataService){}
  characteres : ICharacter [] = []

  ngOnInit(): void {
    this.charactreService.getCharacters().subscribe(
      response =>{ 
        if (response.body != null) {
          this.characteres = response.body.results
          this.characteres = this.characteres.slice(0,5)
          
        }
      }
    )
  }
  
}
