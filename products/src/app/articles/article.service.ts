import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Article {
  id?: number;
  title: string;
  body: string;
  userId: number;
  addedDate: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private baseUrl = 'http://localhost:8081/api/Articles';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl, article, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/${id}`, article, {
      headers: this.getAuthHeaders(),
    });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
  getArticleUserName(userId: number): Observable<string> {
  return this.http.get<{username: string}>(`http://localhost:8081/api/users/${userId}`, {
    headers: this.getAuthHeaders(),
  }).pipe(
    map(response => response.username)
  );
}



}
