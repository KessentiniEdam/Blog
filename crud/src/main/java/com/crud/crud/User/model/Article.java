package com.crud.crud.User.model;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.crud.crud.User.model.Comment;

import lombok.*;

@Entity
@Data                   // Includes @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    @Column(columnDefinition = "TEXT") // 👈 tells PostgreSQL to use proper text type
    private String body;
    private Long userId;
    private LocalDate addedDate;
    @Column(name = "modified_date")
    private LocalDate modifiedDate;
    @ElementCollection
    private Set<String> likes = new HashSet<>();
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    // Getters & Setters
}