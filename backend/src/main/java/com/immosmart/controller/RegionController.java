package com.immosmart.controller;

import com.immosmart.service.RegionService;
import com.immosmart.service.Auth;
import com.immosmart.model.Requetes;
import com.immosmart.model.Region;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// /admin/regions/*
@RestController
@RequestMapping("/admin/regions")
public class RegionController {

    private final RegionService service;
    private final Auth auth;

    public RegionController(RegionService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/regions_liste")
    public List<Region> liste(HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        return service.lister();
    }

    @PostMapping("/region_ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(@RequestBody Requetes.Nom body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.ajouter(body.nom());
        return ResponseEntity.status(201).body(Map.of("message", "Région ajoutée"));
    }

    @PostMapping("/region_modifier")
    public Map<String, Object> modifier(@RequestBody Requetes.Nom body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.modifier(body.id() == null ? 0 : body.id(), body.nom());
        return Map.of("message", "Région modifiée");
    }

    @PostMapping("/region_supprimer")
    public Map<String, Object> supprimer(@RequestBody Requetes.Nom body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.supprimer(body.id() == null ? 0 : body.id());
        return Map.of("message", "Région supprimée");
    }
}
