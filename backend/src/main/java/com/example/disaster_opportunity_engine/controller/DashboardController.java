package com.example.disaster_opportunity_engine.controller;

import com.example.disaster_opportunity_engine.model.StartupIdea;
import com.example.disaster_opportunity_engine.model.User;
import com.example.disaster_opportunity_engine.service.StartupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final StartupService startupService;

    public DashboardController(StartupService startupService) {
        this.startupService = startupService;
    }

    @GetMapping("/{userId}")
    public List<StartupIdea> getDashboard(@PathVariable Integer userId) {
        User user = new User();
        user.setId(userId);
        return startupService.getDashboardIdeas(user);
    }
}