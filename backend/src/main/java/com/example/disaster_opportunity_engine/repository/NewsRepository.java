package com.example.disaster_opportunity_engine.repository;

import com.example.disaster_opportunity_engine.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Integer> {
}