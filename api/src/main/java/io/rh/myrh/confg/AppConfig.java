package io.rh.myrh.confg;

import io.rh.myrh.provider.JwtProvider;
import io.rh.myrh.repository.AgentRepo;
import io.rh.myrh.repository.CompanyRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AppConfig {
    private final AgentRepo agentRepo;
    private final CompanyRepo companyRepo;
    private final JwtProvider jwtProvider;
    private String whoWantToLogin;

    public String getWhoWantToLogin() {
        return whoWantToLogin;
    }
    public void setWhoWantToLogin(String who) {
        this.whoWantToLogin = who;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            if (getWhoWantToLogin() == null)
            {
                String who = jwtProvider.getWhoWantToLogin();
                if (who != null) setWhoWantToLogin(who);
            }
            if (getWhoWantToLogin().equals("agent")) {
                return agentRepo.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("Agent not found"));
            } else if (getWhoWantToLogin().equals("company")) {
                return companyRepo.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("Company not found"));
            } else {
                return null;
            }
        };
    }
    /*
     */

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
