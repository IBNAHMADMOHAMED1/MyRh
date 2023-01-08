package io.rh.myrh.exeptions;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;
@ControllerAdvice
public class MyAuthenticationFailureHandler implements AuthenticationEntryPoint {
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // create a ResponseEntity with a BAD_REQUEST status code
        ResponseEntity<String> responseEntity = new ResponseEntity<>("Invalid username or password", HttpStatus.BAD_REQUEST);
        // write the response entity to the response
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write(responseEntity.getBody());
    }
}
