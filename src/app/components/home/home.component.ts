import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public data: {[key: string]: string[]} = {
    pending: [],
    inprogress: [],
    done: []
  }

  constructor() {

  }

  ngOnInit(): void {
    this.getData();
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    Object.keys(this.data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
    });
  }

  public addNewToDo(newtodo: any): void {
    if(!newtodo.value) {
      return;
    }
    this.data["pending"].push(newtodo.value);
    newtodo.value = "";
    localStorage.setItem("pending", JSON.stringify(this.data["pending"]));
  }

  public getData(): void {
    Object.keys(this.data).forEach((key) => {
      if(localStorage.getItem(key)) {
        const data: string | null = localStorage.getItem(key);
        this.data[key] = data ? JSON.parse(data) : null;
      }
    });
  }
  
  public deleteTodo(type: string, value: string): void {
    this.data[type] = this.data[type].filter((item) => { return item != value });
    localStorage.setItem(type, JSON.stringify(this.data[type]));
  }
}
