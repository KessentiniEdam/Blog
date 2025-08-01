import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from './article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HideOnHoverDirective } from '../hide-on-hover.directive';

@Component({
  selector: 'app-Articles',
  standalone: true,
  imports: [CommonModule, FormsModule, HideOnHoverDirective],
  templateUrl: './Articles.component.html',
  styleUrl: './Articles.component.css'
})
export class ArticlesComponent implements OnInit {
  Articles: Article[] = [];
  newArticle: Article = { title: '', body: '', userId: '', addedDate: '' };

  constructor(private router: Router, private ArticleService: ArticleService) {}
   
  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.ArticleService.getArticles().subscribe(data => this.Articles = data);
  }

  addArticle() {
   const ArticleToAdd = {
    ...this.newArticle,
    addedDate: new Date().toISOString().split('T')[0]
  };
    this.ArticleService.addArticle(ArticleToAdd).subscribe(() => {
      this.loadArticles();
    this.newArticle = { title: '', body: '', userId: '', addedDate: '' };
    });
  }

  removeArticle(index: number) {
    const id = this.Articles[index].id;
    if (id !== undefined) {
      this.ArticleService.deleteArticle(id).subscribe(() => this.loadArticles());
    }
  }

  updateArticle(index: number) {
    const id = this.Articles[index].id;
    if (id !== undefined) {
      this.router.navigate(['/edit-Article', id]);
    }
}
}
