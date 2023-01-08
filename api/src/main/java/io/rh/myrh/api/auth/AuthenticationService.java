package io.rh.myrh.api.auth;

import io.rh.myrh.confg.AppConfig;
import io.rh.myrh.dto.AuthenticationRequest;
import io.rh.myrh.dto.AuthenticationResponse;
import io.rh.myrh.dto.RegisterRequest;
import io.rh.myrh.entity.Agent;
import io.rh.myrh.entity.Company;
import io.rh.myrh.entity.Role;
import io.rh.myrh.provider.CloudinaryProvider;
import io.rh.myrh.provider.JwtProvider;
import io.rh.myrh.repository.AgentRepo;
import io.rh.myrh.repository.CompanyRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
       private final AgentRepo agentRepo;
       private final PasswordEncoder passwordEncoder;
       private final JwtProvider jwtProvider;
       private final CompanyRepo companyRepo;
       private final CloudinaryProvider cloudinaryProvider;
       private final AuthenticationManager authenticationManager;
       private final AppConfig appConfig;
        public AuthenticationResponse register(RegisterRequest request) {
            var  company = new Company();
            company.setUid(generateUid(request.getName()));
            company.setName(request.getName());
            company.setAddress(request.getAddress());
            company.setDescription(request.getDescription());
            company.setPhoneNo(request.getPhoneNumber());
            company.setEmail(request.getEmail());
            company.setPassword(passwordEncoder.encode(request.getPassword()));
            MultipartFile file = request.getImage();
            String url = cloudinaryProvider.uploadImage(file);
            company.setImageUri(url);
            company.setRole(Role.ROLE_COMPANY);
            companyRepo.save(company);
            var user = new User(company.getEmail(), company.getPassword(), company.getAuthorities());
            var token = jwtProvider.generateToken(user, company,"company");
            return  AuthenticationResponse.builder()
                    .token(token)
                    .build();
        }
    private String generateUid(String name) {
            int random = (int)(Math.random() * 900) + 100;
            return "COMP -" + random + "-" + name;
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        appConfig.setWhoWantToLogin(request.getWho());
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        Object o = null;
        User user = null;
        if (request.getWho().equals("agent")) {
            Agent agent = agentRepo.findByEmail(request.getEmail()).orElseThrow();
            user = new User(agent.getEmail(), agent.getPassword(), agent.getAuthorities());
            o = agent;
        } else if (request.getWho().equals("company")) {
            Company company = companyRepo.findByEmail(request.getEmail()).orElseThrow();
            user = new User(company.getEmail(), company.getPassword(), company.getAuthorities());
            o = company;
        }
        var token = jwtProvider.generateToken(user, o, request.getWho());
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
}

