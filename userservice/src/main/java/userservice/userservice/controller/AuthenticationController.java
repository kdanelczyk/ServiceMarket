package userservice.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import userservice.userservice.model.User;
import userservice.userservice.model.inputDto.LoginResponse;
import userservice.userservice.model.inputDto.LoginUserDto;
import userservice.userservice.model.inputDto.RegisterUserDto;
import userservice.userservice.service.AuthenticationService;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = { "http://localhost:80", "http://frontend-service:80", "http://localhost:3000" })
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        return ResponseEntity.ok(authenticationService.signup(registerUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
        return ResponseEntity.ok(authenticationService.token(loginUserDto));
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody RegisterUserDto updatedUserDto,
            @RequestHeader("Authorization") String token) {
        try {
            authenticationService.updateUser(id, updatedUserDto);
            authenticationService.logout(token.replace("Bearer ", ""));
            return ResponseEntity.ok("User successfully logged out");
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(403).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        authenticationService.logout(token.replace("Bearer ", ""));
        return ResponseEntity.ok("User successfully logged out");
    }

}
