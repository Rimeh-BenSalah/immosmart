package com.immosmart.controller;

import com.immosmart.service.PhotoService;
import com.immosmart.service.Auth;
import com.immosmart.service.Session;
import com.immosmart.model.Requetes;
import com.immosmart.model.Photo;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

// /annonceur/photos/*
@RestController
@RequestMapping("/annonceur/photos")
public class PhotoController {

    private final PhotoService service;
    private final Auth auth;

    public PhotoController(PhotoService service, Auth auth) {
        this.service = service;
        this.auth = auth;
    }

    @GetMapping("/photos_liste")
    public List<Photo> liste(@RequestParam long id, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        return service.lister(id, s.id());
    }

    @PostMapping("/photo_ajouter")
    public ResponseEntity<Map<String, Object>> ajouter(
            @RequestParam(value = "annonce_id", defaultValue = "0") long annonceId,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            HttpServletRequest req) throws IOException {
        Session s = auth.verifierRole(req, "annonceur");
        String url = service.ajouter(annonceId, photo, s.id());
        return ResponseEntity.status(201).body(Map.of("message", "Photo ajoutée", "url", url));
    }

    @PostMapping("/photo_supprimer")
    public Map<String, Object> supprimer(@RequestBody Requetes.Id body, HttpServletRequest req) {
        Session s = auth.verifierRole(req, "annonceur");
        service.supprimer(body.id() == null ? 0 : body.id(), s.id());
        return Map.of("message", "Photo supprimée");
    }
}
