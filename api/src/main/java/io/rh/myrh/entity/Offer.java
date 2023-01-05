package io.rh.myrh.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String uid;
    String title;
    String description;
    String domain;
    String salary;
    String education_level;

    @ManyToOne
    @JoinColumn(name = "company_id")
    Company company;
}
