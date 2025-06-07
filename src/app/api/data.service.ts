import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://api.example.com/data'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((response) => {
        // transform or return data directly
        return response;
      }),
      catchError((error) => {
        // handle error
        console.error('Error fetching data:', error);
        return throwError(() => error);
      })
    );
  }
}

// USAGE
// export class AppComponent implements OnInit {
//   data: any;

//   constructor(private dataService: DataService) {}

//   ngOnInit() {
//     this.dataService.getData().subscribe({
//       next: (res) => (this.data = res),
//       error: (err) => console.error('Error:', err),
//     });
//   }
// }