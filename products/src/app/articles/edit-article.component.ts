// edit-Article.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-edit-Article',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'})
export class EditArticleComponent implements OnInit {
  Article: any;
  index: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ArticleService: ArticleService
  ) {  }

  ngOnInit(): void {
      
    this.index = +this.route.snapshot.paramMap.get('id')!;
    this.ArticleService.getArticle(this.index).subscribe(Article => {
      this.Article = Article;
    });
  }

  save() {
    this.ArticleService.updateArticle(this.index, this.Article).subscribe(() => {
      alert('Article updated!');
      this.router.navigate(['/']);
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
;