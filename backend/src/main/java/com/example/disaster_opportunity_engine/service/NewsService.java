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
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

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

            String query = String.join(" OR ",
                    "disaster",
                    "earthquake",
                    "flood",
                    "wildfire",
                    "hurricane",
                    "tornado",
                    "storm",
                    "heatwave",
                    "drought",
                    "landslide",
                    "evacuation",
                    "outbreak"
            );

            String url = UriComponentsBuilder
                    .fromHttpUrl("https://newsapi.org/v2/everything")
                    .queryParam("q", query)
                    .queryParam("language", "en")
                    .queryParam("sortBy", "publishedAt")
                    .queryParam("pageSize", 10)
                    .queryParam("apiKey", newsApiKey)
                    .toUriString();

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                return fallbackArticle("News API request failed.");
            }

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode articles = root.path("articles");

            if (articles.isArray() && !articles.isEmpty()) {
                JsonNode selected = pickBestArticle(articles);

                String title = selected.path("title").asText("Untitled live event article");
                String description = selected.path("description").asText("No description available.");
                String source = selected.path("source").path("name").asText("Unknown source");
                String articleUrl = selected.path("url").asText("https://example.com");
                String publishedAtRaw = selected.path("publishedAt").asText("");

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

            return fallbackArticle("No live event articles returned by News API.");

        } catch (Exception e) {
            e.printStackTrace();
            return fallbackArticle("Exception while fetching news.");
        }
    }

    private JsonNode pickBestArticle(JsonNode articles) {
        List<String> preferredKeywords = List.of(
                "earthquake",
                "wildfire",
                "hurricane",
                "tornado",
                "storm",
                "heatwave",
                "drought",
                "landslide",
                "outbreak",
                "evacuation",
                "flood",
                "disaster"
        );

        for (String keyword : preferredKeywords) {
            for (JsonNode article : articles) {
                String title = article.path("title").asText("").toLowerCase();
                String description = article.path("description").asText("").toLowerCase();

                if (title.contains(keyword) || description.contains(keyword)) {
                    return article;
                }
            }
        }

        return articles.get(0);
    }

    private NewsArticle fallbackArticle(String reason) {
        List<NewsArticle> fallbackArticles = List.of(
                new NewsArticle(
                        "Severe Storm Disrupts Regional Transportation",
                        "High winds and storm damage have delayed travel and strained local response systems. Fallback article used because: " + reason,
                        "Fallback Source",
                        "https://example.com",
                        LocalDateTime.now()
                ),
                new NewsArticle(
                        "Wildfire Smoke Raises Health and Logistics Concerns",
                        "Air quality issues and evacuations are affecting nearby communities and essential services. Fallback article used because: " + reason,
                        "Fallback Source",
                        "https://example.com",
                        LocalDateTime.now()
                ),
                new NewsArticle(
                        "Heatwave Pressures Energy and Public Safety Resources",
                        "Extreme temperatures are driving power demand and increasing health risks across the region. Fallback article used because: " + reason,
                        "Fallback Source",
                        "https://example.com",
                        LocalDateTime.now()
                ),
                new NewsArticle(
                        "Earthquake Recovery Efforts Highlight Coordination Gaps",
                        "Emergency teams are working to restore services and support affected residents after infrastructure damage. Fallback article used because: " + reason,
                        "Fallback Source",
                        "https://example.com",
                        LocalDateTime.now()
                )
        );

        int index = ThreadLocalRandom.current().nextInt(fallbackArticles.size());
        return fallbackArticles.get(index);
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