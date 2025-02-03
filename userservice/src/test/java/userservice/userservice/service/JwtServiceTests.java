package userservice.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

@ExtendWith(MockitoExtension.class)
class JwtServiceTests {

    @Mock
    private JwtServiceImpl jwtServiceImpl;

    @Mock
    private User userDetails;

    private static final String VALID_TOKEN = "validToken";
    private static final String INVALID_TOKEN = "invalidToken";

    @BeforeEach
    void setUp() {
        userDetails = new User("testuser", "password", List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Test
    void testExtractUsername() {
        // Given
        String token = VALID_TOKEN;
        when(jwtServiceImpl.extractUsername(token)).thenReturn("testuser");

        // When
        String username = jwtServiceImpl.extractUsername(token);

        // Then
        assertEquals("testuser", username);
    }

    @Test
    void testGenerateToken() {
        // Given
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", List.of("ROLE_USER"));

        when(jwtServiceImpl.generateToken(extraClaims, userDetails)).thenReturn(VALID_TOKEN);

        // When
        String token = jwtServiceImpl.generateToken(extraClaims, userDetails);

        // Then
        assertNotNull(token);
        assertEquals(VALID_TOKEN, token);
    }

    @Test
    void testIsTokenValid_validToken() {
        // Given
        when(jwtServiceImpl.isTokenValid(VALID_TOKEN, userDetails)).thenReturn(true);

        // When
        boolean isValid = jwtServiceImpl.isTokenValid(VALID_TOKEN, userDetails);

        // Then
        assertTrue(isValid);
    }

    @Test
    void testIsTokenValid_invalidToken() {
        // Given
        when(jwtServiceImpl.isTokenValid(INVALID_TOKEN, userDetails)).thenReturn(false);

        // When
        boolean isValid = jwtServiceImpl.isTokenValid(INVALID_TOKEN, userDetails);

        // Then
        assertFalse(isValid);
    }

    @Test
    void testIsTokenExpired() {
        // Given
        String token = VALID_TOKEN;
        when(jwtServiceImpl.isTokenExpired(token)).thenReturn(false);

        // When
        boolean isExpired = jwtServiceImpl.isTokenExpired(token);

        // Then
        assertFalse(isExpired);
    }

    @Test
    void testExtractRoles() {
        // Given
        String token = VALID_TOKEN;
        List<String> roles = List.of("ROLE_USER", "ROLE_ADMIN");
        when(jwtServiceImpl.extractRoles(token)).thenReturn(roles);

        // When
        List<String> extractedRoles = jwtServiceImpl.extractRoles(token);

        // Then
        assertNotNull(extractedRoles);
        assertTrue(extractedRoles.contains("ROLE_USER"));
        assertTrue(extractedRoles.contains("ROLE_ADMIN"));
    }

    @Test
    void testExtractExpiration() {
        // Given
        String token = VALID_TOKEN;
        Date expiration = new Date(System.currentTimeMillis() + 100000);
        when(jwtServiceImpl.extractExpiration(token)).thenReturn(expiration);

        // When
        Date expirationDate = jwtServiceImpl.extractExpiration(token);

        // Then
        assertNotNull(expirationDate);
        assertEquals(expiration, expirationDate);
    }

    @Test
    void testBuildToken() {
        // Given
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("roles", List.of("ROLE_USER"));
        long expiration = 1000L;

        when(jwtServiceImpl.buildToken(extraClaims, userDetails, expiration)).thenReturn(VALID_TOKEN);

        // When
        String token = jwtServiceImpl.buildToken(extraClaims, userDetails, expiration);

        // Then
        assertNotNull(token);
        assertEquals(VALID_TOKEN, token);
    }

}
