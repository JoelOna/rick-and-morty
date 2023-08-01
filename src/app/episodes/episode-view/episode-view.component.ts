import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ICharacter } from 'src/app/interfaces/icharacter';
import { EpisodesDataServiceService } from 'src/app/services/episodes-data-service.service';
import { IEpisode } from '../../interfaces/iepisode'
import { ICharacter } from 'src/app/interfaces/icharacter';

@Component({
  selector: 'app-episode-view',
  templateUrl: './episode-view.component.html',
  styleUrls: ['./episode-view.component.scss']
})
export class EpisodeViewComponent implements OnInit {
  constructor(private episodeService: EpisodesDataServiceService, private route: ActivatedRoute, private router: Router) { }
  episode: IEpisode = {
    id: '',
    name: '',
    air_date: '',
    episode: '',
    characters: [],
    url: '',
    created: ''
  }

  characteres: ICharacter[] = []
  episodeLength: any  
  idEpisode: number = parseInt(this.route.snapshot.paramMap.get('id') || '1');

  fetchEpisodeCharacter(characteres: any[]) {

    characteres.forEach(element => {
      fetch(element)
        .then(response => response.json())
        .then(data => {
          this.characteres.push(data)
        })
    });

  }

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe(
      response =>{
        if (response.body != null) {
          this.episodeLength = response.body.info.count
        }
      }
    )
     
    this.episodeService.getEpisode(this.idEpisode).subscribe(
      response => {
        console.log(response.body);

        if (response.body != null) {
          this.episode = response.body
          console.log(this.episode.characters);

          this.fetchEpisodeCharacter(this.episode.characters)

        }
      }, error =>{
        if (this.idEpisode > this.episodeLength) {
          this.episodeService.getEpisode(this.episodeLength).subscribe(
            resp =>{
              if (resp.body != null) {
                this.episode = resp.body
                this.characteres = [];
      
                this.fetchEpisodeCharacter(resp.body.characters)
            }
          }
          )
          this.router.navigate(['episodes/episode/', this.episodeLength]);
          console.log('mas grande')
        }else if (this.idEpisode <= 0) {
          this.episodeService.getEpisode(1).subscribe(
            resp =>{ 
              if (resp.body != null) {
                this.episode = resp.body
                this.characteres = [];
      
                this.fetchEpisodeCharacter(resp.body.characters)
              }
            }
          )
          this.router.navigate(['episodes/episode/', 1]);
        }
      }
    )
  }



  nextEpisode() {
      this.idEpisode +=1
      console.log(this.idEpisode);
    this.episodeService.getEpisode(this.idEpisode).subscribe(
      response => {
        if (response.body != null) {
          console.log(response.body);

          this.episode = response.body
          this.characteres = [];

          this.fetchEpisodeCharacter(response.body.characters)

        }
      }
    )
    this.router.navigate(['episodes/episode/', this.idEpisode]);
  }

  end : boolean = false
  prevEpisode() {
   
    if (this.idEpisode <= 0) {
    this.end = true
    this.idEpisode =  1
    }
    this.end = false
    this.idEpisode -=1
    console.log(this.idEpisode);


    this.episodeService.getEpisode(this.idEpisode).subscribe(
      response => {
        if (response.body != null) {
          this.end =false
          console.log(response.body);

          this.episode = response.body
          this.characteres = [];

          this.fetchEpisodeCharacter(response.body.characters)
      

        }
      },error =>{
          this.end = true;
          this.router.navigate(['episodes/episode/', 1]);
      }
    )
    this.router.navigate(['episodes/episode/', this.idEpisode]);
  }
}



