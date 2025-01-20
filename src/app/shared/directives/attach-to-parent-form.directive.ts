import { Directive, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Directive({
  selector: '[appAttachToForm]',
})
export class AppAttachToFormDirective implements OnInit {
  @Input() appAttachToForm: NgModel;
  @Input() parentForm: NgForm; // New input for the parent form

  ngOnInit(): void {
    if (this.parentForm && this.appAttachToForm) {
      this.parentForm.addControl(this.appAttachToForm);
    }
  }
}
