package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.*;
import com.immosmart.repository.*;
import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

// Ce qu'un visiteur (non connecté) peut consulter
@Service
public class PublicService {

    private final VisiteurAnnonceRepository annonces;
    private final VisiteurRegionRepository regions;
    private final VisiteurCategorieRepository categories;
    private final TypeBienRepository typesBien;
    private final TypeTransactionRepository typesTransaction;

    public PublicService(VisiteurAnnonceRepository annonces, VisiteurRegionRepository regions, VisiteurCategorieRepository categories,
                         TypeBienRepository typesBien, TypeTransactionRepository typesTransaction) {
        this.annonces = annonces;
        this.regions = regions;
        this.categories = categories;
        this.typesBien = typesBien;
        this.typesTransaction = typesTransaction;
    }

    public List<Region> regions() { return regions.findAll(); }

    public List<Categorie> categories() { return categories.findAll(); }

    public List<TypeBien> typesBien() { return typesBien.findAll(); }

    public List<TypeTransaction> typesTransaction() { return typesTransaction.findAll(); }

    public Annonce detail(long id) {
        return annonces.findByIdAndStatut(id, "validee")
                .orElseThrow(() -> new ApiException(404, "Annonce non trouvée"));
    }

    // Recherche : seules les annonces validées, avec les filtres renseignés
    public List<Annonce> rechercher(String search, String typeTransaction, String region, String prixMax,
                                    String surfaceMin, String piecesMin, String ids) {

        Specification<Annonce> spec = (root, query, cb) -> {
            List<Predicate> p = new ArrayList<>();
            p.add(cb.equal(root.get("statut"), "validee"));

            if (actif(search))          p.add(cb.like(root.<String>get("titre"), "%" + search + "%"));
            Long t = entier(typeTransaction);
            if (t != null)              p.add(cb.equal(root.get("typeTransactionId"), t));
            Long r = entier(region);
            if (r != null)              p.add(cb.equal(root.get("regionId"), r));
            BigDecimal pm = decimal(prixMax);
            if (pm != null)             p.add(cb.lessThanOrEqualTo(root.<BigDecimal>get("prix"), pm));
            BigDecimal sm = decimal(surfaceMin);
            if (sm != null)             p.add(cb.greaterThanOrEqualTo(root.<BigDecimal>get("surface"), sm));
            Long pc = entier(piecesMin);
            if (pc != null)             p.add(cb.greaterThanOrEqualTo(root.<Integer>get("nombrePieces"), pc.intValue()));

            // page de comparaison : ?ids=1,2,3
            List<Long> liste = new ArrayList<>();
            for (String x : nz(ids).replaceAll("[^0-9,]", "").split(",")) if (!x.isEmpty()) liste.add(Long.parseLong(x));
            if (!liste.isEmpty())       p.add(root.get("id").in(liste));

            return cb.and(p.toArray(new Predicate[0]));
        };
        return annonces.findAll(spec, Sort.by(Sort.Direction.DESC, "id"));
    }

    private static boolean actif(String s) { return s != null && !s.isBlank() && !s.equals("0"); }

    private static String nz(String s) { return s == null ? "" : s; }

    private static Long entier(String s) {
        if (!actif(s)) return null;
        try { return Long.parseLong(s.trim()); } catch (NumberFormatException e) { return null; }
    }

    private static BigDecimal decimal(String s) {
        if (!actif(s)) return null;
        try { return new BigDecimal(s.trim()); } catch (NumberFormatException e) { return null; }
    }
}
