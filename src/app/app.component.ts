import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Employee} from './employee';
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'employee-app';

  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

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

  onAddEmployee(addForm: NgForm) {
    let elementById = document.getElementById('add-employee-form');
    elementById?.click()
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees()
        addForm.reset()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset()
      }
    )
  }

  onUpdateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees()
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  onDeleteEmployee(employeeId: number | undefined) {
    if (employeeId === undefined) {
      alert(`Employee ${employeeId} not found`);
    } else {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees()
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;

    if (results.length === 0 || !key) {
      this.getEmployees()
    }
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle', 'modal');

    switch (mode) {
      case 'add':
        button.setAttribute('data-bs-target', '#addEmployeeModal');
        break;
      case 'edit':
        if (employee != null) {
          this.editEmployee = employee;
        }
        button.setAttribute('data-bs-target', '#updateEmployeeModal');
        break;
      case 'delete':
        if (employee != null) {
          this.deleteEmployee = employee;
        }
        button.setAttribute('data-bs-target', '#deleteEmployeeModal');
        break;
    }

    // @ts-ignore
    container.appendChild(button);
    button.click()
  }

}
