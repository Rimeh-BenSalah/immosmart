package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.DemandeContact;
import com.immosmart.repository.AnnonceurDemandeContactRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Demandes reçues par l'annonceur
@Service
public class AnnonceurDemandeService {

    private final AnnonceurDemandeContactRepository demandes;

    public AnnonceurDemandeService(AnnonceurDemandeContactRepository demandes) { this.demandes = demandes; }

    public List<DemandeContact> recues(long userId) {
        return demandes.findByDestinataireIdOrderByIdDesc(userId);
    }

    @Transactional
    public void repondre(Requetes.Reponse req, long userId) {
        if (req.id() == null) throw new ApiException(400, "Identifiant manquant");
        DemandeContact d = demandes.findById(req.id())
                .filter(x -> userId == x.getDestinataireId())
                .orElseThrow(() -> new ApiException(404, "Demande introuvable"));
        d.setMessage(d.getMessage() + "\n\n--- Réponse ---\n" + (req.reponse() == null ? "" : req.reponse()));
        demandes.save(d);
    }
}
