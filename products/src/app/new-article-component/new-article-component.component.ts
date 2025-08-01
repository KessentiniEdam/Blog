import { Article, ArticleService } from '../articles/article.service';
import { Component } from '@angular/core';
import { ReversePipe } from "../reverse.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-article-component',
  standalone: true,
  imports: [ReversePipe,FormsModule],
  templateUrl: './new-article-component.component.html',
  styleUrl: './new-article-component.component.css'
})
export class NewArticleComponentComponent {
  newArticle: Article = { title: '', body: '', userId: '', addedDate: '' };

  constructor(private articleService: ArticleService) {}

  addArticle() {
    const articleToAdd = {
      ...this.newArticle,
      addedDate: new Date().toISOString().split('T')[0]
    };
    this.articleService.addArticle(articleToAdd).subscribe(() => {
      console.log('Article added successfully', articleToAdd);
      this.newArticle = { title: '', body: '', userId: '', addedDate: '' };
      alert('Article added successfully!');
    });
  }
}
