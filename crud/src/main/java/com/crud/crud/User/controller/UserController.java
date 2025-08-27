
package com.crud.crud.User.controller;

import com.crud.crud.User.dto.UserNameResponse;
import com.crud.crud.User.model.User;
import com.crud.crud.User.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow requests from Angular
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsernameById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            String username = userOpt.get().getUsername();
            return ResponseEntity.ok().body(new UserNameResponse(username));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
