import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


type Student = {
  id: number;
  name: string;
}

@Component({
  selector: 'app-crazy-list',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crazy-list.component.html',
  styleUrl: './crazy-list.component.scss'
})
export class CrazyListComponent {
  students: Student[];
  name: string;

  constructor() {
    this.students = [{ id: 1, name: 'lucas' }];
    this.name = '';
  }

  addStudent(name: string) {
    const id = Date.now();
    this.students.push({ id, name });
    this.name = '';
  }

  removeStudent(id: number) {
    this.students = this.students.filter(student => student.id !== id);
  }
}
