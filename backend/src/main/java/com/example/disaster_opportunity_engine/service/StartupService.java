package com.example.disaster_opportunity_engine.service;

import com.example.disaster_opportunity_engine.model.News;
import com.example.disaster_opportunity_engine.model.StartupIdea;
import com.example.disaster_opportunity_engine.model.User;
import com.example.disaster_opportunity_engine.repository.StartupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StartupService {

    private final StartupRepository startupRepository;

    public StartupService(StartupRepository startupRepository) {
        this.startupRepository = startupRepository;
    }

    public StartupIdea createIdea(String title, String description, User user, News news) {
        StartupIdea idea = new StartupIdea();
        idea.setTitle(title);
        idea.setDescription(description);
        idea.setStatus("CREATED");
        idea.setUser(user);
        idea.setNews(news);
        return startupRepository.save(idea);
    }

    public List<StartupIdea> getDashboardIdeas(User user) {
        return startupRepository.findByUser(user);
    }

    public StartupIdea getIdeaById(Integer id) {
        return startupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Startup idea not found."));
    }

    public StartupIdea updateIdea(Integer id, String title, String description) {
        StartupIdea idea = getIdeaById(id);
        idea.setTitle(title);
        idea.setDescription(description);
        idea.setStatus("UPDATED");
        return startupRepository.save(idea);
    }
}