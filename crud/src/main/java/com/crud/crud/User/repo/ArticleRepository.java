package com.crud.crud.User.repo;


import com.crud.crud.User.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {}