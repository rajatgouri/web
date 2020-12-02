import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'media-preview',
	template: `
  <span class="media-preview">
    <img class="img-fluid img-thumbnail media-gallery-item"
      [src]="media?.thumbUrl" alt=""
      *ngIf="media?.type === 'photo'" />
    <i class="ti-video-camera media-gallery-item" *ngIf="media?.type === 'video'"></i>
    <i class="ti-file media-gallery-item" *ngIf="media?.type === 'file'"></i>
  </span>
  `
})
export class MediaPreviewComponent {
  @Input() media: any;
}
