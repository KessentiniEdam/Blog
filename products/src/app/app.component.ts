import { Component } from '@angular/core';
import {ArticlesComponent} from './articles/articles.component';
import { GreetingComponent } from './greeting/greeting.component';
import { RouterOutlet,RouterModule } from "@angular/router";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ArticlesComponent, GreetingComponent, RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  
}
