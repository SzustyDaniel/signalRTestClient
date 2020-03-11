import {Injectable, OnInit} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection;

  constructor() {
    // TODO give hub url better name
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/hub')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();



    this.connection.on('messageReceived', (username: string, message: string) => {
      this.pushMessageToClient(username, message);
    });

    this.connection.start()
      .then(console.log('SignalR Service Connected'))
      .catch(err => console.error(err));
  }

  // Handle and update messages received by the HUB
  private pushMessageToClient(username: string, message: string) {
    // TODO create observer for the stream of data to the user.
  }

  // Send new message to the server.
  public sendMessage(username: string, message: string) {
    this.connection.invoke('newMessage', username, message).catch(err => console.log(err));
  }

}
