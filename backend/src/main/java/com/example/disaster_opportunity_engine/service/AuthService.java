package com.example.disaster_opportunity_engine.service;

import com.example.disaster_opportunity_engine.model.User;
import com.example.disaster_opportunity_engine.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String username, String password) {
        Optional<User> existing = userRepository.findByUsername(username);

        if (existing.isPresent()) {
            throw new RuntimeException("Username already exists.");
        }

        User user = new User(username, password);
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password.");
        }

        return user;
    }
}