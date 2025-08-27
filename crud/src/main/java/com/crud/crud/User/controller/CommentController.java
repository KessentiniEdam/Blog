package com.crud.crud.User.controller;
import com.crud.crud.User.service.JwtService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.crud.crud.User.repo.ArticleRepository;
import com.crud.crud.User.model.Article;
import com.crud.crud.User.repo.CommentRepository;
import com.crud.crud.User.model.Comment;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.Authentication;
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow requests from Angular

public class CommentController {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final JwtService jwtService;

    // Add a comment to an article
    @PostMapping("/article/{articleId}")
    public ResponseEntity<?> addComment(
            @PathVariable Long articleId,
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtService.extractUserId(token);

        String commentBody = body.get("body");

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        Comment comment = new Comment();
        comment.setBody(commentBody);
        comment.setArticle(article);
        comment.setUserId(userId);


        return ResponseEntity.ok(commentRepository.save(comment));
    }

    // Get all comments for an article
    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<Comment>> getCommentsByArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok(commentRepository.findByArticleId(articleId)) ;// nes2al est ce que s7i7 ki nekteb articleRepository.findById(articleId).getComments();
    }

    // Delete comment (only by owner or admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtService.extractUserId(token);

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed");
        }

        commentRepository.delete(comment);
        return ResponseEntity.ok(Map.of("deleted", true));
    }

    @PutMapping("/{id}") // can many articles have the same comment id  ?
    public ResponseEntity<?> updateComment ( @PathVariable Long id, @RequestBody Map<String, String> body, @RequestHeader("Authorization") String authHeader)
    {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtService.extractUserId(token);
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        if (!comment.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("not allowed");
        }
        comment.setBody(body.get("body"));
        return ResponseEntity.ok(commentRepository.save(comment));

    }
}

