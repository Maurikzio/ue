import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Person = {
  name: string;
  lastname: string;
  phone: string;
  date_of_birth: string;
}

@Component({
  selector: 'app-big-form',
  imports: [ReactiveFormsModule],
  templateUrl: './big-form.component.html',
  styleUrl: './big-form.component.scss'
})
export class BigFormComponent {
  people: Person[] = [];
  bigForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
  })

  onSubmit() {
    if (this.bigForm.valid) {
      this.people.push(this.bigForm.value as Person);
      this.bigForm.reset();
    }
  }
}
