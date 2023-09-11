import { SimpleChanges ,Component,Input, OnInit, ViewChild, AfterViewInit, Output,EventEmitter  } from '@angular/core';
import { Student } from '../../models/students.model';
import { StudentService } from '../../services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
// --Transmiting the student to the parent component --
  @Output() studentSelected = new EventEmitter<Student>();
 @Input()studentsData: MatTableDataSource<Student> = new MatTableDataSource();
  selectStudent(student: Student) {
    this.studentSelected.emit(student);
  }
// ----------------------------------------------------

  displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];

  constructor(private studentService: StudentService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {

    console.log(this.studentsData,"studentsData");
    setTimeout(() => {

      this.studentsData.paginator = this.paginator;
    }, 0);

  }

}
