package io.rh.myrh.dto;

import io.rh.myrh.entity.Offer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OffersResponse {
    private String message;
    private Boolean success;
    private Page<Offer> data;
}
