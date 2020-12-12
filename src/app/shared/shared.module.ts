import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule { }
