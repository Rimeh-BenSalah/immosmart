package com.immosmart.controller;

import com.immosmart.service.CategorieService;
import com.immosmart.service.Auth;
import com.immosmart.model.Requetes;
import com.immosmart.model.Categorie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// /admin/categories/*
@RestController
@RequestMapping("/admin/categories")
public class CategorieController {

    private final CategorieService service;
    private final Auth auth;

    public CategorieController(CategorieService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/categories_liste")
    public List<Categorie> liste(HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        return service.lister();
    }

    @PostMapping("/categorie_ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@RequestBody Requetes.Nom body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.ajouter(body.nom());
        return ResponseEntity.status(201).body(Map.of("message", "Catégorie ajoutée"));
    }

    @PostMapping("/categorie_modifier")
    public Map<String, Object> modifier(@RequestBody Requetes.Nom body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.modifier(body.id() == null ? 0 : body.id(), body.nom());
        return Map.of("message", "Catégorie modifiée");
    }

    @PostMapping("/categorie_supprimer")
    public Map<String, Object> supprimer(@RequestBody Requetes.Nom body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.supprimer(body.id() == null ? 0 : body.id());
        return Map.of("message", "Catégorie supprimée");
    }
}
