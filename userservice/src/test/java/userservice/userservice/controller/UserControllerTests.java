package userservice.userservice.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import userservice.userservice.model.Role;
import userservice.userservice.model.RoleEnum;
import userservice.userservice.model.User;
import userservice.userservice.service.UserService;

@ExtendWith(MockitoExtension.class)
class UserControllerTests {

    @Mock
    private UserService userService;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private UserController userController;

    @Autowired
    private MockMvc mockMvc;

    private User user;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(userController)
                .setMessageConverters(new MappingJackson2HttpMessageConverter())
                .build();

        user = User.builder()
                .id(1L)
                .username("testUser")
                .password("password")
                .email("testuser@example.com")
                .phone("+123456789012")
                .city("New York")
                .role(new Role(1, RoleEnum.USER))
                .updatedAt(LocalDateTime.now())
                .build();

        SecurityContextHolder.setContext(securityContext);
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken("testUser",
                "password", AuthorityUtils.createAuthorityList("ROLE_USER")));
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldReturnAuthenticatedUser() throws Exception {
        // Given
        User mockUser = mock(User.class);
        when(mockUser.getUsername()).thenReturn("testUser");
        when(mockUser.getEmail()).thenReturn("test@example.com");
        when(authentication.getPrincipal()).thenReturn(mockUser);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // When
        mockMvc.perform(get("/users/me"))

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"))
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldReturnAllUsers() throws Exception {
        // Given
        PageImpl<User> page = new PageImpl<>(Collections.singletonList(user), PageRequest.of(0, 10), 1);
        when(userService.getAllUsers(0, 10)).thenReturn(page);

        // When
        mockMvc.perform(get("/users/page")
                .param("page", "0")
                .param("size", "10"))

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].username").value("testUser"));
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldReturnUserById() throws Exception {
        // Given
        when(userService.getUserById(1L)).thenReturn(java.util.Optional.of(user));

        // When
        mockMvc.perform(get("/users/{id}", 1L))

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("testUser"));
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldReturnUserByUsername() throws Exception {
        // Given
        when(userService.getUserByUsername("testUser")).thenReturn(java.util.Optional.of(user));

        // When
        mockMvc.perform(get("/users/username/{username}", "testUser"))

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"))
                .andExpect(jsonPath("$.email").value("testuser@example.com"));
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldReturnUserByEmail() throws Exception {
        // Given
        when(userService.getUserByEmail("testuser@example.com")).thenReturn(java.util.Optional.of(user));

        // When
        mockMvc.perform(get("/users/email/{email}", "testuser@example.com"))

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("testuser@example.com"))
                .andExpect(jsonPath("$.username").value("testUser"));
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldDeleteUser() throws Exception {
        // Given
        when(userService.deleteUserById(1L)).thenReturn(true);

        // When
        mockMvc.perform(delete("/users/{id}", 1L))

                // Then
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser(username = "user", roles = { "USER" })
    void shouldDeleteAuthenticatedUser() throws Exception {
        // Given
        User mockUser = mock(User.class);
        when(mockUser.getId()).thenReturn(1L);
        when(authentication.getPrincipal()).thenReturn(mockUser);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        when(userService.deleteUserById(1L)).thenReturn(true);

        // When
        mockMvc.perform(delete("/users/me"))

                // Then
                .andExpect(status().isNoContent());
    }

}
