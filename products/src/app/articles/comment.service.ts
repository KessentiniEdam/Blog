import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'; // inject AuthService
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
export interface ArticleComment {
  id?: number;
  userId: number;
  body: string;
}
@Injectable({ providedIn: 'root' })
export class CommentService {
  private baseUrl = 'http://localhost:8081/api/comments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getCommentsByArticle(articleId: number): Observable<ArticleComment[]> {
    return this.http.get<ArticleComment[]>(`${this.baseUrl}/article/${articleId}`, { headers: this.getAuthHeaders() });
  }

   addComment(articleId: number, body: string): Observable<ArticleComment> {
    return this.http.post<ArticleComment>(`${this.baseUrl}/article/${articleId}`, { body }, { headers:this.getAuthHeaders()  });
  }
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${commentId}`, { headers: this.getAuthHeaders() });
  }
  updateComment(commentId: number, body: string): Observable<ArticleComment> {
    return this.http.put<ArticleComment>(`${this.baseUrl}/${commentId}`, { body }, { headers: this.getAuthHeaders() });
  }
}