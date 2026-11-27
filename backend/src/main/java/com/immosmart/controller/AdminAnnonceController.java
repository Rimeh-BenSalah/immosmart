package com.immosmart.controller;

import com.immosmart.service.AdminAnnonceService;
import com.immosmart.service.Auth;
import com.immosmart.model.Requetes;
import com.immosmart.model.Annonce;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /admin/annonces/*
@RestController
@RequestMapping("/admin/annonces")
public class AdminAnnonceController {

    private final AdminAnnonceService service;
    private final Auth auth;

    public AdminAnnonceController(AdminAnnonceService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/annonces_liste")
    public List<Annonce> liste(HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        return service.lister();
    }

    @PostMapping("/annonce_valider")
    public Map<String, Object> valider(@RequestBody Requetes.Id body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.changerStatut(id(body), "validee");
        return Map.of("message", "Annonce validée");
    }

    @PostMapping("/annonce_refuser")
    public Map<String, Object> refuser(@RequestBody Requetes.Id body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.changerStatut(id(body), "refusee");
        return Map.of("message", "Annonce refusée");
    }

    @PostMapping("/annonce_desactiver")
    public Map<String, Object> desactiver(@RequestBody Requetes.Id body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.changerStatut(id(body), "desactivee");
        return Map.of("success", true);
    }

    @PostMapping("/annonce_supprimer")
    public Map<String, Object> supprimer(@RequestBody Requetes.Id body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.supprimer(id(body));
        return Map.of("message", "Annonce supprimée");
    }

    private static long id(Requetes.Id body) { return body.id() == null ? 0 : body.id(); }
}
