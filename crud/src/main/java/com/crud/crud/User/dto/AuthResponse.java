package com.crud.crud.User.dto;
import lombok.*;

@Data                   // Includes @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor     // Génère un constructeur avec tous les arguments
public class AuthResponse {
    private String refreshToken;
    private String accessToken;


}