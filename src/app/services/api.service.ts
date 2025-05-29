import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3001/api/dinamic-db/report/119';
  private token = '790cfdfb568c8ca697c72f52d8fab5af63ede025';

  constructor(private http: HttpClient) {}

  async getUserByCedula(cedula: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${cedula}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        const errorText = await response.text();
       }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const htmlContent = await response.text();
      }

      const data = await response.json();

      if (data.status === 'ok') {
        if (data.result && data.result.length > 0) {
          return data.result[0];
        } else {
          return null;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data: any): Promise<any> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const htmlContent = await response.text();
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
