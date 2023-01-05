package io.rh.myrh.service.agent;

import io.rh.myrh.entity.Agent;
import io.rh.myrh.repository.AgentRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional // (readOnly = true)
public class AgentServiceImp implements AgentService {
    @Autowired
    private AgentRepo agentRepo;


    @Override
    public Agent login(String email) {
        return null;
    }
}
