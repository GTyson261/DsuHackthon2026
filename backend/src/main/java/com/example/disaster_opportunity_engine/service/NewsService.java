package com.example.disaster_opportunity_engine.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Service
public class NewsService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${news.api.key}")
    private String newsApiKey;

    public NewsService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public NewsArticle fetchTopDisasterArticle() {
        if (newsApiKey == null || newsApiKey.isBlank()) {
            throw new RuntimeException("NEWS_API_KEY is missing.");
        }

        String url = UriComponentsBuilder
                .fromHttpUrl("https://newsapi.org/v2/everything")
                .queryParam("q", "disaster OR earthquake OR flood OR wildfire OR hurricane")
                .queryParam("language", "en")
                .queryParam("sortBy", "publishedAt")
                .queryParam("pageSize", 1)
                .queryParam("apiKey", newsApiKey)
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to fetch news from News API.");
        }

        try {
            JsonNode root = objectMapper.readTree(response.getBody());

            if (!"ok".equalsIgnoreCase(root.path("status").asText())) {
                throw new RuntimeException("News API error: " + root.path("message").asText("Unknown error"));
            }

            JsonNode articles = root.path("articles");

            if (!articles.isArray() || articles.isEmpty()) {
                return null;
            }

            JsonNode first = articles.get(0);

            String title = first.path("title").asText("");
            String description = first.path("description").asText("");
            String source = first.path("source").path("name").asText("");
            String articleUrl = first.path("url").asText("");
            String publishedAtRaw = first.path("publishedAt").asText("");

            LocalDateTime publishedAt = null;
            if (!publishedAtRaw.isBlank()) {
                publishedAt = OffsetDateTime.parse(publishedAtRaw).toLocalDateTime();
            }

            return new NewsArticle(title, description, source, articleUrl, publishedAt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse news response.", e);
        }
    }

    public record NewsArticle(
            String title,
            String description,
            String source,
            String url,
            LocalDateTime publishedAt
    ) {
    }
}