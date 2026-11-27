package com.immosmart.model;

import java.math.BigDecimal;

// Les JSON envoyés par Angular (noms en snake_case : mot_de_passe, nombre_pieces, ...)
public final class Requetes {
    private Requetes() {}

    public record Login(String email, String motDePasse) {}

    public record Register(String nom, String prenom, String email, String motDePasse, String telephone, String role) {}

    public record Id(Long id) {}

    public record Nom(Long id, String nom) {}

    public record Annonce(Long id, String titre, String description, BigDecimal prix, BigDecimal surface,
                          Integer nombrePieces, String etat, Long typeTransactionId, Long categorieId, Long regionId) {}

    public record Profil(Long id, String nom, String prenom, String email, String telephone, String motDePasse) {}

    public record Demande(Long userId, Long annonceId, String message) {}

    public record Reponse(Long id, String reponse) {}

    public record Favori(Long userId, Long annonceId) {}
}
