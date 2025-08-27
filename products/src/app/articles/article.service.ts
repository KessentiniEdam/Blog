import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'; // inject AuthService
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ArticleComment } from './comment.service'; // Assuming you have a comment service for comments

export interface Article {
  id?: number;
  title: string;
  body: string;
  userId: number;
  addedDate: string;
  modifiedDate?: string; // Optional field to track the last modified date

  likes?: string[];
  comments?: ArticleComment[];
  modified?: boolean; // Optional field to track if the article was modified
}


@Injectable({ providedIn: 'root' })
export class ArticleService {
  private baseUrl = 'http://localhost:8081/api/Articles';

constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  private makeAuthenticatedRequest<T>(requestFn: () => Observable<T>): Observable<T> {
  return requestFn().pipe(
    catchError(error => {
      if (error.status === 401 || error.status === 403) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          this.authService.logout();
          return throwError(() => new Error('No refresh token'));
        }
        // Only replace access token
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap(response => {
            localStorage.setItem('accessToken', response.accessToken);
            // refreshToken remains unchanged
            return requestFn();
          }),
          catchError(() => {
            this.authService.logout();
            return throwError(() => new Error('Refresh token failed'));
          })
        );
      }
      return throwError(() => error);
    })
  );
}

  getArticles(): Observable<Article[]> {

    return this.makeAuthenticatedRequest(() =>
      this.http.get<Article[]>(this.baseUrl, { headers: this.getAuthHeaders() })
  );
}
  
addArticle(article: Article): Observable<Article> {
  return this.makeAuthenticatedRequest(() =>
    this.http.post<Article>(this.baseUrl, article, { headers: this.getAuthHeaders() })
  );
}

deleteArticle(id: number): Observable<void> {
  return this.makeAuthenticatedRequest(() =>
    this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
  );
}

updateArticle(id: number, article: Article): Observable<Article> {
  return this.makeAuthenticatedRequest(() =>
    this.http.put<Article>(`${this.baseUrl}/${id}`, article, { headers: this.getAuthHeaders() })
  );
}

getArticle(id: number): Observable<Article> {
  return this.makeAuthenticatedRequest(() =>
    this.http.get<Article>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
  );
}

getArticleUserName(userId: number): Observable<string> {
  return this.makeAuthenticatedRequest(() =>
    this.http.get<{ username: string }>(`http://localhost:8081/api/users/${userId}`, { headers: this.getAuthHeaders() })
  ).pipe(
    map(response => response.username)
  );
}

getLikes(articleId: number): Observable<string[]> {
  return this.makeAuthenticatedRequest(() =>
    this.http.get<string[]>(`${this.baseUrl}/${articleId}/likes`, { headers: this.getAuthHeaders() })
  );

}

  toggleLike(articleId: number): Observable<any> {
      return this.makeAuthenticatedRequest(() =>

     this.http.post(`${this.baseUrl}/${articleId}/like-toggle`, {}, { headers:this.getAuthHeaders() })
  );
}
}