import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from 'src/app/interfaces/icharacter';
import { CharacteresDataService } from 'src/app/services/characteres-data.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
  constructor(private characterService: CharacteresDataService ,private route: ActivatedRoute){}
  character : ICharacter = {
    id: '',
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: ''
    },
    location: {
      name: '',
      url: ''
    },
    image: '',
    episode: [],
    url: '',
    created: ''
  }

  ngOnInit(): void {
   const characterId = this.route.snapshot.paramMap.get('id')
   
    this.characterService.getCharacter(characterId).subscribe(
      response =>{
        this.character = response.body
        console.log(this.character);
        
      }
    )
  }

}
