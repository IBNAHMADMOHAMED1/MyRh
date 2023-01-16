package io.rh.myrh.dto;

import io.rh.myrh.entity.Company;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@Setter
@Getter
@RequiredArgsConstructor
public class OfferDto {
    private String uid;
    private String title;
    private String description;
    private String domain;
    private String salary;
    private String education_level;
    private Company company;
    private String location;
}
/*
    {
        "uid": "offer-1",
        "title": "Software Engineer",
        "description": "We are looking for a software engineer",
        "domain": "IT",
        "salary": "1000",
        "education_level": "Bachelor",
        "company_id": "company-1"
    }
 */
