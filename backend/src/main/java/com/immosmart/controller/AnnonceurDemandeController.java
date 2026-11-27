package com.immosmart.controller;

import com.immosmart.service.AnnonceurDemandeService;
import com.immosmart.service.Auth;
import com.immosmart.service.Session;
import com.immosmart.model.Requetes;
import com.immosmart.model.DemandeContact;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /annonceur/demandes/*
@RestController
@RequestMapping("/annonceur/demandes")
public class AnnonceurDemandeController {

    private final AnnonceurDemandeService service;
    private final Auth auth;

    public AnnonceurDemandeController(AnnonceurDemandeService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/demandes_recues")
    public List<DemandeContact> recues(HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        return service.recues(s.id());
    }

    @PostMapping("/demande_repondre")
    public Map<String, Object> repondre(@RequestBody Requetes.Reponse body, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        service.repondre(body, s.id());
        return Map.of("success", true, "message", "Réponse envoyée");
    }
}
