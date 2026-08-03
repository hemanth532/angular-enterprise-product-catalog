import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ThemeService } from './services/theme.service';

interface RemoteProps {
  username?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatSlideToggleModule, RouterModule, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = signal('Enterprise Product Catalog');
  remoteUsername = ((window as any).REMOTE_APP_PROPS as RemoteProps | undefined)?.username ?? 'Guest';

  constructor(public themeService: ThemeService) {}
}
