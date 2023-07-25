import { Component, Input, OnInit } from '@angular/core';
import { CharacteresDataService } from '../services/characteres-data.service';
import { ICharacter } from '../interfaces/icharacter';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent implements OnInit {
  constructor(private characterService: CharacteresDataService) { }
  // characteres: ICharacter[] = []

  @Input() search:boolean = true;
  @Input() characteres: ICharacter[] = []


  ngOnInit(): void {
    console.log(this.characteres);

    // if (this.characteres.length > 0) {
    //   this.characteres = this.characteres
    // }else{
    this.characterService.getCharacters().subscribe(
      response => {
        if (response.body != null) {
          this.characteres = response.body.results
          this.length = response.body.info.count
          this.pageSize = response.body.results.length

        }
      }, error => {
        console.log('errror')
      }
    )
  }


  length = 0
  pageSize = 20;
  pageIndex = 1;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if (this.filtered) {
 fetch(this.query)
 .then(resp => resp.json())
 .then(data =>{
  if(data.info.next != this.query && data.info.next != null) {
    this.characterService.getCharacteresFilQuery(data.info.next).subscribe(
      response =>{
        this.characteres = response.body.results
        console.log('Filtro',this.characteres)
      }
    )
  }
  // else{
  //   this.characterService.getCharacteresFilQuery(this.query).subscribe(
  //     response =>{
  //       this.characteres = response.body.results
  //       console.log('Filtro',this.characteres)
  //     }
  //   )
  // }
 })
        

   console.log('FILTRO');
      
    }else{
    this.characterService.getCharactersPage(e.pageIndex).subscribe(
      resp => {
        this.characteres = resp.body.results
        console.log(resp.body.results);

      }
    )}
  }
  errorMessage : string =''
filtered: boolean = false
query: string = ''
  addItem(newItem: any) {
    // console.log(search);
    if (this.characteres.length != newItem.info.count) {
      this.characteres = newItem.results
      this.filtered = true
    }
    
    // this.search = search
    // this.characteres.push(...newItem.results)
    // this.characteres = newItem.results
    console.log('This ',this.characteres);
    if(newItem.info.next != null ) {
      this.query = newItem.info.next
    }

    this.length = newItem.info.count
    this.pageSize = 20
  }
}
