import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from './article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HideOnHoverDirective } from '../hide-on-hover.directive';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-Articles',
  standalone: true,
  imports: [CommonModule, FormsModule, HideOnHoverDirective],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  
  userNames: { [userId: number]: string } = {};
  Articles: Article[] = [];

  newArticle: Article = { title: '', body: '', userId: 0, addedDate: '' };

  constructor(
    private router: Router,
    private ArticleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
          console.log('User ID from token:', this.authService.getUserId());

    this.ArticleService.getArticles().subscribe(data => this.Articles = data);
  }

  getUsername(userId: number): string {
    if (!userId) return 'Unknown';

    if (this.userNames[userId]) {
      return this.userNames[userId];
    }

    this.ArticleService.getArticleUserName(userId).subscribe({
      next: username => this.userNames[userId] = username,
      error: () => this.userNames[userId] = 'Unknown'
    });

    return 'Loading...';
  }

  checkPrivileges(article: Article): boolean {
    return article.userId == this.authService.getUserId();
  }

  removeArticle(index: number) {
    
    const article = this.Articles[index];
    if (article.id !== undefined && this.checkPrivileges(article)) {

      this.ArticleService.deleteArticle(article.id).subscribe(() => this.loadArticles());
    }
  }

  updateArticle(index: number) {
    const article = this.Articles[index];
    if (article.id !== undefined && this.checkPrivileges(article)) {
      this.router.navigate(['/edit-Article', article.id]);
    }
  }
  trackByTitle(index: number, item: Article): string {
  return item.title;
}
}
