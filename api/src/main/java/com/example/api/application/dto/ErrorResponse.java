package com.example.api.application.dto;

import lombok.Data;

@Data
public class ErrorResponse {
    private String message;
    private int status;
    private String timesTamp;

    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
        this.timesTamp = java.time.LocalDateTime.now().toString();
    }
}
