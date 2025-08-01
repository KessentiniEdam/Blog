package com.crud.crud;


import jakarta.persistence.*;
import java.time.LocalDate;
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
    private String userId;
    private LocalDate addedDate;

    // Getters & Setters
}