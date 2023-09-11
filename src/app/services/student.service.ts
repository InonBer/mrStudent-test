import { Injectable } from '@angular/core';
import { Student } from '../models/students.model';
import { BehaviorSubject } from 'rxjs';
import { getRandomStudents } from './students.utils';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = getRandomStudents(15);
  
  constructor() { }
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();
  
  getStudents(): Student[] {
    return this.students;
  }
  addStudent(student: Student): void {
    console.log(student);
    
    this.students.push(student);
    localStorage.setItem('students', JSON.stringify(this.students));
  }
  
  removeStudent(id: string): void {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(this.students));
    }
  }
  
  updateStudent(updatedStudent: Student): void {
    const index = this.students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.studentsSubject.next([...this.students]);
      localStorage.setItem('students', JSON.stringify(this.students));

    }
  }



 
}