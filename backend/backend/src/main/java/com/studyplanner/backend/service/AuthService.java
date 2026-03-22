package com.studyplanner.backend.service;

import com.studyplanner.backend.dto.AuthDto;
import com.studyplanner.backend.model.User;
import com.studyplanner.backend.repository.UserRepository;
import com.studyplanner.backend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest registerRequest) {
        //Check if username or email already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already in use");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        user =  userRepository.save(user);

        //Generate JWT and return it
        String token = jwtUtil.generateToken(user.getUsername());
        return  new AuthDto.AuthResponse(token, user.getUsername(),user.getId());

    }

    public AuthDto.AuthResponse login(AuthDto.LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()));

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Username not found"));

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthDto.AuthResponse(token, user.getUsername(),user.getId());
    }
}
