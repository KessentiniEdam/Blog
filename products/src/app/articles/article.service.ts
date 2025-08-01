// Article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id?: number;
  title: string;
  body: string;
  userId: string;
  addedDate: string;
}
@Injectable({ providedIn: 'root' })
export class ArticleService {
  private baseUrl = 'http://localhost:8080/api/Articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl);
  }

  addArticle(Article: Article): Observable<Article> {
    return this.http.post<Article>(this.baseUrl, Article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateArticle(id: number, Article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/${id}`, Article);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`);
  }
}
