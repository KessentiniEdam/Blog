package com.crud.crud.User.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data                   // Includes @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "app_user") // <-- nom non réservé

public class User {
    @Id @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String email;
    private String role;
    @Column(updatable = false)//updatable = false means once set, this field is not updated on later updates.

    @Temporal(TemporalType.TIMESTAMP) //@Temporal tells JPA how to map the Java Date or Calendar to the SQL type.


    private Date createdAt;
    // Getters + setters
}