package userservice.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import userservice.userservice.model.User;
import userservice.userservice.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {

        user = User.builder()
                .id(1L)
                .username("testuser")
                .email("testuser@example.com")
                .phone("1234567890")
                .build();

        SecurityContextHolder.clearContext();
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetAllUsers() {
        // Given
        Page<User> userPage = new PageImpl<>(List.of(user));
        when(userRepository.findAll(PageRequest.of(0, 10))).thenReturn(userPage);

        // When
        Page<User> result = userService.getAllUsers(0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(userRepository, times(1)).findAll(PageRequest.of(0, 10));
    }

    @Test
    void testGetUserById() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // When
        User result = userService.getUserById(1L).orElse(null);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void testGetUserById_NotFound() {
        // Given
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.getUserById(99L));
        assertEquals("User with id 99 not found", exception.getMessage());
    }

    @Test
    void testGetUserByUsername() {
        // Given
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        // When
        User result = userService.getUserByUsername("testuser").orElse(null);

        // Then
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
    }

    @Test
    void testGetUserByUsername_NotFound() {
        // Given
        when(userRepository.findByUsername("nonexistentuser")).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.getUserByUsername("nonexistentuser"));
        assertEquals("User with username nonexistentuser not found", exception.getMessage());
    }

    @Test
    void testCreateUser() {
        // Given
        when(userRepository.save(user)).thenReturn(user);

        // When
        userService.save(user);

        // Then
        verify(userRepository).save(user);
    }

    @Test
    void testExistsByUsername() {
        // Given
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        // When
        boolean result = userService.existsByUsername("testuser");

        // Then
        assertTrue(result);
        verify(userRepository, times(1)).existsByUsername("testuser");
    }

    @Test
    void testExistsByEmail() {
        // Given
        when(userRepository.existsByEmail("testuser@example.com")).thenReturn(true);

        // When
        boolean result = userService.existsByEmail("testuser@example.com");

        // Then
        assertTrue(result);
        verify(userRepository, times(1)).existsByEmail("testuser@example.com");
    }

    @Test
    void testGetCurrentUsername() {
        // Given
        when(authentication.getName()).thenReturn("testuser");
        when(authentication.isAuthenticated()).thenReturn(true);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        // When
        String result = userService.getCurrentUsername();

        // Then
        assertEquals("testuser", result);
    }

    @Test
    void testGetUsersData() {
        // Given
        Map<String, Object> senderData = new HashMap<>();
        senderData.put("nameOfTheQuestioner", "testuser");
        senderData.put("offerOwner", "testowner");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(user));

        // When
        Map<String, Object> result = userService.getUsersData(senderData);

        // Then
        assertNotNull(result);
        assertTrue(result.containsKey("emailOfTheQuestioner"));
        assertTrue(result.containsKey("offerOwnerEmail"));
    }

    @Test
    void testDeleteUserById() {
        // Given
        when(userRepository.existsById(1L)).thenReturn(true);

        // When
        boolean result = userService.deleteUserById(1L);

        // Then
        assertTrue(result);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void testDeleteUserById_NotFound() {
        // Given
        when(userRepository.existsById(99L)).thenReturn(false);

        // When
        boolean result = userService.deleteUserById(99L);

        // Then
        assertFalse(result);
    }

}
