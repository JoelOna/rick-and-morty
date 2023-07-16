import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ICharacter } from 'src/app/interfaces/icharacter';
import { EpisodesDataServiceService } from 'src/app/services/episodes-data-service.service';
import { IEpisode } from '../../interfaces/iepisode'

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

  characteres: any[] = []

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

    this.episodeService.getEpisode(this.idEpisode).subscribe(
      response => {
        console.log(response.body);

        if (response.body != null) {
          this.episode = response.body
          console.log(this.episode.characters);

          this.fetchEpisodeCharacter(this.episode.characters)

        }
      }
    )
  }



  nextEpisode() {

    this.idEpisode += 1
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
    if (this.idEpisode == 1) {
    this.end = true
    }
    this.end = false
    this.idEpisode -=1
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
}



