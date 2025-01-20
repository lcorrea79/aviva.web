import { Component, TemplateRef } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastContainerComponent {
  public autohide: boolean = true;

  constructor(public alertService: AlertService) {}

  isTemplate(toast: { textOrTpl: any }) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  remove(toast: any) {
    this.autohide = true;
    this.alertService.removeToast(toast);
  }
}
