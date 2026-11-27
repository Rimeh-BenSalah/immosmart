package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.Annonce;
import com.immosmart.model.DemandeContact;
import com.immosmart.repository.UtilisateurAnnonceRepository;
import com.immosmart.repository.UtilisateurDemandeContactRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Demandes de contact envoyées par un utilisateur
@Service
public class UtilisateurDemandeService {

    private final UtilisateurDemandeContactRepository demandes;
    private final UtilisateurAnnonceRepository annonces;

    public UtilisateurDemandeService(UtilisateurDemandeContactRepository demandes, UtilisateurAnnonceRepository annonces) {
        this.demandes = demandes;
        this.annonces = annonces;
    }

    @Transactional
    public void ajouter(Requetes.Demande req) {
        if (req.userId() == null || req.userId() == 0 || req.annonceId() == null || req.annonceId() == 0
                || req.message() == null || req.message().isEmpty())
            throw new ApiException(400, "Données incomplètes");

        Annonce annonce = annonces.findById(req.annonceId()).orElse(null);
        if (annonce == null || annonce.getUserId() == null)
            throw new ApiException(404, "Impossible de trouver le propriétaire de l'annonce");

        DemandeContact d = new DemandeContact();
        d.setExpediteurId(req.userId());
        d.setDestinataireId(annonce.getUserId());
        d.setAnnonceId(req.annonceId());
        d.setMessage(req.message());
        d.setDateEnvoi(LocalDateTime.now());
        demandes.save(d);
    }

    public List<DemandeContact> lister(long userId) {
        if (userId == 0) throw new ApiException(400, "ID utilisateur manquant");
        return demandes.findByExpediteurIdOrderByDateEnvoiDesc(userId);
    }

    @Transactional
    public void repondre(Requetes.Reponse req) {
        if (req.id() == null || req.id() == 0 || req.reponse() == null || req.reponse().isEmpty())
            throw new ApiException(400, "Données incomplètes");

        DemandeContact d = demandes.findById(req.id()).orElseThrow(() -> new ApiException(404, "Demande introuvable"));
        d.setMessage(d.getMessage() + "\n\n--- Votre réponse ---\n" + req.reponse());
        demandes.save(d);
    }
}
