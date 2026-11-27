package com.immosmart.controller;

import com.immosmart.service.AuthService;
import com.immosmart.service.Auth;
import com.immosmart.service.Session;
import com.immosmart.model.Requetes;
import com.immosmart.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// /auth/login, /auth/register, /auth/logout, /auth/me
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;
    private final Auth auth;

    public AuthController(AuthService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Requetes.Login req, HttpServletResponse res) {
        User u = service.login(req);
        auth.connecter(res, u.getId(), u.getRole());   // pose le cookie de connexion
        return Map.of("message", "Connexion réussie", "user", u);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Requetes.Register req) {
        service.register(req);
        return ResponseEntity.status(201).body(Map.of("message", "Inscription réussie, en attente de validation"));
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(HttpServletResponse res) {
        auth.deconnecter(res);
        return Map.of("message", "Déconnexion réussie");
    }

    @GetMapping("/me")
    public User me(HttpServletRequest req) {
        Session s = auth.verifierAuth(req);
        return service.me(s.id());
    }
}
