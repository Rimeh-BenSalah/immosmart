package com.immosmart.service;

import com.immosmart.model.Annonce;
import com.immosmart.repository.AdminAnnonceRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Modération des annonces
@Service
public class AdminAnnonceService {

    private final AdminAnnonceRepository annonces;

    public AdminAnnonceService(AdminAnnonceRepository annonces) { this.annonces = annonces; }

    public List<Annonce> lister() {
        return annonces.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Transactional
    public void changerStatut(long id, String statut) {
        annonces.changerStatut(id, statut);
    }

    @Transactional
    public void supprimer(long id) {
        annonces.deleteById(id);
    }
}
