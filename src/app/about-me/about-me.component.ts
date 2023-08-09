import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  constructor(){}
  
  public sendEmail(e: Event) {
    e.preventDefault();
    var templateParams = {
      name: 'James',
      notes: 'Check this out!'
  };
 
  emailjs.send(environment.serviceeMAILkey,environment.templateKey,templateParams,environment.emailKey)
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }
}
