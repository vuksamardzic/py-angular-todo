import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRootComponent } from './components/todo-root/todo-root.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [TodoRootComponent],
  exports: [TodoRootComponent]
})
export class CoreModule {
}
