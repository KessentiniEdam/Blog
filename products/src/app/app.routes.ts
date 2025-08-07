import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EditArticleComponent } from './articles/edit-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { NewArticleComponentComponent } from './new-article-component/new-article-component.component';
import { AuthComponent } from './auth/auth.component';
export const routes: Routes = [  
     {path:'login',component:AuthComponent},

{path:'',    canActivate: [AuthGuard],children:[ 
  {path: 'articles', component: ArticlesComponent },   
   { path: 'edit-Article/:id', component: EditArticleComponent },
      { path: 'new', component: NewArticleComponentComponent },
            { path: '', redirectTo: 'articles', pathMatch: 'full' },

    ]},

    { path: '**', redirectTo: 'login' }

];
