package com.example.disaster_opportunity_engine.dto;

public record EngineResponse(
        Integer ideaId,
        String startupTitle,
        String startupDescription,
        String sourceNewsTitle,
        String problem,
        String solution,
        String impactLevel
) {
}