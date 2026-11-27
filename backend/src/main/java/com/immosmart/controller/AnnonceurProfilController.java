package com.immosmart.controller;

import com.immosmart.service.AnnonceurProfilService;
import com.immosmart.service.Auth;
import com.immosmart.service.Session;
import com.immosmart.model.Requetes;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /annonceur/profil_modifier
@RestController
@RequestMapping("/annonceur")
public class AnnonceurProfilController {

    private final AnnonceurProfilService service;
    private final Auth auth;

    public AnnonceurProfilController(AnnonceurProfilService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @PostMapping("/profil_modifier")
    public Map<String, Object> modifier(@RequestBody Requetes.Profil body, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        service.modifier(body, s.id());
        return Map.of("message", "Profil mis à jour avec succès");
    }
}
