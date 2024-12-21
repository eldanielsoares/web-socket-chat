import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private logger = new Logger('AppGateway');
  @WebSocketServer() server: Server;
  @SubscribeMessage('server:message')
  handleConnect(client: Socket, payload: any) {
    const {senderId, receiverId} = payload
    const normalizedRoute = this.normalizeRoute(receiverId, senderId)
    this.server.emit(`client:message/${normalizedRoute}`, payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  normalizeRoute(receiverId: string, senderId: string){
    return [receiverId, senderId].sort().join('')
  }
}
