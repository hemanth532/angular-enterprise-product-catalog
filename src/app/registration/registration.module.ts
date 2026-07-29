import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [{ path: '', component: RegistrationComponent }];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), RegistrationComponent],
})
export class RegistrationModule {}
