import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/students.model';

@Component({
  selector: 'monitor-table',
  templateUrl: './monitor-table.component.html',
  styleUrls: ['./monitor-table.component.scss']
})
export class MonitorTableComponent implements OnChanges {
  @Input() inputStudents: Student[] = [];
  @Input() filters: any; // Add this line

  displayedColumns: string[] = ['id', 'name', 'average', 'exams'];
  studentsData: MatTableDataSource<Student> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputStudents'] || changes['filters']) {
      this.applyFilters();
    }
  }

  ngAfterViewInit() {
    this.studentsData.paginator = this.paginator;
  }

  applyFilters() {
    console.log(this.filters);
    
    if (this.filters.passed || this.filters.failed) {
      this.studentsData.data = this.inputStudents.filter(student => {
        if (this.filters.passed && !this.filters.failed) {
          return this.passed(student);
        }
        if (!this.filters.passed && this.filters.failed) {
          return !this.passed(student);
        }
        return true;
      });
    } else {
      this.studentsData.data = this.inputStudents;
      
    }
    this.studentsData.paginator = this.paginator;
  }
  passed(student: Student): boolean {
    const averageGrade = this.getAverageGrade(student);
    return averageGrade >= 65;  // Replace with your criteria
  }
  getRowClass(row: Student): string {
    const averageGrade = this.getAverageGrade(row);
  
    if (this.filters.passed && this.filters.failed) {
      return averageGrade >= 65 ? 'green' : 'red';
    }
    
    if (this.filters.passed && !this.filters.failed) {
      return averageGrade >= 65 ? 'green' : '';
    }
  
    if (!this.filters.passed && this.filters.failed) {
      return averageGrade < 65 ? 'red' : '';
    }
  
    return '';  // Default: no class
  }
  
  getAverageGrade(student: Student): number {
    if (!student.gradesOverTime || student.gradesOverTime.length === 0) return 0;
    const total = student.gradesOverTime.reduce((acc, curr) => acc + curr.grade, 0);
    return total / student.gradesOverTime.length;
  }
}
