import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';

export interface RemoteProps {
  username?: string;
}

declare global {
  interface Window {
    REMOTE_APP_PROPS?: RemoteProps;
  }
}

if (environment.production) {
  enableProdMode();
}

export async function mount(rootElementId: string, props?: RemoteProps): Promise<void> {
  const host = document.getElementById(rootElementId);
  if (!host) {
    throw new Error(`Host element ${rootElementId} not found`);
  }

  window.REMOTE_APP_PROPS = props || {};

  const element = document.createElement('app-root');
  host.appendChild(element);
  await platformBrowserDynamic().bootstrapModule(AppModule);
}
