import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NgbModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
