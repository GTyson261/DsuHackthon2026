package com.example.disaster_opportunity_engine.repository;

import com.example.disaster_opportunity_engine.model.StartupIdea;
import com.example.disaster_opportunity_engine.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StartupRepository extends JpaRepository<StartupIdea, Integer> {
    List<StartupIdea> findByUser(User user);
}