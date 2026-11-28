package com.immosmart.controller;

import com.immosmart.service.DatabaseHealthService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private final DatabaseHealthService healthService;

    @Value("${app.version:1.0.0}")
    private String appVersion;

    public HealthController(DatabaseHealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        if (healthService.isDatabaseUp()) {
            return ResponseEntity.ok(Map.of(
                "status", "UP",
                "version", appVersion,
                "database", "UP"
            ));
        }

        return ResponseEntity.status(503).body(Map.of(
            "status", "DOWN",
            "version", appVersion,
            "database", "DOWN"
        ));
    }
}
