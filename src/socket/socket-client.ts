import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from 'socket.io-client'

@Injectable()
export class SocketClient implements OnModuleInit {
    public socketClient: Socket
   constructor() {
     this.socketClient = io('http://localhost:3000')
   }

   onModuleInit() {
      this.registerConsumerEvent()
   }

   private registerConsumerEvent () {
    this.socketClient.on('connection', () => {
        console.log("Connected to the gateway!!!")
       })

       this.socketClient.on('onMessage', payload => {
        console.log(payload)
       })
   }

}