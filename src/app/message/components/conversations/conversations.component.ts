import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { PusherService } from '../../services/pusher.service';

@Component({
  templateUrl: './conversations.html'
})
export class ConversationsComponent implements OnInit {
  public originalConversations: any = [];
  public conversations: any = [];
  private currentUser: any;
  public activeConversation: any;
  public q: any = '';

  constructor(private route: ActivatedRoute, private service: ConversationService, private pusher: PusherService) {
    this.currentUser = route.snapshot.data.currentUser;
    this.originalConversations = route.snapshot.data.conversations;
    this.conversations = this.mapConversationName(route.snapshot.data.conversations);
    pusher.messages.subscribe(data => this.conversations.forEach((conversation) => {
      if (conversation._id === data.conversationId) {
        conversation.lastMessage = data;
      }
    }));
  }

  ngOnInit() {
  }

  mapConversationName(conversations: any = []) {
    return conversations.map((conversation) => {
      const member = (conversation.members || []).filter(m => m._id !== this.currentUser._id);
      conversation.name = member.length ? member[0].name : this.currentUser.name;
      conversation.member = member.length ? member[0] : this.currentUser;
      return conversation;
    });
  }

  selectConversation(conversation: any) {
    this.activeConversation = conversation;
    this.service.setActive(conversation);
  }

  filter() {
    this.conversations = this.originalConversations.filter(conversation => conversation.name.toLowerCase().indexOf(this.q) > -1);
  }

  enterToSend(event) {
    if (event.charCode === 13) {
      this.filter();
    }
  }
}
