package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.Annonce;
import com.immosmart.repository.AnnonceurAnnonceRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Les annonces de l'annonceur connecté
@Service
public class AnnonceurAnnonceService {

    private final AnnonceurAnnonceRepository annonces;

    public AnnonceurAnnonceService(AnnonceurAnnonceRepository annonces) { this.annonces = annonces; }

    public List<Annonce> mesAnnonces(long userId) {
        return annonces.findByUserIdOrderByIdDesc(userId);
    }

    public Annonce detail(long id, long userId) {
        return annonces.findByIdAndUserId(id, userId).orElse(null);
    }

    @Transactional
    public long ajouter(Requetes.Annonce req, long userId) {
        Annonce a = new Annonce();
        remplir(a, req);
        a.setUserId(userId);
        return annonces.save(a).getId();   // le statut prend la valeur par défaut de la base
    }

    @Transactional
    public void modifier(Requetes.Annonce req, long userId) {
        if (req.id() == null) throw new ApiException(400, "Identifiant manquant");
        Annonce a = annonces.findByIdAndUserId(req.id(), userId)
                .orElseThrow(() -> new ApiException(404, "Annonce introuvable"));
        remplir(a, req);
        annonces.save(a);
    }

    @Transactional
    public void supprimer(long id, long userId) {
        annonces.supprimerDe(id, userId);
    }

    private void remplir(Annonce a, Requetes.Annonce r) {
        a.setTitre(r.titre());
        a.setDescription(r.description());
        a.setPrix(r.prix());
        a.setSurface(r.surface());
        a.setNombrePieces(r.nombrePieces());
        a.setEtat(r.etat());
        a.setTypeTransactionId(r.typeTransactionId());
        a.setCategorieId(r.categorieId());
        a.setRegionId(r.regionId());
    }
}
