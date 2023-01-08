package io.rh.myrh.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Source;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@PropertySource("classpath:application.properties")
@Getter @Setter
public class JwtProvider {
    // get key from application.properties
    private String token;
    @Value("${JWT_SECRET_KEY}")
    private static final String SECRET_KEY = "6B58703273357638792F423F4428472B4B6250655368566D597133743677397A";
    public String extrcatUsername(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);// return email
    }

    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }
    public String generateToken(UserDetails userDetails, Object o,String who) {
        return createToken(
                new HashMap<>(Map.of("who", who)),
                userDetails,
                o
        );
    }

    public String createToken(Map<String, Object> claims, UserDetails userDetails, Object... args) {
        claims.put("roles", userDetails.getAuthorities());
        String who = (String) claims.get("who");
        claims.put("content", args);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .setAudience(who)
                .compact();
    }

    public boolean validateToken(String jwtToken, UserDetails userDetails) {
        final String username = extrcatUsername(jwtToken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken));
    }
    public boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }
    public Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    private Claims extractAllClaims(String jwtToken) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }
    private Key getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes); //  hmacShaKeyFor for HS256 algorithm
    }

    public String getWhoWantToLogin() {
        return extractClaim(getToken(), Claims::getAudience);
    }
}
