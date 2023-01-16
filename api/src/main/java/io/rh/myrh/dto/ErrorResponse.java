package io.rh.myrh.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
    private String message;
    private Boolean success;
}