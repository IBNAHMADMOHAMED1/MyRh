package io.rh.myrh.dto;

import io.rh.myrh.entity.Offer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OfferResponse {
    private String message;
    private Boolean success;
    private Offer data;
}
