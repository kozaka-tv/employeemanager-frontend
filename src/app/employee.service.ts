import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Employee} from "./employee";
import {environment} from "../environments/environment.development";

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`)
      .pipe(
        catchError(error => {
            console.error('Error fetching data', error);
            throw error;
          }
        )
      );
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }

}
