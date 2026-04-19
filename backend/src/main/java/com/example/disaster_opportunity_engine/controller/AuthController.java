package com.example.disaster_opportunity_engine.controller;

import com.example.disaster_opportunity_engine.model.User;
import com.example.disaster_opportunity_engine.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public User signup(@RequestParam String username, @RequestParam String password) {
        return authService.registerUser(username, password);
    }

    @PostMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password) {
        return authService.loginUser(username, password);
    }
}