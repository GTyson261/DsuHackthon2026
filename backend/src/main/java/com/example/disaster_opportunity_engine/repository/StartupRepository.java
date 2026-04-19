package com.example.disaster_opportunity_engine.repository;

import com.example.disaster_opportunity_engine.model.StartupIdea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StartupRepository extends JpaRepository<StartupIdea, Integer> {
    List<StartupIdea> findByUserId(Integer userId);
}