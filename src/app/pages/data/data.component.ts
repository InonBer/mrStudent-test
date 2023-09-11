import { Component,SimpleChanges, OnInit, ViewChild, AfterViewInit,EventEmitter,Output } from '@angular/core';
import { Student } from '../../models/students.model';
import { StudentService } from '../../services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../cmps/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddDialogComponent } from '../../cmps/student-add-dialog/student-add-dialog.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    public dialog: MatDialog
    ) { }
  selectedStudent?: Student;
  filter: string = ''; // Declare the filter variable
  
  @Output() filterChangedEvent = new EventEmitter<string>();
  studentsData: MatTableDataSource<Student> = new MatTableDataSource();

  ngOnInit() {
    const savedFilter = sessionStorage.getItem('DataPageFilter');
    console.log(savedFilter);
    setTimeout(() => {
      this.filter = savedFilter || '';
      this.filterChanged(this.filter)
    }, 0);
     
  }

  filterChanged(event: any): void {
    this.studentsData.filter = this.filter.trim().toLowerCase();
    sessionStorage.setItem('DataPageFilter', this.filter);
  }
  
  selectStudent(student: Student): void {
    this.selectedStudent = {...student};
  }
 
  addStudent() {
    const dialogRef = this.dialog.open(StudentAddDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newStudent: Student = result;
        this.studentsData.data = [...this.studentsData.data, newStudent];
        this.studentService.addStudent(newStudent);
      }
    });
  }
  handleAddStudent(){
    const dialogRef = this.dialog.open(StudentAddDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newStudent: Student = result;
        this.studentsData.data = [...this.studentsData.data, newStudent];
        this.studentService.addStudent(newStudent);
      }
    });
  }

  handleSaveChanges(updatedStudent: Student) {
    this.studentService.updateStudent(updatedStudent);
    this.studentsData.data = this.studentService.getStudents();
  }
  handleRemoveStudent() {
    console.log('handleRemoveStudent');
    
    if (!this.selectedStudent) return;
  
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newData = this.studentsData.data.filter(student => student.id !== this.selectedStudent?.id);
        this.studentsData.data = newData;
        this.studentService.removeStudent(this.selectedStudent!.id);
        this.selectedStudent = undefined;
      }
    });  }

  
  ngAfterViewInit(): void {
    this.studentsData.data = this.studentService.getStudents();
    this.studentsData.filterPredicate = (data: any, filter: string) => {
      const student = data as Student;
      return student.name.toLowerCase().includes(filter.toLowerCase());
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.studentsData.filter = this.filter.trim().toLowerCase();
    }
    
  }


}
