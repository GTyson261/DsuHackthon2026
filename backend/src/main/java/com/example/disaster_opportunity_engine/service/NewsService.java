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
        try {
            if (newsApiKey == null || newsApiKey.isBlank()) {
                return fallbackArticle("Missing NEWS_API_KEY.");
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
                return fallbackArticle("News API request failed.");
            }

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode articles = root.path("articles");

            if (articles.isArray() && !articles.isEmpty()) {
                JsonNode first = articles.get(0);

                String title = first.path("title").asText("Untitled disaster article");
                String description = first.path("description").asText("No description available.");
                String source = first.path("source").path("name").asText("Unknown source");
                String articleUrl = first.path("url").asText("https://example.com");
                String publishedAtRaw = first.path("publishedAt").asText("");

                LocalDateTime publishedAt = LocalDateTime.now();
                if (!publishedAtRaw.isBlank()) {
                    try {
                        publishedAt = OffsetDateTime.parse(publishedAtRaw).toLocalDateTime();
                    } catch (Exception ignored) {
                        publishedAt = LocalDateTime.now();
                    }
                }

                return new NewsArticle(
                        title,
                        description,
                        source,
                        articleUrl,
                        publishedAt
                );
            }

            return fallbackArticle("No disaster articles returned by News API.");

        } catch (Exception e) {
            e.printStackTrace();
            return fallbackArticle("Exception while fetching news.");
        }
    }

    private NewsArticle fallbackArticle(String reason) {
        return new NewsArticle(
                "Demo Disaster: Flood Crisis",
                "Heavy flooding has impacted thousands. Fallback article used because: " + reason,
                "Fallback Source",
                "https://example.com",
                LocalDateTime.now()
        );
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