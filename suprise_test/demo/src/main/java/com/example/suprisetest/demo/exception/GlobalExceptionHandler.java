package com.example.suprisetest.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> response = new HashMap<>();

        String message = ex.getMessage();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        // Handle specific error types
        if (message.contains("Unauthorized") || message.contains("Invalid token")
            || message.contains("Missing or invalid Authorization")) {
            status = HttpStatus.UNAUTHORIZED;
            response.put("message", "Unauthorized: " + message);
        } else if (message.contains("not found")) {
            status = HttpStatus.NOT_FOUND;
            response.put("message", "Not Found: " + message);
        } else if (message.contains("already exists")) {
            status = HttpStatus.CONFLICT;
            response.put("message", "Conflict: " + message);
        } else if (message.contains("Only admins")) {
            status = HttpStatus.FORBIDDEN;
            response.put("message", "Forbidden: " + message);
        } else {
            response.put("message", message);
        }

        response.put("status", status.value());
        response.put("error", status.getReasonPhrase());

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(Exception ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Internal Server Error");
        response.put("message", ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
