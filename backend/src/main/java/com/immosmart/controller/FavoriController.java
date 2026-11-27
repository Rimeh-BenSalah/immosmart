package com.immosmart.controller;

import com.immosmart.service.FavoriService;
import com.immosmart.model.Requetes;
import com.immosmart.model.Annonce;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

// /user/favoris/add, list, remove
@RestController
@RequestMapping("/user/favoris")
public class FavoriController {

    private final FavoriService service;

    public FavoriController(FavoriService service) { this.service = service; }

    @PostMapping("/add")
    public Map<String, Object> add(@RequestBody Requetes.Favori req) {
        service.ajouter(req);
        return Map.of("success", "Ajouté aux favoris");
    }

    @GetMapping("/list")
    public List<Annonce> list(@RequestParam(value = "user_id", defaultValue = "0") long userId) {
        return service.lister(userId);
    }

    @PostMapping("/remove")
    public Map<String, Object> remove(@RequestBody Requetes.Favori req) {
        service.retirer(req);
        return Map.of("success", "Favori retiré");
    }
}
