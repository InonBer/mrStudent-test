import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Matirial imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';

//CMPS imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-component/index';
import { DataComponent } from './pages/data/data.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsListComponent } from './cmps/students-list/students-list.component';
import { StudentDetailsComponent } from './cmps/student-details/student-details.component';
import { ConfirmationDialogComponent } from './cmps/confirmation-dialog/confirmation-dialog.component';
import { StudentAddDialogComponent } from './cmps/student-add-dialog/student-add-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './cmps/charts/chart/chart.component';
import { KeyValue } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MonitorTableComponent } from './cmps/monitor-table/monitor-table.component';


@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    AppHeaderComponent,
    AnalysisComponent,
    MonitorComponent,
    StudentsListComponent,
    StudentDetailsComponent,
    ConfirmationDialogComponent,
    StudentAddDialogComponent,
    ChartComponent,
    MonitorTableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    DragDropModule,
    MatExpansionModule,
    NgChartsModule,
    CommonModule,
    MatCheckboxModule,
    MatToolbarModule
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
