import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Employee} from "./employee";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "./employee.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'employee-app';

  public employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

}
