package com.immosmart.controller;

import com.immosmart.service.DashboardService;
import com.immosmart.service.Auth;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /admin/dashboard
@RestController
@RequestMapping("/admin")
public class DashboardController {

    private final DashboardService service;
    private final Auth auth;

    public DashboardController(DashboardService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard(HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        return service.stats();
    }
}
