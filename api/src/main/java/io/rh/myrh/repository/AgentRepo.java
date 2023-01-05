package io.rh.myrh.repository;

import io.rh.myrh.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgentRepo extends JpaRepository<Agent, Long> {
    Optional<Agent> findByEmail(String email);
}
