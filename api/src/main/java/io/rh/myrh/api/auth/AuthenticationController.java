package io.rh.myrh.api.auth;

import io.rh.myrh.dto.AuthenticationRequest;
import io.rh.myrh.dto.AuthenticationResponse;
import io.rh.myrh.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/public/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*" )
    @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<AuthenticationResponse> register(@RequestPart("data") RegisterRequest request, @RequestPart("image") MultipartFile image) {
        return ResponseEntity.ok(authenticationService.register(request, image));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println(request.getPassword());
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

}
