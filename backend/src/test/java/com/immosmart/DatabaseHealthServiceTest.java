package com.immosmart;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.immosmart.service.DatabaseHealthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class DatabaseHealthServiceTest {

    @Autowired
    private DatabaseHealthService healthService;

    @Test
    void laBaseH2EnMemoireRepond() {
        assertTrue(healthService.isDatabaseUp());
    }
}
