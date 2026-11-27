package com.immosmart.controller;

import com.immosmart.service.PublicService;
import com.immosmart.model.*;
import java.util.List;
import org.springframework.web.bind.annotation.*;

// /public/* : consultation sans connexion
@RestController
@RequestMapping("/public")
public class PublicController {

    private final PublicService service;

    public PublicController(PublicService service) { this.service = service; }

    @GetMapping("/regions")
    public List<Region> regions() { return service.regions(); }

    @GetMapping("/categories")
    public List<Categorie> categories() { return service.categories(); }

    @GetMapping("/types_bien")
    public List<TypeBien> typesBien() { return service.typesBien(); }

    @GetMapping("/types_transaction")
    public List<TypeTransaction> typesTransaction() { return service.typesTransaction(); }

    @GetMapping("/annonce_detail")
    public Annonce detail(@RequestParam(defaultValue = "0") long id) { return service.detail(id); }

    @GetMapping("/annonces_publiques")
    public List<Annonce> annonces(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String type_transaction,
            @RequestParam(defaultValue = "") String region,
            @RequestParam(defaultValue = "") String prix_max,
            @RequestParam(defaultValue = "") String surface_min,
            @RequestParam(defaultValue = "") String pieces_min,
            @RequestParam(defaultValue = "") String ids) {
        return service.rechercher(search, type_transaction, region, prix_max, surface_min, pieces_min, ids);
    }
}
