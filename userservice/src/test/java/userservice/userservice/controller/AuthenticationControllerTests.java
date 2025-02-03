package userservice.userservice.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import userservice.userservice.model.Role;
import userservice.userservice.model.RoleEnum;
import userservice.userservice.model.User;
import userservice.userservice.model.inputDto.LoginResponse;
import userservice.userservice.model.inputDto.LoginUserDto;
import userservice.userservice.model.inputDto.RegisterUserDto;
import userservice.userservice.service.AuthenticationService;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTests {

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @Autowired
    private MockMvc mockMvc;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(authenticationController)
                .build();

        mockUser = User.builder()
                .id(1L)
                .username("testuser")
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
    void shouldRegisterUserSuccessfully() throws Exception {
        // Given
        RegisterUserDto registerUserDto = new RegisterUserDto("testUser", "password", "test@example.com", "123456789",
                "New York");
        mockUser.setUsername("testUser");
        when(authenticationService.signup(registerUserDto)).thenReturn(mockUser);

        // When
        MvcResult result = mockMvc.perform(post("/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        "{\"username\": \"testUser\", \"password\": \"password\", \"email\": \"test@example.com\", \"city\": \"New York\", \"phone\": \"123456789\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"))
                .andReturn();

        // Then
        String content = result.getResponse().getContentAsString();
        System.out.println("Response content: " + content);
    }

    @Test
    void shouldAuthenticateUserSuccessfully() throws Exception {
        // Given
        LoginUserDto loginUserDto = new LoginUserDto("testUser", "password");
        when(authenticationService.token(loginUserDto)).thenReturn(new LoginResponse("mock_token", 1L));

        // When
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"testUser\", \"password\": \"password\"}"))

                // Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mock_token"));
    }

    @Test
    void shouldLogoutUserSuccessfully() throws Exception {
        // Given
        String token = "mock_token";
        doNothing().when(authenticationService).logout(token);

        // When
        mockMvc.perform(post("/auth/logout")
                .header("Authorization", "Bearer " + token))

                // Then
                .andExpect(status().isOk())
                .andExpect(content().string("User successfully logged out"));
    }

    @Test
    void shouldUpdateUserSuccessfully() throws Exception {
        // Given
        Long userId = 1L;
        mockUser.setId(userId);
        when(authenticationService.updateUser(eq(userId), any(RegisterUserDto.class))).thenReturn(mockUser);

        // When
        mockMvc.perform(put("/auth/users/{id}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        "{\"username\": \"updatedUser\", \"password\": \"newpassword\", \"email\": \"updated@example.com\", \"phone\": \"987654321\", \"city\": \"New York\"}")
                .header("Authorization", "Bearer mock_token"))

                // Then
                .andExpect(status().isOk())
                .andExpect(content().string("User successfully logged out"));
    }

}
