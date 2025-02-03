package userservice.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import userservice.userservice.model.Role;
import userservice.userservice.model.RoleEnum;
import userservice.userservice.model.User;
import userservice.userservice.model.inputDto.LoginResponse;
import userservice.userservice.model.inputDto.LoginUserDto;
import userservice.userservice.model.inputDto.RegisterUserDto;
import userservice.userservice.model.mapper.RegisterUserDtoMapper;
import userservice.userservice.repository.RoleRepository;
import userservice.userservice.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private RegisterUserDtoMapper registerUserDtoMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1L)
                .username("testuser")
                .password("password")
                .email("testuser@example.com")
                .phone("+123456789012")
                .city("New York")
                .role(new Role(1, RoleEnum.USER))
                .updatedAt(LocalDateTime.now())
                .build();

        SecurityContextHolder.clearContext();
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testSignup() {
        // Given
        RegisterUserDto registerUserDto = new RegisterUserDto("testuser", "password", "testuser@example.com",
                "+123456789012", "New York");
        Role role = new Role(1, RoleEnum.USER);
        when(roleRepository.findByName(RoleEnum.USER)).thenReturn(Optional.of(role));
        when(userRepository.existsByUsername(registerUserDto.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(registerUserDto.getEmail())).thenReturn(false);
        when(registerUserDtoMapper.toEntity(registerUserDto)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");

        // When
        User result = authenticationService.signup(registerUserDto);

        // Then
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("encodedPassword", result.getPassword());
        assertEquals("New York", result.getCity());
        assertEquals("+123456789012", result.getPhone());
        verify(userRepository).save(user);
    }

    @Test
    void testAuthenticate() {
        // Given
        LoginUserDto loginUserDto = new LoginUserDto("testuser", "password");
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // When
        User result = authenticationService.authenticate(loginUserDto);

        // Then
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
    }

    @Test
    void testToken() {
        // Given
        String username = "testuser";
        LoginUserDto loginUserDto = new LoginUserDto("testuser", "password");

        String mockToken = "mockToken";
        long expirationTime = 3600L;

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn(mockToken);
        when(jwtService.getExpirationTime()).thenReturn(expirationTime);
        // When
        LoginResponse result = authenticationService.token(loginUserDto);

        // Then
        assertNotNull(result);
        assertEquals(mockToken, result.getToken());
        assertEquals(expirationTime, result.getExpiresIn());
        verify(userRepository).findByUsername(username);
        verify(jwtService).generateToken(any(User.class));
        verify(jwtService).getExpirationTime();
    }

    @Test
    void testUpdateUser_Success() {
        // Given
        RegisterUserDto updatedUserDto = new RegisterUserDto("newusername", "newpassword", "newemail@example.com",
                "+123456789012", "Los Angeles");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(authentication.getName()).thenReturn("testuser");
        when(securityContext.getAuthentication()).thenReturn(authentication);

        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User updatedUser = invocation.getArgument(0);
            updatedUser.setUsername("newusername");
            updatedUser.setPassword("encodedNewPassword");
            updatedUser.setCity("Los Angeles");
            updatedUser.setPhone("+123456789012");
            return updatedUser;
        });

        // When
        User result = authenticationService.updateUser(1L, updatedUserDto);

        // Then
        assertNotNull(result);
        assertEquals("newusername", result.getUsername());
        assertEquals("encodedNewPassword", result.getPassword());
        assertEquals("Los Angeles", result.getCity());
        assertEquals("+123456789012", result.getPhone());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateUser_UserNotFound() {
        // Given
        when(authentication.getName()).thenReturn("testuser");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        RegisterUserDto updatedUserDto = new RegisterUserDto("newusername", "newpassword", "newemail@example.com",
                "+123456789012", "Los Angeles");
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authenticationService.updateUser(1L, updatedUserDto));
        assertEquals("User with ID 1 not found.", exception.getMessage());
    }

    @Test
    void testUpdateUser_AccessDenied() {
        // Given
        RegisterUserDto updatedUserDto = new RegisterUserDto("newusername", "newpassword", "newemail@example.com",
                "+123456789012", "Los Angeles");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        when(authentication.getName()).thenReturn("anotheruser");
        when(SecurityContextHolder.getContext().getAuthentication()).thenReturn(authentication);

        // When & Then
        AccessDeniedException exception = assertThrows(AccessDeniedException.class,
                () -> authenticationService.updateUser(1L, updatedUserDto));
        assertEquals("You do not have permission to edit this account.", exception.getMessage());
    }

    @Test
    void testLogout() {
        // Given
        String token = "mockToken";

        // When
        authenticationService.logout(token);

        // Then
        verify(jwtService).invalidateToken(token);
    }

}
