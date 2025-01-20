import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss'],
})
export class LoadingMessageComponent {
  @Input() message: string = 'Loading...';
}
