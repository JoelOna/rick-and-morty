import { Component, ElementRef, OnInit } from '@angular/core';
import { CharacteresDataService } from '../services/characteres-data.service';
import { ICharacter } from '../interfaces/icharacter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private charactreService: CharacteresDataService,private elementRef : ElementRef){}
  characteres : ICharacter [] = []
  title: string = 'Main characteres'
  pages : any ;

  ngOnInit(): void {
    this.charactreService.getCharacters().subscribe(
      response =>{ 
        if (response.body != null) {
          this.characteres = response.body.results.slice(0,5)
          console.log(this.characteres)
          // this.characteres = this.characteres
          this.pages = response.body.info.pages
          
        }
      }
    )
  }

  searchMain(){
    const toSearch = this.elementRef.nativeElement.querySelector('#searchValue').value
    console.log(toSearch);
    
    this.title = 'Searching for ' + toSearch
    let cont = 1;
    console.log(this.characteres);
    
    this.characteres.forEach((elem,index) =>{
      this.characteres.splice(index,this.characteres.length)
    })
    console.log(this.characteres);
    let stop = false

  
        this.charactreService.getCharactersFilter(toSearch,'','','',this.pages).subscribe(
          response=>{
            this.characteres = response.body.results
            stop = true
            if (response.body.info.pages > 1 ) {
              fetch(response.body.info.next)
              .then(resp => resp.json())
              .then(data => {
                this.characteres.push(data.results)
              })
            }
          
          },
          error=>{
            this.charactreService.getCharactersFilter('',toSearch,'','',this.pages).subscribe(
              resp =>{
                if (resp.body.info.pages > 1 ) {
                  fetch(resp.body.info.next)
                  .then(resp => resp.json())
                  .then(data => {
                    this.characteres.push(data.results)
                  })
                }
              },error=>{
                this.charactreService.getCharactersFilter('','',toSearch,'',this.pages).subscribe(
                  response =>{
                    if (response.body.info.pages > 1 ) {
                      fetch(response.body.info.next)
                      .then(resp => resp.json())
                      .then(data => {
                        this.characteres.push(data.results)
                      })
                    }
                  },error=>{
                    this.charactreService.getCharactersFilter('','','',toSearch,this.pages).subscribe(
                      response =>{
                        if (response.body.info.pages > 1 ) {
                          fetch(response.body.info.next)
                          .then(resp => resp.json())
                          .then(data => {
                            this.characteres.push(data.results)
                          })
                        }
                      })
                  }
                )
              }
            )
          }
  
        )

      
  }
}
