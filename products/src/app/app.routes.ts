import { Routes } from '@angular/router';

import { EditArticleComponent } from './articles/edit-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { NewArticleComponentComponent } from './new-article-component/new-article-component.component';
export const routes: Routes = [  
    { path: '' ,component: ArticlesComponent },
      { path: 'articles', component: ArticlesComponent },  
      { path: 'new', component: NewArticleComponentComponent },



  { path: 'edit-Article/:id', component: EditArticleComponent },
];
