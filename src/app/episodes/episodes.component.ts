import { Component, OnInit } from '@angular/core';
import { EpisodesDataServiceService } from '../services/episodes-data-service.service';
import { IEpisode } from '../interfaces/iepisode';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  constructor(private episodeService: EpisodesDataServiceService) { }
  episodes: IEpisode[] = []
  season01: IEpisode[] = []
  season02: IEpisode[] = []
  season03: IEpisode[] = []
  season04: IEpisode[] = []
  season05: IEpisode[] = []

  seasons: any = {
    S01: 'S01',
    S02: 'S02',
    S03: 'S03',
    S04: 'S04',
    S05: 'S05'
  }
  
  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe(
      resp => {
        if (resp.body != null) {
          console.log(resp.body);
          let cont = 1;
          const max = resp.body.info.pages

          while (cont < max+1) {//SEARCH SEASSONS
            this.episodeService.getEpisodesPage(cont).subscribe(
              resp => {
                for (let index = 0; index < resp.body.results.length; index++) {
                  let season = resp.body.results[index].episode.slice(0, 3)
                  switch (season) {
                    case this.seasons.S01:
                      this.season01.push(resp.body.results[index])
                      break;
                    case this.seasons.S02:
                      this.season02.push(resp.body.results[index])
                      break;
                    case this.seasons.S03:
                      this.season03.push(resp.body.results[index])
                      break;
                    case this.seasons.S04:
                      this.season04.push(resp.body.results[index])
                      break;
                    case this.seasons.S05:
                      this.season05.push(resp.body.results[index])
                      break;
                    default:
                      break;
                  }
          
                }
              }
            )
            cont++
          }
        }
      }
    )

  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}


