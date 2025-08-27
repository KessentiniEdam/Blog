import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from './article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HideOnHoverDirective } from '../hide-on-hover.directive';
import { AuthService } from '../auth/auth.service';
import { CommentService, ArticleComment } from './comment.service';

@Component({
  selector: 'app-Articles',
  standalone: true,
  imports: [CommonModule, FormsModule, HideOnHoverDirective],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  editingCommentIndex: number | null = null;
  editingArticleIndex: number | null = null;
  userNames: { [userId: number]: string } = {};
  Articles: Article[] = [];
  commentInputs: { [articleId: number]: string } = {};

  newArticle: Article = { title: '', body: '', userId: 0, addedDate: '', modifiedDate: '', likes: [], comments: [], modified: false };

  constructor(
    private router: Router,
    private ArticleService: ArticleService,
    private authService: AuthService,
    private commentService: CommentService
  ) { }
  ngOnInit(): void {
    this.loadArticles();

    // Use history.state instead of getCurrentNavigation()
    // const state = history.state as { mod.ifiedArticleId?: number };
    // if (state?.modifiedArticleId) {
    //   // Wait for articles to load before marking
    //   this.ArticleService.getArticles().subscribe(articles => {
    //     this.Articles = articles;
    //     const article = this.Articles.find(a => a.id === state.modifiedArticleId);
    //     if (article) article.modified = true;
    //   });
    // }
  }




  loadArticles() {
    this.ArticleService.getArticles().subscribe(articles => {
      this.Articles = articles;

      // Load comments for each article
      this.Articles.forEach(article => {
        if (article.id) {
          this.ArticleService.getLikes(article.id).subscribe(likes => {
            article.likes = likes; // likes: string[]
          });
          this.commentService.getCommentsByArticle(article.id).subscribe(acomments => {
            article.comments = acomments;
          });
        }
      });
    });
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
  checkCommentPrivileges(comment: ArticleComment): boolean {
    return comment.userId == this.authService.getUserId();
  }


  removeArticle(index: number) {

    const article = this.Articles[index];
    if (article.id !== undefined && this.checkPrivileges(article)) {

      this.ArticleService.deleteArticle(article.id).subscribe(() => this.loadArticles());
    }
  }
  startEditComment(articleIndex: number, commentIndex: number) {
    const article = this.Articles[articleIndex];
    const comment = article.comments![commentIndex];
    this.commentInputs[article.id!] = comment.body;
    // Optionally, store which comment is being edited if you want to show an "Update" button
    this.editingCommentIndex = commentIndex;
    this.editingArticleIndex = articleIndex;
  }
  updateComment(index: number, commentIndex: number) {
    const article = this.Articles[index];

    const comment = article.comments![commentIndex];

    const text = this.commentInputs[article.id!];
    if (comment.id !== undefined && this.checkCommentPrivileges(comment)) {

      this.commentService.updateComment(comment.id, text).subscribe(newComment => {
        article.comments![commentIndex] = newComment;
        this.commentInputs[article.id!] = ''; // reset field
        this.editingCommentIndex = null;
        this.editingArticleIndex = null;
      });
    }
  }
  deleteComment(index: number, commentIndxex: number) {
    const article = this.Articles[index];

    const comment = article.comments![commentIndxex];
    if (comment.id !== undefined && this.checkCommentPrivileges(comment)) {

      this.commentService.deleteComment(comment.id).subscribe(() => this.commentService.getCommentsByArticle(article.id!).subscribe(acomments => { article.comments = acomments; }));
    }
  }



  updateArticle(index: number) {
    const article = this.Articles[index];
    if (article.id !== undefined && this.checkPrivileges(article)) {
      this.router.navigate(['/edit-Article', article.id]).then(() => {
        // After returning from edit, mark as modified
        article['modified'] = true;
      });
    }
  }
  trackByTitle(index: number, item: Article): string {
    return item.title;
  }
  toggleLike(article: Article) {
    this.ArticleService.toggleLike(article.id!).subscribe((res: any) => {
      if (res.liked) {
        article.likes?.push(this.authService.getUsername());
      } else {
        article.likes = article.likes?.filter(u => u !== this.authService.getUsername());
      }
    });
  }
  addComment(article: Article, text: string) {
    if (!text || !text.trim()) return;
    if (!article.id) return;

    this.commentService.addComment(article.id, text).subscribe(newComment => {
      article.comments?.push(newComment);
      this.commentInputs[article.id!] = ''; // reset field
    });
  }
  isLiked(article: Article): boolean {
    const me = this.authService.getUsername?.() || 'me';
    return article.likes?.includes(me) ?? false;
  }

}
