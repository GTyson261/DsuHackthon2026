package com.example.disaster_opportunity_engine.engine;

import com.example.disaster_opportunity_engine.dto.EngineResponse;
import com.example.disaster_opportunity_engine.model.AIInsight;
import com.example.disaster_opportunity_engine.model.IdeaHistory;
import com.example.disaster_opportunity_engine.model.News;
import com.example.disaster_opportunity_engine.model.StartupIdea;
import com.example.disaster_opportunity_engine.model.User;
import com.example.disaster_opportunity_engine.repository.AIInsightRepository;
import com.example.disaster_opportunity_engine.repository.IdeaHistoryRepository;
import com.example.disaster_opportunity_engine.repository.NewsRepository;
import com.example.disaster_opportunity_engine.repository.UserRepository;
import com.example.disaster_opportunity_engine.service.AIService;
import com.example.disaster_opportunity_engine.service.NewsService;
import com.example.disaster_opportunity_engine.service.StartupService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DisasterOpportunityEngine {

    private final NewsService newsService;
    private final AIService aiService;
    private final StartupService startupService;
    private final NewsRepository newsRepository;
    private final AIInsightRepository aiInsightRepository;
    private final IdeaHistoryRepository ideaHistoryRepository;
    private final UserRepository userRepository;

    public DisasterOpportunityEngine(
            NewsService newsService,
            AIService aiService,
            StartupService startupService,
            NewsRepository newsRepository,
            AIInsightRepository aiInsightRepository,
            IdeaHistoryRepository ideaHistoryRepository,
            UserRepository userRepository
    ) {
        this.newsService = newsService;
        this.aiService = aiService;
        this.startupService = startupService;
        this.newsRepository = newsRepository;
        this.aiInsightRepository = aiInsightRepository;
        this.ideaHistoryRepository = ideaHistoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public EngineResponse run(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        NewsService.NewsArticle article = newsService.fetchTopDisasterArticle();
        if (article == null) {
            throw new RuntimeException("No disaster news article found.");
        }

        News savedNews = new News();
        savedNews.setTitle(article.title());
        savedNews.setDescription(article.description());
        savedNews.setSource(article.source());
        savedNews.setUrl(article.url());
        savedNews.setPublishedAt(article.publishedAt());
        savedNews = newsRepository.save(savedNews);

        AIService.AIResult aiResult = aiService.generateStartupIdea(article);

        StartupIdea startupIdea = startupService.createIdea(
                aiResult.title(),
                aiResult.startupDescription(),
                user,
                savedNews
        );

        AIInsight insight = new AIInsight();
        insight.setProblem(aiResult.problem());
        insight.setSolution(aiResult.solution());
        insight.setImpactLevel(aiResult.impactLevel());
        insight.setIdea(startupIdea);
        AIInsight savedInsight = aiInsightRepository.save(insight);

        IdeaHistory history = new IdeaHistory();
        history.setIdea(startupIdea);
        history.setActionType("CREATED");
        ideaHistoryRepository.save(history);

        return new EngineResponse(
                startupIdea.getId(),
                startupIdea.getTitle(),
                startupIdea.getDescription(),
                savedNews.getTitle(),
                savedInsight.getProblem(),
                savedInsight.getSolution(),
                savedInsight.getImpactLevel()
        );
    }
}