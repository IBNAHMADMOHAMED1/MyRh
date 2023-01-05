package io.rh.myrh.service.agent;

import io.rh.myrh.entity.Agent;

import java.util.Optional;

public interface AgentService {
    Agent login(String email);
}
