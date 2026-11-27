package com.immosmart.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "hibernate_lazy_initializer", "handler"})
@Table(name = "demande_contact")
@DynamicInsert
@DynamicUpdate
public class DemandeContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "expediteur_id")
    private Long expediteurId;

    @Column(name = "destinataire_id")
    private Long destinataireId;

    @Column(name = "annonce_id")
    private Long annonceId;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "date_envoi")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateEnvoi;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "annonce_id", insertable = false, updatable = false)
    private Annonce annonce;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expediteur_id", insertable = false, updatable = false)
    private User expediteur;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destinataire_id", insertable = false, updatable = false)
    private User destinataire;

    // ----- getters / setters -----

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getExpediteurId() { return expediteurId; }
    public void setExpediteurId(Long expediteurId) { this.expediteurId = expediteurId; }

    public Long getDestinataireId() { return destinataireId; }
    public void setDestinataireId(Long destinataireId) { this.destinataireId = destinataireId; }

    public Long getAnnonceId() { return annonceId; }
    public void setAnnonceId(Long annonceId) { this.annonceId = annonceId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getDateEnvoi() { return dateEnvoi; }
    public void setDateEnvoi(LocalDateTime dateEnvoi) { this.dateEnvoi = dateEnvoi; }

    public Annonce getAnnonce() { return annonce; }
    public void setAnnonce(Annonce annonce) { this.annonce = annonce; }

    public User getExpediteur() { return expediteur; }
    public void setExpediteur(User expediteur) { this.expediteur = expediteur; }

    public User getDestinataire() { return destinataire; }
    public void setDestinataire(User destinataire) { this.destinataire = destinataire; }

    @JsonProperty("annonce_titre")
    public String getAnnonceTitre() { return annonce == null ? null : annonce.getTitre(); }

    @JsonProperty("prix")
    public BigDecimal getPrix() { return annonce == null ? null : annonce.getPrix(); }

    @JsonProperty("surface")
    public BigDecimal getSurface() { return annonce == null ? null : annonce.getSurface(); }

    @JsonProperty("expediteur_nom")
    public String getExpediteurNom() { return expediteur == null ? null : expediteur.getNom(); }

    @JsonProperty("expediteur_prenom")
    public String getExpediteurPrenom() { return expediteur == null ? null : expediteur.getPrenom(); }

    @JsonProperty("expediteur_telephone")
    public String getExpediteurTelephone() { return expediteur == null ? null : expediteur.getTelephone(); }

    @JsonProperty("annonceur_nom")
    public String getAnnonceurNom() { return destinataire == null ? null : destinataire.getNom(); }

    @JsonProperty("annonceur_prenom")
    public String getAnnonceurPrenom() { return destinataire == null ? null : destinataire.getPrenom(); }
}
