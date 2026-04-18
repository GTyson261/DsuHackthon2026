package com.example.disaster_opportunity_engine.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AIService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    public AIService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public AIResult generateStartupIdea(NewsService.NewsArticle article) {
        String prompt = """
                You are a startup innovation assistant.
                Based on the disaster news below, generate one practical startup idea.

                Return ONLY valid JSON with this exact shape:
                {
                  "title": "string",
                  "startupDescription": "string",
                  "problem": "string",
                  "solution": "string",
                  "impactLevel": "LOW or MEDIUM or HIGH"
                }

                News Title: %s
                News Description: %s
                News Source: %s
                """.formatted(
                safe(article.title()),
                safe(article.description()),
                safe(article.source())
        );

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", new Object[]{
                        Map.of("role", "system", "content", "You generate concise startup ideas in strict JSON."),
                        Map.of("role", "user", "content", prompt)
                },
                "temperature", 0.7
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(openAiApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://api.openai.com/v1/chat/completions",
                HttpMethod.POST,
                request,
                String.class
        );

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to generate startup idea from OpenAI.");
        }

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String content = root.path("choices").get(0).path("message").path("content").asText();

            JsonNode aiJson = objectMapper.readTree(content);

            return new AIResult(
                    aiJson.path("title").asText("Generated Startup Idea"),
                    aiJson.path("startupDescription").asText("No description provided."),
                    aiJson.path("problem").asText("No problem provided."),
                    aiJson.path("solution").asText("No solution provided."),
                    aiJson.path("impactLevel").asText("MEDIUM")
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse OpenAI response.", e);
        }
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }

    public record AIResult(
            String title,
            String startupDescription,
            String problem,
            String solution,
            String impactLevel
    ) {
    }
}