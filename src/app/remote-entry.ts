import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

export async function mount(rootElementId: string): Promise<void> {
  const host = document.getElementById(rootElementId);
  if (!host) {
    throw new Error(`Host element ${rootElementId} not found`);
  }

  const element = document.createElement('app-root');
  host.appendChild(element);
  await platformBrowserDynamic().bootstrapModule(AppModule);
}
