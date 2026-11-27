package com.immosmart;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class ApplicationContextTest {

    @Autowired
    private ApplicationContext context;

    @Value("${app.secret}")
    private String secret;

    @Test
    void lApplicationDemarre() {
        assertNotNull(context);
    }

    @Test
    void laCleDeSignatureEstDefinie() {
        assertNotNull(secret);
        org.junit.jupiter.api.Assertions.assertFalse(secret.isBlank());
    }
}
