import { Message, MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private defaultOptions: Message = { life: 3000, sticky: false, closable: true, styleClass: 'p-toast-message-animation' };

  constructor(private messageService: MessageService) { }

  success(message: string, options: Message = {}) {
    this.messageService.add({ severity: 'success', detail: message, ...this.defaultOptions, ...options });
  }

  info(message: string, options: Message = {}) {
    this.messageService.add({ severity: 'info', detail: message, ...this.defaultOptions, ...options });
  }

  warning(message: string, options: Message = {}) {
    this.messageService.add({ severity: 'warn', detail: message, ...this.defaultOptions, ...options });
  }

  error(message: string, options: Message = {}) {
    this.messageService.add({ severity: 'error', detail: message, ...this.defaultOptions, ...options });
  }

  clear() {
    this.messageService.clear();
  }
}
