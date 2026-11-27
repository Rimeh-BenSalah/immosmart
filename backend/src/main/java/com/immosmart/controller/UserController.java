package com.immosmart.controller;

import com.immosmart.service.UserService;
import com.immosmart.service.Auth;
import com.immosmart.model.Requetes;
import com.immosmart.model.User;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /admin/users/*  (réservé au rôle admin)
@RestController
@RequestMapping("/admin/users")
public class UserController {

    private final UserService service;
    private final Auth auth;

    public UserController(UserService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/users_liste")
    public List<User> liste(HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        return service.lister();
    }

    @PostMapping("/user_accepter")
    public Map<String, Object> accepter(@RequestBody Requetes.Id body, HttpServletRequest req) {
        return statut(body, req, "actif", "Utilisateur accepté");
    }

    @PostMapping("/user_activer")
    public Map<String, Object> activer(@RequestBody Requetes.Id body, HttpServletRequest req) {
        return statut(body, req, "actif", "Utilisateur activé");
    }

    @PostMapping("/user_refuser")
    public Map<String, Object> refuser(@RequestBody Requetes.Id body, HttpServletRequest req) {
        return statut(body, req, "refuse", "Utilisateur refusé");
    }

    @PostMapping("/user_suspendre")
    public Map<String, Object> suspendre(@RequestBody Requetes.Id body, HttpServletRequest req) {
        return statut(body, req, "suspendu", "Utilisateur suspendu");
    }

    @PostMapping("/user_supprimer")
    public Map<String, Object> supprimer(@RequestBody Requetes.Id body, HttpServletRequest req) {
        auth.verifierRole(req, "admin");
        service.supprimer(body.id() == null ? 0 : body.id());
        return Map.of("message", "Utilisateur supprimé");
    }

    private Map<String, Object> statut(Requetes.Id body, HttpServletRequest req, String statut, String message) {
        auth.verifierRole(req, "admin");
        service.changerStatut(body.id() == null ? 0 : body.id(), statut);
        return Map.of("message", message);
    }
}
