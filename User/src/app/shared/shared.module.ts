import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,RouterModule,FormsModule,SpinnerComponent
  ],
  exports:[HeaderComponent,HttpClientModule,FormsModule,SpinnerComponent]
})
export class SharedModule { }
