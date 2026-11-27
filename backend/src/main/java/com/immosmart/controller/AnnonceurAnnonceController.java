package com.immosmart.controller;

import com.immosmart.service.AnnonceurAnnonceService;
import com.immosmart.service.Auth;
import com.immosmart.service.Session;
import com.immosmart.model.Requetes;
import com.immosmart.model.Annonce;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// /annonceur/annonces/*  (réservé au rôle annonceur)
@RestController
@RequestMapping("/annonceur/annonces")
public class AnnonceurAnnonceController {

    private final AnnonceurAnnonceService service;
    private final Auth auth;

    public AnnonceurAnnonceController(AnnonceurAnnonceService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/mes_annonces")
    public List<Annonce> mesAnnonces(HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        return service.mesAnnonces(s.id());
    }

    @GetMapping("/annonce_detail")
    public Annonce detail(@RequestParam long id, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        return service.detail(id, s.id());
    }

    @PostMapping("/annonce_ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@RequestBody Requetes.Annonce body, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        long id = service.ajouter(body, s.id());
        return ResponseEntity.status(201).body(Map.of("message", "Annonce ajoutée", "id", String.valueOf(id)));
    }

    @PostMapping("/annonce_modifier")
    public Map<String, Object> modifier(@RequestBody Requetes.Annonce body, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        service.modifier(body, s.id());
        return Map.of("message", "Annonce modifiée");
    }

    @PostMapping("/annonce_supprimer")
    public Map<String, Object> supprimer(@RequestBody Requetes.Id body, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        service.supprimer(body.id() == null ? 0 : body.id(), s.id());
        return Map.of("message", "Annonce supprimée");
    }
}
