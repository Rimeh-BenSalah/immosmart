package com.immosmart.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "hibernate_lazy_initializer", "handler"})
@Table(name = "annonce")
@DynamicInsert
@DynamicUpdate
public class Annonce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String description;

    private BigDecimal prix;

    private BigDecimal surface;

    @Column(name = "nombre_pieces")
    private Integer nombrePieces;

    private String etat;

    @Column(name = "type_transaction_id")
    private Long typeTransactionId;

    @Column(name = "categorie_id")
    private Long categorieId;

    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "user_id")
    private Long userId;

    private String statut;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", insertable = false, updatable = false)
    private Region region;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categorie_id", insertable = false, updatable = false)
    private Categorie categorie;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_transaction_id", insertable = false, updatable = false)
    private TypeTransaction typeTransaction;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @OneToMany(mappedBy = "annonce")
    private List<Photo> photos;

    // ----- getters / setters -----

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrix() { return prix; }
    public void setPrix(BigDecimal prix) { this.prix = prix; }

    public BigDecimal getSurface() { return surface; }
    public void setSurface(BigDecimal surface) { this.surface = surface; }

    public Integer getNombrePieces() { return nombrePieces; }
    public void setNombrePieces(Integer nombrePieces) { this.nombrePieces = nombrePieces; }

    public String getEtat() { return etat; }
    public void setEtat(String etat) { this.etat = etat; }

    public Long getTypeTransactionId() { return typeTransactionId; }
    public void setTypeTransactionId(Long typeTransactionId) { this.typeTransactionId = typeTransactionId; }

    public Long getCategorieId() { return categorieId; }
    public void setCategorieId(Long categorieId) { this.categorieId = categorieId; }

    public Long getRegionId() { return regionId; }
    public void setRegionId(Long regionId) { this.regionId = regionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public Region getRegion() { return region; }
    public void setRegion(Region region) { this.region = region; }

    public Categorie getCategorie() { return categorie; }
    public void setCategorie(Categorie categorie) { this.categorie = categorie; }

    public TypeTransaction getTypeTransaction() { return typeTransaction; }
    public void setTypeTransaction(TypeTransaction typeTransaction) { this.typeTransaction = typeTransaction; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<Photo> getPhotos() { return photos; }
    public void setPhotos(List<Photo> photos) { this.photos = photos; }

    // ----- champs calculés envoyés à Angular (region_nom, categorie_nom, ...) -----

    @JsonProperty("region_nom")
    public String getRegionNom() { return region == null ? null : region.getNom(); }

    @JsonProperty("categorie_nom")
    public String getCategorieNom() { return categorie == null ? null : categorie.getNom(); }

    @JsonProperty("transaction_nom")
    public String getTransactionNom() { return typeTransaction == null ? null : typeTransaction.getNom(); }

    @JsonProperty("user_nom")
    public String getUserNom() { return user == null ? null : user.getNom(); }

    @JsonProperty("user_prenom")
    public String getUserPrenom() { return user == null ? null : user.getPrenom(); }

    @JsonProperty("user_telephone")
    public String getUserTelephone() { return user == null ? null : user.getTelephone(); }

    @JsonProperty("photo_url")
    public String getPhotoUrl() { return photos == null || photos.isEmpty() ? null : photos.get(0).getUrl(); }
}
