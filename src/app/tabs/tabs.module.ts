import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('../components/product-list/product-list.module').then(
            (m) => m.ProductListModule
          ),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('../registration/registration.module').then(
            (m) => m.RegistrationModule
          ),
      },
      { path: '', redirectTo: 'product', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TabsComponent],
  exports: [RouterModule],
})
export class TabsModule {}
