package com.example.disaster_opportunity_engine.controller;

import com.example.disaster_opportunity_engine.dto.EngineResponse;
import com.example.disaster_opportunity_engine.engine.DisasterOpportunityEngine;
import com.example.disaster_opportunity_engine.model.StartupIdea;
import com.example.disaster_opportunity_engine.service.StartupService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/startups")
public class StartupController {

    private final StartupService startupService;
    private final DisasterOpportunityEngine engine;

    public StartupController(StartupService startupService, DisasterOpportunityEngine engine) {
        this.startupService = startupService;
        this.engine = engine;
    }

    @PostMapping("/generate")
    public EngineResponse generateStartup(@RequestParam Integer userId) {
        return engine.run(userId);
    }

    @GetMapping("/{id}")
    public StartupIdea viewStartup(@PathVariable Integer id) {
        return startupService.getIdeaById(id);
    }

    @PutMapping("/edit/{id}")
    public StartupIdea editStartup(
            @PathVariable Integer id,
            @RequestParam String title,
            @RequestParam String description
    ) {
        return startupService.updateIdea(id, title, description);
    }
}