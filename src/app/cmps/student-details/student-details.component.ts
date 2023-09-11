import { Component,Input,EventEmitter,Output  } from '@angular/core';
import { Student } from '../../models/students.model';

@Component({
  selector: 'student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent {
  @Input() student: Student | null | undefined;
  @Output() saveChangesEmit = new EventEmitter<Student>();
  @Output() removeStudentEmit = new EventEmitter<void>();
  @Output() addStudentEmit = new EventEmitter<void>();

  onAddStudent(){
this.addStudentEmit.emit();
  }
  onRemoveStudent(){
    this.removeStudentEmit.emit();
  }
  onSaveChanges(){
    if(!this.student) return;
    this.saveChangesEmit.emit(this.student);
  }
  // studentCopy = JSON.parse(JSON.stringify(this.student ||null));
  focusedField: string | null = null;

}
