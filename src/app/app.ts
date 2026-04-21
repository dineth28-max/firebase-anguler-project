import { Component, signal } from '@angular/core';

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo List');
  protected readonly todos = signal<TodoItem[]>([

  ]);

  protected addTodo(input: HTMLInputElement): void {
    const text = input.value.trim();

    if (!text) {
      return;
    }

    this.todos.update((items) => [
      ...items,
      {
        id: Date.now(),
        text,
        done: false
      }
    ]);

    input.value = '';
  }

  protected toggleTodo(id: number): void {
    this.todos.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  protected deleteTodo(id: number): void {
    this.todos.update((items) => items.filter((item) => item.id !== id));
  }
}
