package com.crud.crud.User.controller;
import com.crud.crud.User.repo.ArticleRepository;
import com.crud.crud.User.model.Article;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.Authentication;

@RestController
@RequestMapping({"/api/Articles", "/api/Articles/"})
@CrossOrigin(origins = "*") // Allow requests from Angular
public class ArticleController {
    private final ArticleRepository repo;

    public ArticleController(ArticleRepository repo) {
        this.repo = repo;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping
    public List<Article> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Article addArticle(@RequestBody Article Article) {
        return repo.save(Article);
    }
  /*  @PostMapping("/bulk")
    public List<Article> addArticles(@RequestBody List<Article> Articles) {
        return repo.saveAll(Articles);
    }
*/

    @PutMapping("/{id}")
    public Article updateArticle(@PathVariable Long id, @RequestBody Article updatedArticle) {
        Article article = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found"));
        article.setTitle(updatedArticle.getTitle());
        article.setBody(updatedArticle.getBody());
        article.setModifiedDate(LocalDate.now());

        return repo.save(article);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/{id}/likes")
    public ResponseEntity<?> getLikes(@PathVariable Long id) {
        return repo.findById(id).map(article ->
                ResponseEntity.ok(article.getLikes())
        ).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/{id}/like-toggle")
    public ResponseEntity<?> toggleLike(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();

        return repo.findById(id).map(article -> {
            Set<String> likes = article.getLikes();
            boolean liked;
            if (likes.contains(username)) {
                likes.remove(username);
                liked = false;
            } else {
                likes.add(username);
                liked = true;
            }
            repo.save(article);
            return ResponseEntity.ok(Map.of("liked", liked, "likesCount", likes.size()));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
