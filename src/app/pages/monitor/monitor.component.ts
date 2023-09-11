import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'; // Correct import
import { Student } from 'src/app/models/students.model';
import { StudentService } from '../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filterForm: FormGroup;
  studentsData: Student[] = this.studentService.getStudents();
  constructor(private studentService: StudentService,
    private fb: FormBuilder
     )
      {
        this.filterForm = this.fb.group({
          passed: [false],
          failed: [false]
        });
      }


      
  nameControl = new FormControl();
  filteredStudents: Observable<Student[]> = new Observable();
  studentsToDisplay: Student[] = [];
  ngOnInit() {
    this.filteredStudents = this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.studentsData.slice())
    );
  }
 
  isStudentToDisplay(students: Student[]):Student[] {
    if (students.length) {
      return this.studentsToDisplay
    }else{
      return this.studentsData
  }

  }
  

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.studentsData.filter(student => student.name.toLowerCase().includes(filterValue));
  }
  
  addId(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value) {
      // Find the corresponding student by ID
      const student = this.studentsData.find(s => s.id === value);
      console.log(student);
      
      if (student) {
        this.studentsToDisplay = [...this.studentsToDisplay, student];
      }
    }
    if (event.input) {
      event.input.value = '';
    }
    console.log(this.studentsToDisplay,'Display in monitor');
    
    
  }
  addName(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value) {
      // Find the corresponding student by name
      const student = this.studentsData.find(s => s.name === value);
      
      if (student) {
        console.log(student);
        
        this.studentsToDisplay = [...this.studentsToDisplay, student];
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }
  onNameSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedStudent = event.option.value;
    
    const student = this.studentsData.find(s => s.name === selectedStudent.name);
    if (student) {
      console.log(student);
      this.studentsToDisplay = [...this.studentsToDisplay, student];

    }
  }
  removeId(id: string): void {
    const index = this.studentsToDisplay.findIndex((student)=>student.id === id);
    if (index >= 0) {
      this.studentsToDisplay.splice(index, 1);
      this.studentsToDisplay = [...this.studentsToDisplay];

    }
  }

 
}
