package com.example.disaster_opportunity_engine.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "idea_history")
public class IdeaHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idea_id", nullable = false)
    private StartupIdea idea;

    @Column(name = "action_type", length = 50)
    private String actionType;

    @Column(name = "changed_at", insertable = false, updatable = false)
    private LocalDateTime changedAt;

    public IdeaHistory() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StartupIdea getIdea() {
        return idea;
    }

    public void setIdea(StartupIdea idea) {
        this.idea = idea;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }
}