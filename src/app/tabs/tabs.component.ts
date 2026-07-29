import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterModule, MatTabsModule, MatButtonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  readonly selectedIndex = signal(0);

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.updateSelectedIndex(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateSelectedIndex(event.urlAfterRedirects));
  }

  navigateToTab(index: number) {
    const destination = index === 0 ? 'product' : 'registration';
    this.router.navigate([destination], { relativeTo: this.route });
  }

  private updateSelectedIndex(url: string) {
    if (url.endsWith('/registration')) {
      this.selectedIndex.set(1);
    } else {
      this.selectedIndex.set(0);
    }
  }
}
