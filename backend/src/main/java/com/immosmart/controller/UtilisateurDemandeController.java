package com.immosmart.controller;

import com.immosmart.service.UtilisateurDemandeService;
import com.immosmart.model.Requetes;
import com.immosmart.model.DemandeContact;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /user/demandes/add, list, repondre
@RestController
@RequestMapping("/user/demandes")
public class UtilisateurDemandeController {

    private final UtilisateurDemandeService service;

    public UtilisateurDemandeController(UtilisateurDemandeService service) { this.service = service; }

    @PostMapping("/add")
    public Map<String, Object> add(@RequestBody Requetes.Demande req) {
        service.ajouter(req);
        return Map.of("success", "Demande envoyée au propriétaire");
    }

    @GetMapping("/list")
    public List<DemandeContact> list(@RequestParam(value = "user_id", defaultValue = "0") long userId) {
        return service.lister(userId);
    }

    @PostMapping("/repondre")
    public Map<String, Object> repondre(@RequestBody Requetes.Reponse req) {
        service.repondre(req);
        return Map.of("success", "Réponse enregistrée");
    }
}
