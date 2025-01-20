/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Injectable, TemplateRef } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
/**************************************************************************************
 * Core Services and Utilities Imports
 *************************************************************************************/
import { Utilities } from '../services/utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingMessageComponent } from '../components/loading-message/loading-message.component';

@Injectable()
export class AlertService {
  /************************************************************************************
   * Properties
   ***********************************************************************************/
  private messages = new Subject<AlertCommand>();
  private dialogs = new Subject<AlertDialog>();
  private shouldShowLoading = false;
  private loadingDelayTimeoutId: any;
  private loadingMessageTimeoutId: any;
  private modalRef: any;
  // private loading = Swal.mixin({
  //   showConfirmButton: false,
  //   customClass: {
  //     popup: 'bg-light',
  //   },
  // });
  public toasts: any[] = [];
  private lastDelay = 0;
  private baseOffset = 2000; // 2 seconds base time

  constructor(private modalService: NgbModal) { }

  showToast(color: any, textOrTpl: string | TemplateRef<any>, error?: any) {
    const bgColor = color === 'error' ? 'danger' : color;
    let calculatedDelay = this.baseOffset;

    // Calculate delay based on text length if it's not a TemplateRef
    if (!(textOrTpl instanceof TemplateRef)) {
      const wordCount = textOrTpl.split(' ').length;
      const readTime = (wordCount / 200) * 60 * 1000; // in milliseconds
      calculatedDelay += readTime;
    }

    // Increment the delay for this toast based on the last one
    this.lastDelay += calculatedDelay;

    const options = { classname: `bg-${bgColor} text-white`, delay: this.lastDelay, show: false };

    // Check for duplicate toast message
    const isDuplicate = this.toasts?.some((toast) => toast?.textOrTpl === textOrTpl);

    if (!isDuplicate) {
      const newToast = { textOrTpl, ...options };
      this.toasts.push(newToast);

      setTimeout(() => {
        newToast.show = true;
      }, 10);

      // Reset the delay once this toast is shown
      setTimeout(() => {
        this.lastDelay -= calculatedDelay;
      }, this.lastDelay);
    } else {
      // If it's a duplicate, log this occurrence or handle it in a specific way.
      console.log(`Duplicate toast not added: "${textOrTpl}"`);
    }

    if (error) {
      console.log(error);
    }
  }

  removeToast(toast: any) {
    toast.show = false;
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t !== toast);
    }, 500);
  }

  confirmAlert(
    title: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
    deniedButtonText?: string,
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      showDenyButton: !!deniedButtonText, // Show the deny button only if the text is provided
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      denyButtonText: deniedButtonText,
      customClass: {
        popup: 'bg-light',
      },
      allowOutsideClick: false,
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        const denyButton = Swal.getDenyButton();

        // Clear out the default classes
        confirmButton.className = '';
        cancelButton.className = '';

        // Apply your custom classes
        confirmButton.classList.add('btn', 'btn-primary');
        cancelButton.classList.add('btn', 'btn-danger', 'ms-2');

        // Apply custom classes to deny button if it exists
        if (denyButton) {
          denyButton.className = '';
          denyButton.classList.add('btn', 'btn-warning', 'ms-2');
        }
      },
    }).then((result: SweetAlertResult) => {
      return result;
    });
  }

  showDialog(message: string);
  showDialog(message: string, type: DialogType, okCallback: (val?: any) => any);
  showDialog(
    message: string,
    type: DialogType,
    okCallback?: (val?: any) => any,
    cancelCallback?: () => any,
    okLabel?: string,
    cancelLabel?: string,
    defaultValue?: string,
  );
  showDialog(
    message: string,
    type?: DialogType,
    okCallback?: (val?: any) => any,
    cancelCallback?: () => any,
    okLabel?: string,
    cancelLabel?: string,
    defaultValue?: string,
  ) {
    if (!type) {
      type = DialogType.alert;
    }

    this.dialogs.next({ message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue });
  }

  showMessage(summary: string);
  showMessage(summary: string, detail: string, severity: MessageSeverity);
  showMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity);
  showMessage(response: HttpResponseBase, ignoreValueUseNull: string, severity: MessageSeverity);
  showMessage(data: any, separatorOrDetail?: string, severity?: MessageSeverity) {
    if (!severity) {
      severity = MessageSeverity.default;
    }

    if (data instanceof HttpResponseBase) {
      data = Utilities.getHttpResponseMessages(data);
      separatorOrDetail = Utilities.captionAndMessageSeparator;
    }

    if (data instanceof Array) {
      for (const message of data) {
        const msgObject = Utilities.splitInTwo(message, separatorOrDetail);

        this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
      }
    } else {
      this.showMessageHelper(data, separatorOrDetail, severity, false);
    }
  }

  showStickyMessage(summary: string);
  showStickyMessage(summary: string, detail: string, severity: MessageSeverity, error?: any);
  showStickyMessage(summary: string, detail: string, severity: MessageSeverity, error?: any, onRemove?: () => any);
  showStickyMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity);
  showStickyMessage(response: HttpResponseBase, ignoreValueUseNull: string, severity: MessageSeverity);
  showStickyMessage(
    data: string | string[] | HttpResponseBase,
    separatorOrDetail?: string,
    severity?: MessageSeverity,
    error?: any,
    onRemove?: () => any,
  ) {
    if (!severity) {
      severity = MessageSeverity.default;
    }

    if (data instanceof HttpResponseBase) {
      data = Utilities.getHttpResponseMessages(data);
      separatorOrDetail = Utilities.captionAndMessageSeparator;
    }

    if (data instanceof Array) {
      for (const message of data) {
        const msgObject = Utilities.splitInTwo(message, separatorOrDetail);

        this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
      }
    } else {
      if (error) {
        const msg = `Severity: "${MessageSeverity[severity]
          }", Summary: "${data}", Detail: "${separatorOrDetail}", Error: "${Utilities.safeStringify(error)}"`;

        switch (severity) {
          case MessageSeverity.default:
            this.logInfo(msg);
            break;
          case MessageSeverity.info:
            this.logInfo(msg);
            break;
          case MessageSeverity.success:
            this.logMessage(msg);
            break;
          case MessageSeverity.error:
            this.logError(msg);
            break;
          case MessageSeverity.warn:
            this.logWarning(msg);
            break;
          case MessageSeverity.wait:
            this.logTrace(msg);
            break;
        }
      }

      this.showMessageHelper(data, separatorOrDetail, severity, true, onRemove);
    }
  }

  private showMessageHelper(summary: string, detail: string, severity: MessageSeverity, isSticky: boolean, onRemove?: () => any) {
    const alertCommand: AlertCommand = {
      operation: isSticky ? 'add_sticky' : 'add',
      message: { severity, summary, detail },
      onRemove,
    };

    this.messages.next(alertCommand);
  }

  resetStickyMessage() {
    this.messages.next({ operation: 'clear' });
  }

  startLoadingMessage(message = 'Loading...', caption = '') {
    this.stopLoadingMessage();
    this.shouldShowLoading = true;

    // Set a short delay before showing the loading message
    this.loadingDelayTimeoutId = setTimeout(() => {
      if (this.shouldShowLoading) {
        this.modalRef = this.modalService.open(LoadingMessageComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false,
          modalDialogClass: 'loading-message-modal',
        });

        this.modalRef.componentInstance.message = message;

        this.loadingMessageTimeoutId = setTimeout(() => {
          this.showStickyMessage(caption, message, MessageSeverity.wait);
        }, 1000);
      }
    }, 500);
  }

  stopLoadingMessage() {
    this.shouldShowLoading = false;
    clearTimeout(this.loadingDelayTimeoutId);
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
    clearTimeout(this.loadingMessageTimeoutId);
    this.resetStickyMessage();
  }

  emailSentAlert(title: string, text: string, icon: any = 'success'): Observable<any> {
    return from(Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: 'rgb(3, 142, 220)',
      confirmButtonText: 'OK'
    }));
  }

  logDebug(msg) {
    console.debug(msg);
  }

  logError(msg) {
    console.error(msg);
  }

  logInfo(msg) {
    console.info(msg);
  }

  logMessage(msg) {
    console.log(msg);
  }

  logTrace(msg) {
    console.trace(msg);
  }

  logWarning(msg) {
    console.warn(msg);
  }

  getDialogEvent(): Observable<AlertDialog> {
    return this.dialogs.asObservable();
  }

  getMessageEvent(): Observable<AlertCommand> {
    return this.messages.asObservable();
  }
}

// ******************** Dialog ********************//
export class AlertDialog {
  constructor(
    public message: string,
    public type: DialogType,
    public okCallback: (val?: any) => any,
    public cancelCallback: () => any,
    public defaultValue: string,
    public okLabel: string,
    public cancelLabel: string,
  ) { }
}

export enum DialogType {
  alert,
  confirm,
  prompt,
}
// ******************** End ********************//

// ******************** Growls ********************//
export class AlertCommand {
  constructor(
    public operation: 'clear' | 'add' | 'add_sticky',
    public message?: AlertMessage,
    public onRemove?: () => any,
  ) { }
}

export class AlertMessage {
  constructor(
    public severity: MessageSeverity,
    public summary: string,
    public detail: string,
  ) { }
}

export enum MessageSeverity {
  default,
  info,
  success,
  error,
  warn,
  wait,
}
// ******************** End ********************//
