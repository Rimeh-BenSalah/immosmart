package com.immosmart.repository;

import com.immosmart.model.DemandeContact;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDemandeContactRepository extends JpaRepository<DemandeContact, Long> {

    // demandes envoyées par un utilisateur
    List<DemandeContact> findByExpediteurIdOrderByDateEnvoiDesc(Long expediteurId);

    // demandes reçues par un annonceur
    List<DemandeContact> findByDestinataireIdOrderByIdDesc(Long destinataireId);
}
