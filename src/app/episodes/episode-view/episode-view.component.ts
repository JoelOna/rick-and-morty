import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ICharacter } from 'src/app/interfaces/icharacter';
import { EpisodesDataServiceService } from 'src/app/services/episodes-data-service.service';
import { IEpisode } from '../../interfaces/iepisode'

@Component({
  selector: 'app-episode-view',
  templateUrl: './episode-view.component.html',
  styleUrls: ['./episode-view.component.scss']
})
export class EpisodeViewComponent implements OnInit{
  constructor(private episodeService : EpisodesDataServiceService, private route: ActivatedRoute){}
   episode : IEpisode ={
    id : '',
    name:'',
    air_date : '',
    episode: '',
    characters : [],
    url:'',
    created: ''
   }

   characteres : any[] = []

   idEpisode: number = parseInt(this.route.snapshot.paramMap.get('id') || '1');


  ngOnInit(): void {

    this.episodeService.getEpisode(this.idEpisode).subscribe(
      response=>{
        console.log(response.body);
        
        if (response.body != null) {
          this.episode = response.body
          console.log(this.episode.characters);
          

         this.episode.characters.forEach(character => {
           console.log(character);
           
           fetch(character)
           .then(response => response.json())
           .then(data=>{
            console.log(data);
            
             this.characteres.push(data)
           })
         });
        }
      }
    )
  }

  nextEpisode(){

    this.idEpisode = this.idEpisode ? this.idEpisode+=1 : this.idEpisode
    console.log(this.idEpisode);
    
    this.episodeService.getEpisode(this.idEpisode).subscribe(
      response=>{
        if (response.body != null) {
          this.episode = response.body
          
        }
      }
    )
  }
}
