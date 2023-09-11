import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChartOptions, ChartType } from 'chart.js';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/students.model';
import { ChartData } from 'src/app/models/chart.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  studentsData: Student[] = this.studentService.getStudents();
  studentsArrayByIds: Student[] = [];
  idsArray: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  subjectsArray: string[] = [];

  subjectCtrl = new FormControl();
  filteredSubjects: Observable<string[]>;
  allSubjects: string[] = ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];

  public lineChartData: ChartData[] = [];
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April'];
  public lineChartOptions: ChartOptions = { responsive: true };
  public lineChartType: ChartType = 'line';
  chartsData: {key: string, value: ChartData[]}[] = [];


  ngOnInit() {
    // Initialize the stored values from sessionStorage
    setTimeout(() => {
      this.initializeFromSession('analysisIdsArray', this.idsArray, this.studentsArrayByIds);
      this.initializeFromSession('analysisSubjectArray', this.subjectsArray);

    }, 0);

    // Create initial chart data
    this.createChartsData();
  }
  
// Helper Functions to interact with sessionStorage
private initializeFromSession(sessionKey: string, arrayToUpdate: any[], optionalArray?: any[]): void {
  const storedArray = sessionStorage.getItem(sessionKey);
  if (storedArray) {
    const parsedArray = JSON.parse(storedArray);
    Object.assign(arrayToUpdate, parsedArray);
    if (optionalArray && sessionKey === 'analysisIdsArray') {
      this.studentsArrayByIds = this.studentsData.filter(s => arrayToUpdate.includes(s.id));
    }
  }
}
  

  constructor(
    private studentService: StudentService,
  ) {
    this.filteredSubjects = this.subjectCtrl.valueChanges.pipe(
      startWith(null),
      map((subject: string | null) => subject ? this._filter(subject) : this.allSubjects.slice()));
    }
    // this.createChartsData()

  
  addID(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (this.idsArray.includes(value)) return;
    if (value) {
      this.idsArray.push(value);
      const student = this.studentsData.find(s => s.id === value);
      if (student) {
        this.studentsArrayByIds.push(student);
      }
    }
    sessionStorage.setItem('analysisIdsArray', JSON.stringify(this.idsArray));
    this.createChartsData(); // update the chart data
    event.chipInput!.clear();
  }

  removeID(index: number): void {
    if (index >= 0) {
      this.idsArray.splice(index, 1);
      this.studentsArrayByIds.splice(index, 1);
      sessionStorage.setItem('analysisIdsArray', JSON.stringify(this.idsArray));

     this.createChartsData(); // update the chart data
    }
  }

  addSubject(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.subjectsArray.push(value);
      this.createChartsData();
      console.log(this.subjectsArray, 'subjectsArray');
      console.log(sessionStorage.getItem('analysisSubjectArray'), 'analysisSubjectArray');
      
      sessionStorage.setItem('analysisSubjectArray', JSON.stringify(this.subjectsArray));
    }
    console.log(this.subjectsArray, 'subjectsArray');
    
    event.chipInput!.clear();
    this.subjectCtrl.setValue(null);
  }

  removeSubject(index: number): void {
    if (index >= 0) {
      this.subjectsArray.splice(index, 1);
      sessionStorage.setItem('analysisSubjectArray', JSON.stringify(this.subjectsArray));
      this.createChartsData();

    }
  }

  selected(event: any): void {
    this.subjectsArray.push(event.option.viewValue);
    sessionStorage.setItem('analysisSubjectArray', JSON.stringify(this.subjectsArray));

    this.subjectCtrl.setValue(null);
    this.createChartsData();

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSubjects.filter(subject => subject.toLowerCase().includes(filterValue));
  }

 
  
  private createChartsData() {
    if (!this.idsArray.length && !this.studentsArrayByIds.length && !this.subjectsArray.length) return;
    console.log(this.chartsData);
    
    this.chartsData = [
      {key: 'chart1', value: this.getAvergeStudentsChartData()},
      {key: 'avgChart', value: this.getAverageChartData()},
      {key: 'barChart', value: this.getAverageGradesForAllStudents()}
    ];
  }

  getChartType(key: string): ChartType {
    switch(key) {
      case 'chart1':
        return 'line';
      case 'avgChart':
        return 'pie';
      case 'barChart':
        return 'pie';
      default:
        return 'line';
    }
  }

  onItemDropped(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.chartsData, event.previousIndex, event.currentIndex);
  }


  private getAvergeStudentsChartData(): ChartData[] {
    let chartData: ChartData[] = [];
  
    this.studentsArrayByIds.forEach(student => {
      // Sort the gradesOverTime by date
      student.gradesOverTime.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
      // Extract the sorted grades
      const data = student.gradesOverTime.map(gradeInfo => gradeInfo.grade);
      
      // Extract the sorted dates (optional, if you want to update lineChartLabels dynamically)
      const labels = student.gradesOverTime.map(gradeInfo => {
        if (gradeInfo.date) {
          return new Date(gradeInfo.date).toDateString();
        }
        return ''; // or some placeholder date if you wish
      });
  
      // Create the chart data
      chartData.push({ data, label: student.name, lineChartLabels: labels });
    });
  
    console.log(chartData);
    return chartData;
  }

  private getAverageGradesForAllStudents(): ChartData[] {
    let chartData: ChartData[] = [];
    let data: number[] = [];
    let labels: string[] = [];
  
    const subjectTotals: { [key: string]: number } = {};
    const subjectCounts: { [key: string]: number } = {};
  
    this.subjectsArray.forEach(subject => {
      subjectTotals[subject] = 0;
      subjectCounts[subject] = 0;
    });
  
    this.studentsData.forEach(student => {
      student.gradesOverTime.forEach(gradeInfo => {
        const subject = gradeInfo.subject;
        const grade = gradeInfo.grade;
  
        if (this.subjectsArray.includes(subject)) {
          subjectTotals[subject] += grade;
          subjectCounts[subject]++;
        }
      });
    });
  
    this.subjectsArray.forEach(subject => {
      const total = subjectTotals[subject] || 0;
      const count = subjectCounts[subject] || 1;
      const avgGrade = total / count;
      data.push(avgGrade);
      labels.push(subject);
    });
  
    chartData.push({ data, label: 'Average Grade', lineChartLabels: labels });
    return chartData;
  }

  private getAverageChartData(): ChartData[] {
    let chartData: ChartData[] = [];
    const data = this.studentsArrayByIds.map(student => {
      const grades = student.gradesOverTime.map(gradeInfo => gradeInfo.grade);
      const avgGrade = grades.reduce((a, b) => a + b, 0) / grades.length;
      return avgGrade;
    });
    const labels = this.studentsArrayByIds.map(student => student.name);
    chartData.push({ data, label: 'Average Grade' , lineChartLabels: labels});
    return chartData; 
   }
}

