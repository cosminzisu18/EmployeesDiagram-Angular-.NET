import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {
  _confirmButtonText: string = 'Yes';
  _closeButtonText: string = 'No';
  _exitButtonText: string = 'Cancel';

  @Input() title: any;
  @Input() content: any;
  @Input() confirmButtonText?: string;
  @Input() closeButtonText?: string;
  @Input() exitButtonText?: string;
  @Input() hideConfirmBtn!: boolean;
  @Input() showExitButton!: boolean;

  constructor(public activeModal: NgbActiveModal,  public _modal: NgbModal) {}

  ngOnInit() {
    this.confirmButtonText = this.confirmButtonText ? this.confirmButtonText : this._confirmButtonText;
    this.closeButtonText = this.closeButtonText ? this.closeButtonText : this._closeButtonText;
    this.exitButtonText = this.exitButtonText ? this.exitButtonText : this._exitButtonText;
  };

  ngAfterViewInit() {
    if (this.showExitButton && this.hideConfirmBtn) {
      const exitButton = document.getElementById('exit-button');
      const closeButton = document.getElementById('close-button');
      if (!exitButton || !closeButton) return;

      const buttonWidth = Math.max(exitButton.offsetWidth, closeButton.offsetWidth);
      exitButton.style.display = 'inline-block';
      closeButton.style.display = 'inline-block';
      exitButton.style.width = buttonWidth + 'px';
      closeButton.style.width = buttonWidth + 'px';
    }
  };

  closeAllModals = () => {
    this._modal.dismissAll();
  };
}
