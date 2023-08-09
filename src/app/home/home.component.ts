import { Component, ElementRef, OnInit } from '@angular/core';
import { CharacteresDataService } from '../services/characteres-data.service';
import { ICharacter } from '../interfaces/icharacter';
import { EpisodesDataServiceService } from '../services/episodes-data-service.service';
import { LocationDataServiceService } from '../services/location-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private charactreService: CharacteresDataService, private episodeSerivce: EpisodesDataServiceService, private locationService: LocationDataServiceService, private elementRef: ElementRef) { }
  characteres: any[] = []
  characteresCopy: any[] = []
  title: string = 'Main characteres'
  titleCopy: string = ''
  pages: any;

  ngOnInit(): void {
    this.charactreService.getCharacters().subscribe(
      response => {
        if (response.body != null) {
          this.characteres = response.body.results.slice(0, 5)
          console.log(this.characteres)
          // this.characteres = this.characteres
          this.pages = response.body.info.pages
          this.characteresCopy = [...this.characteres]
          this.titleCopy = this.title
          console.log('copy ', this.characteresCopy);
        }
      }
    )
  }
  clean() {
    this.title = this.titleCopy
    this.characteres = this.characteresCopy
  }
  changeColor(isFocus:boolean){
    const searchIcon = this.elementRef.nativeElement.querySelector('#searchIcon')
    if (isFocus) {
      searchIcon.style.color = '#69c8ecff'
      console.log(true)
    }
    searchIcon.style.color = '#6c757d'
    console.log(false)
    // searchIcon.style.color = '#6c757d'? '#69c8ecff' : '##6c757d'
  }
  searchMain() {
    const toSearch = this.elementRef.nativeElement.querySelector('#searchValue').value
    console.log(toSearch);

    this.title = 'Searching for ' + '"' + toSearch + '"'
    let cont = 1;
    console.log(this.characteres);

    this.characteres.forEach((elem, index) => {
      this.characteres.splice(index, this.characteres.length)

    })

    console.log(this.characteres);
    let stop = false


    for (let index = 1; index < this.pages; index++) {
      this.charactreService.getCharactersFilter(toSearch, '', '', '', index).subscribe(
        response => {
          this.characteres = response.body.results

          if (response.body.info.pages > 1) {
            console.log(response.body.info.next);

            fetch(response.body.info.next)
              .then(resp => resp.json())
              .then(data => {
                console.log(data);

                this.characteres.push(...data.results)
              })
          }

        }, erorr => {
          return
        }
      )
    }

    for (let index = 1; index < this.pages; index++) {
      this.episodeSerivce.getEpisodesFiltered(toSearch, '').subscribe(
        response => {
          this.characteres = response.body.results
          console.log();

          if (response.body.info.pages > 1) {
            fetch(response.body.info.next)
              .then(resp => resp.json())
              .then(data => {
                console.log(data);

                this.characteres.push(...data.results)
              })
          }

        }, error => {
          return
        }
      )
    }
    for (let index = 1; index < this.pages; index++) {
      this.locationService.getLocationsFilter(toSearch, '', '').subscribe(
        response => {
          this.characteres = response.body.results
          console.log();

          if (response.body.info.pages > 1) {
            fetch(response.body.info.next)
              .then(resp => resp.json())
              .then(data => {
                console.log(data);

                this.characteres.push(...data.results)
              })
          }

        }, error => {
          this.locationService.getLocationsFilter('', '', toSearch).subscribe(
            response => {
              this.characteres = response.body.results
              console.log();

              stop = true
              if (response.body.info.pages > 1) {
                fetch(response.body.info.next)
                  .then(resp => resp.json())
                  .then(data => {
                    console.log(data);

                    this.characteres.push(...data.results)
                  })
              }

            }, error => {
              return
            }
          )
        }
      )
    }

    // error=>{
    //   this.charactreService.getCharactersFilter('',toSearch,'','',this.pages).subscribe(
    //     resp =>{
    //       if (resp.body.info.pages > 1 ) {
    //         fetch(resp.body.info.next)
    //         .then(resp => resp.json())
    //         .then(data => {
    //           this.characteres.push(data.results)
    //         })
    //       }
    //     },error=>{
    //       this.charactreService.getCharactersFilter('','',toSearch,'',this.pages).subscribe(
    //         response =>{
    //           if (response.body.info.pages > 1 ) {
    //             fetch(response.body.info.next)
    //             .then(resp => resp.json())
    //             .then(data => {
    //               this.characteres.push(data.results)
    //             })
    //           }
    //         },error=>{
    //           this.charactreService.getCharactersFilter('','','',toSearch,this.pages).subscribe(
    //             response =>{
    //               if (response.body.info.pages > 1 ) {
    //                 fetch(response.body.info.next)
    //                 .then(resp => resp.json())
    //                 .then(data => {
    //                   this.characteres.push(data.results)
    //                 })
    //               }
    //             })
    //         }
    //       )
    //     }
    //   )
    // }

    // )


  }
}
