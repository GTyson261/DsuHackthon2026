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
        if (user == null || user.getId() == null) {
            throw new RuntimeException("Valid user is required to create an idea.");
        }
        if (news == null || news.getId() == null) {
            throw new RuntimeException("Valid news record is required to create an idea.");
        }

        StartupIdea idea = new StartupIdea();
        idea.setTitle(title);
        idea.setDescription(description);
        idea.setStatus("CREATED");
        idea.setUser(user);
        idea.setNews(news);

        return startupRepository.save(idea);
    }

    public List<StartupIdea> getDashboardIdeas(Integer userId) {
        return startupRepository.findByUserId(userId);
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

    public void deleteIdea(Integer id) {
        StartupIdea idea = getIdeaById(id);
        startupRepository.delete(idea);
    }
}