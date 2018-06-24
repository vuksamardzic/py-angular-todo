import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MTodo } from '../../models/todo.model';

@Component({
  selector: 'py-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.scss']
})
export class TodoRootComponent implements OnInit {
  url = 'https://vs-todo.herokuapp.com/todo';
  items: MTodo[] = [];
  sort: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(d => {
      this.sort = d.sort;
    });
    this.getTodo()
      .subscribe(
        res => {
          this.handle_response(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  onSubmit(form: HTMLFormElement): void {
    const body = {
      name: form.value.name,
      favourite: false,
      finished: false
    };
    this.createTodo(body)
      .subscribe(
        res => {
          this.handle_response(res);
          form.reset();
        },
        err => {
          console.log(err);
        }
      );
  }

  getTodo(): Observable<any> {
    return this.http.get(this.url)
      .pipe(
        map((data: any) => {
          return data.data;
        })
      );
  }

  createTodo(body): Observable<any> {
    return this.http.post(this.url, body)
      .pipe(
        map((data: any) => data.data)
      );
  }

  updateTodo(body): Observable<any> {
    return this.http.put(this.url, body)
      .pipe(
        map((data: any) => data.data)
      );
  }

  deleteTodo(id): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        map((data: any) => data.data)
      );
  }

  deleteTodoHandler(id): void {
    this.deleteTodo(id)
      .subscribe(
        res => {
          this.handle_response(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  setAsFavouriteTodoHandler(todo): void {
    todo.favourite = !todo.favourite;
    this.updateTodo(todo)
      .subscribe(
        res => {
          this.handle_response(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  setAsFinishedTodoHandler(todo): void {
    todo.favourite = false;
    todo.finished = true;
    this.updateTodo(todo)
      .subscribe(
        res => {
          this.handle_response(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  private handle_response(res: any): void {
    switch (this.sort) {
      case 1:
        this.items = res.map(i => new MTodo(i));
        console.log(this.items);
        break;
      case 2:
        this.items = res.filter(i => i.favourite === true);
        break;
      case 3:
        this.items = res.filter(i => i.finished === true);
        break;
    }
  }

}

