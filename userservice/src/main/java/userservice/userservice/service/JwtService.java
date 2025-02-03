package userservice.userservice.service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;

public interface JwtService {

    public void invalidateToken(String token);

    public String extractUsername(String token);

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    public String generateToken(UserDetails userDetails);

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

    public long getExpirationTime();

    public String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration);

    public boolean isTokenValid(String token, UserDetails userDetails);

    public boolean isTokenExpired(String token);

    public Date extractExpiration(String token);

    public Claims extractAllClaims(String token);

    public Key getSignInKey();

    public List<String> extractRoles(String token);

}
