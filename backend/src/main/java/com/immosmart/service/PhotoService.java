package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Photo;
import com.immosmart.repository.AnnonceurAnnonceRepository;
import com.immosmart.repository.PhotoRepository;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

// Photos des annonces de l'annonceur
@Service
public class PhotoService {

    private final PhotoRepository photos;
    private final AnnonceurAnnonceRepository annonces;

    @Value("${app.uploads-dir}")
    private String dossier;

    @Value("${app.public-uploads-url}")
    private String urlPublique;

    public PhotoService(PhotoRepository photos, AnnonceurAnnonceRepository annonces) {
        this.photos = photos;
        this.annonces = annonces;
    }

    public List<Photo> lister(long annonceId, long userId) {
        if (annonces.findByIdAndUserId(annonceId, userId).isEmpty()) return List.of();
        return photos.findByAnnonceId(annonceId);
    }

    @Transactional
    public String ajouter(long annonceId, MultipartFile fichier, long userId) throws IOException {
        if (fichier == null || fichier.isEmpty() || annonceId == 0) throw new ApiException(400, "Fichier manquant");
        if (annonces.findByIdAndUserId(annonceId, userId).isEmpty()) throw new ApiException(404, "Annonce introuvable");

        // nom nettoyé + horodatage
        String original = fichier.getOriginalFilename() == null ? "photo" : Path.of(fichier.getOriginalFilename()).getFileName().toString();
        String nom = (System.currentTimeMillis() / 1000) + "_" + original.replaceAll("[^a-zA-Z0-9.\\-_]", "");

        Path dir = Path.of(dossier).toAbsolutePath();
        Files.createDirectories(dir);
        try (InputStream in = fichier.getInputStream()) {
            Files.copy(in, dir.resolve(nom), StandardCopyOption.REPLACE_EXISTING);
        }

        Photo p = new Photo();
        p.setUrl(urlPublique + nom);
        p.setAnnonceId(annonceId);
        photos.save(p);
        return p.getUrl();
    }

    @Transactional
    public void supprimer(long photoId, long userId) {
        photos.findById(photoId)
                .filter(p -> annonces.findByIdAndUserId(p.getAnnonceId(), userId).isPresent())
                .ifPresent(photos::delete);
    }
}
