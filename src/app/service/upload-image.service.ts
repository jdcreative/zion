import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  apiSST = '';

  constructor(
    private http: HttpClient
  ) { }

  UploadImage(formData){
    return ajax.post(`${this.apiSST}api/UploadImage`, formData)
  }

  DeleteImage(formData){
    return this.http.post<any>(`${this.apiSST}api/DeleteImage`, formData)
    .pipe(
      catchError(this.hadleError)
    );
  }

  SaveSelfAppraisal(formData){
    return this.http.post<any>(`${this.apiSST}api/SaveSelfAppraisal`, formData)
    .pipe(
      catchError(this.hadleError)
    )
  }

  private hadleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error ocurred', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('something bad happened. Please try again later.');
  }
}
