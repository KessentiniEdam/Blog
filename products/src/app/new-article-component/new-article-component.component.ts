import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from '../articles/article.service';
import { ReversePipe } from "../reverse.pipe";
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-new-article-component',
  standalone: true,
  imports: [ReversePipe, FormsModule],
  templateUrl: './new-article-component.component.html',
  styleUrl: './new-article-component.component.css'
})
export class NewArticleComponentComponent implements OnInit {
  newArticle: Article = { title: '', body: '', userId: 0, addedDate: '' };

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
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
  }

  addArticle() {
    const articleToAdd = {
      ...this.newArticle,
      addedDate: new Date().toISOString().split('T')[0]
    };
    this.articleService.addArticle(articleToAdd).subscribe(() => {
      console.log('Article added successfully', articleToAdd);
      this.newArticle = { title: '', body: '', userId:0, addedDate: '' };
      alert('Article added successfully!');
    });
  }
}

