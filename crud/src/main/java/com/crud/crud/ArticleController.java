package com.crud.crud;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/Articles")
@CrossOrigin(origins = "*") // Allow requests from Angular
public class ArticleController {
    private final ArticleRepository repo;

    public ArticleController(ArticleRepository repo) {
        this.repo = repo;
    }
    @GetMapping("/{id}")
    public Article getArticle(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article not found"));
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
        article.setUserId(updatedArticle.getUserId());
        article.setAddedDate(updatedArticle.getAddedDate());
        return repo.save(article);
    }
/*@PutMapping("/{id}")
public Article updateArticle(@PathVariable Long id, @RequestBody Article updatedArticle) {
    Article article = articleRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Article not found"));
    // update fields
    article.setTitle(updatedArticle.getTitle());
    article.setBody(updatedArticle.getBody());
    article.setUserId(updatedArticle.getUserId());
    article.setAddedDate(updatedArticle.getAddedDate());
    return articleRepository.save(article);
}*/
    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable Long id) {
        repo.deleteById(id);
    }
}