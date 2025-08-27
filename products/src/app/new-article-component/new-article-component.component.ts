import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../articles/article.service';
import { ReversePipe } from "../reverse.pipe";
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-article-component',
  standalone: true,
  imports: [CommonModule,ReversePipe, FormsModule],
  templateUrl: './new-article-component.component.html',
  styleUrl: './new-article-component.component.css'
})
export class NewArticleComponentComponent implements OnInit {
  newArticle: Article = { title: '', body: '', userId: 0, addedDate: '' };
errorMessage: string = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded JWT:', decoded);
        console.log('User ID:', decoded.id); // should now show the numeric id
        this.newArticle.userId = decoded.id || decoded.sub || '';

      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
  }addArticle() {
  const articleToAdd = {
    ...this.newArticle,
    addedDate: new Date().toISOString().split('T')[0]
  };

  this.articleService.addArticle(articleToAdd).subscribe({
    next: () => {
      console.log('Article added successfully', articleToAdd);
      this.newArticle = { title: '', body: '', userId: 0, addedDate: '' };
      this.errorMessage = ''; // clear previous errors
      alert('Article added successfully!');
    },
    error: (err) => {
      if (err.status === 401 || err.status === 403) {
        this.errorMessage = 'You are not authorized. Please login again.';
      } else {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
  });
}

}

