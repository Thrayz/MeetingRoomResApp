import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: []
})
export class ErrorComponent implements OnInit {
  message!: string;
  status!: string;
  image!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const status = this.route.snapshot.paramMap.get('status');
    switch (status) {
      case '500':
        this.status = '500 Internal Server Error'
        this.message = 'Something got fucked somewhere shit idk';
        break;
      case '502':
        this.status = '502'
        this.message = 'Naughty gateway';
        break;
      case '504':
        this.message = 'For I hope to see the answer. But no answer -- 504';
        break;
      default:
        this.message = 'Well i didn\'t even take this error into consideration lol';
    }
  }
}