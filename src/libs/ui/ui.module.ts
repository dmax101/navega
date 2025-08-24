import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { LabelComponent } from './components/label/label.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent, LabelComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, ButtonComponent, LabelComponent]
})
export class UiModule {}