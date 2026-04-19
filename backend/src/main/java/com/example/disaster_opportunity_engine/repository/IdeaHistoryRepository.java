package com.example.disaster_opportunity_engine.repository;

import com.example.disaster_opportunity_engine.model.IdeaHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IdeaHistoryRepository extends JpaRepository<IdeaHistory, Integer> {
}