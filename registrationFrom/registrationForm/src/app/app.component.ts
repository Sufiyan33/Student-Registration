import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentFormComponent } from "./components/student-form/student-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentFormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'registrationForm';
}
