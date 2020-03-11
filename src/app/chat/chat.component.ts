import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'stc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
