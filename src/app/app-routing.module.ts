import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoRootComponent } from './core/components/todo-root/todo-root.component';

const routes: Routes = [
  { path: 'all', component: TodoRootComponent, data: { sort: 1 } },
  { path: 'favourite', component: TodoRootComponent, data: { sort: 2 } },
  { path: 'finished', component: TodoRootComponent, data: { sort: 3 } },
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', component: TodoRootComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
