import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '../chat.service';
import {Message} from '../model/message';
import {Observable} from 'rxjs';

@Component({
  selector: 'stc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  messages$: Observable<Message[]>;

  constructor(private chatService: ChatService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.messages$ = this.chatService.messagesReceived$;
    this.initForm();
  }


  private initForm() {
    this.chatForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(1)]],
      });
  }

  private clearMessage() {
    this.chatForm.patchValue({
      message: ''
    });
  }

  sendMessage() {
    const user = this.chatForm.controls.userName.value;
    const msg = this.chatForm.controls.message.value;
    console.log(`Sent message by ${user} containing ${msg}`);

    this.chatService.sendMessage(user, msg);
    this.clearMessage();
  }
}
