import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from 'socket.io-client'

@Injectable()
export class SocketClient implements OnModuleInit {
    public socketClient: Socket
   constructor() {
     this.socketClient = io('http://localhost:9000')
   }

   onModuleInit() {
      this.registerConsumerEvent()
   }

   private registerConsumerEvent () {
    this.socketClient.emit('newMessage', {msg: 'Hi there!'})
    this.socketClient.on('connect', () => {
        console.log("Connected to the gateway!!!")
       })

       this.socketClient.on('onMessage', payload => {
        console.log(payload)
       })
   }

}