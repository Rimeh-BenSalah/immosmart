package com.immosmart.controller;

import com.immosmart.service.UtilisateurProfilService;
import com.immosmart.model.Requetes;
import com.immosmart.model.User;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /user/profil/get_profil, update_profil
@RestController
@RequestMapping("/user/profil")
public class UtilisateurProfilController {

    private final UtilisateurProfilService service;

    public UtilisateurProfilController(UtilisateurProfilService service) { this.service = service; }

    @GetMapping("/get_profil")
    public User get(@RequestParam(defaultValue = "0") long id) { return service.get(id); }

    @PostMapping("/update_profil")
    public Map<String, Object> update(@RequestBody Requetes.Profil req) {
        service.modifier(req);
        return Map.of("success", "Profil mis à jour avec succès");
    }
}
