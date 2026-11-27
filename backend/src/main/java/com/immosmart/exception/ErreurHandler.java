package com.immosmart.exception;

import java.util.Map;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Toutes les erreurs sortent en JSON : {"error": "..."}
@RestControllerAdvice
public class ErreurHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> api(ApiException e) {
        return ResponseEntity.status(e.getStatus()).body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, Object>> bdd(DataAccessException e) {
        return ResponseEntity.status(500).body(Map.of("error", "Erreur BDD : " + e.getMostSpecificCause().getMessage()));
    }
}
