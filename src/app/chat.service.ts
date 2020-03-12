import {Injectable, OnInit} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {interval, Subject} from 'rxjs';
import {Message} from './model/message';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _connection;
  private _messages: Message[] = [];
  messagesReceived$ = new Subject<Message[]>();

  constructor() {
    this._connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44375/chathub')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();



    this._connection.on('SendPublicMessage', (username: string, message: string) => {
      this.pushMessageToClient(username, message);
    });

    this._connection.start()
      .then(console.log('SignalR Service Connected'))
      .catch(err => console.error(err));
  }

  // Handle and update messages received by the HUB
  private pushMessageToClient(user: string, mesg: string) {
    this._messages.push({username: user, message: mesg, timeReceived: Date.now()});
    this.messagesReceived$.next(this._messages);
  }

  // Send new message to the server.
  public sendMessage(user: string, msg: string) {
    this._connection.invoke('SendPublicMessage', user, msg).catch(err => console.log(err));
    this.pushMessageToClient(user, msg);
  }

}
