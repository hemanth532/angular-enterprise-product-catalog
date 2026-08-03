import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { LoggingService } from './services/logging.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLoggingUrl: '/api/logs',
      serverLogLevel: NgxLoggerLevel.ERROR
    })
  ],
  providers: [ProductService, LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
