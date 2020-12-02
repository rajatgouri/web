import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {

  constructor(private restangular: Restangular) { }

  listByConversation(conversationId: string, params: any): Promise<any> {
    return this.restangular.one('messages/conversations', conversationId).get(params).toPromise();
  }

  send(data: any) {
    return this.restangular.one('messages').customPOST(data).toPromise();
  }
}
