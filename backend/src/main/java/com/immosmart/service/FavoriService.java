package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.Annonce;
import com.immosmart.model.Favori;
import com.immosmart.repository.UtilisateurAnnonceRepository;
import com.immosmart.repository.FavoriRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Annonces favorites d'un utilisateur
@Service
public class FavoriService {

    private final FavoriRepository favoris;
    private final UtilisateurAnnonceRepository annonces;

    public FavoriService(FavoriRepository favoris, UtilisateurAnnonceRepository annonces) {
        this.favoris = favoris;
        this.annonces = annonces;
    }

    @Transactional
    public void ajouter(Requetes.Favori req) {
        verifier(req);
        if (favoris.existsByUserIdAndAnnonceId(req.userId(), req.annonceId()))
            throw new ApiException(400, "Déjà dans les favoris");

        Favori f = new Favori();
        f.setUserId(req.userId());
        f.setAnnonceId(req.annonceId());
        favoris.save(f);
    }

    // Les annonces favorites (seulement celles qui sont encore validées)
    public List<Annonce> lister(long userId) {
        if (userId == 0) throw new ApiException(400, "ID utilisateur manquant");
        return favoris.findByUserIdOrderByIdDesc(userId).stream()
                .map(f -> annonces.findByIdAndStatut(f.getAnnonceId(), "validee").orElse(null))
                .filter(a -> a != null)
                .toList();
    }

    @Transactional
    public void retirer(Requetes.Favori req) {
        verifier(req);
        favoris.deleteByUserIdAndAnnonceId(req.userId(), req.annonceId());
    }

    private void verifier(Requetes.Favori req) {
        if (req.userId() == null || req.userId() == 0 || req.annonceId() == null || req.annonceId() == 0)
            throw new ApiException(400, "Données manquantes");
    }
}
