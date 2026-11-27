package com.immosmart.service;

import com.immosmart.model.Categorie;
import com.immosmart.repository.AdminCategorieRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Gestion des categories (CRUD)
@Service
public class CategorieService {

    private final AdminCategorieRepository repo;

    public CategorieService(AdminCategorieRepository repo) { this.repo = repo; }

    public List<Categorie> lister() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Transactional
    public void ajouter(String nom) {
        Categorie x = new Categorie();
        x.setNom(nom);
        repo.save(x);
    }

    @Transactional
    public void modifier(long id, String nom) {
        repo.findById(id).ifPresent(x -> { x.setNom(nom); repo.save(x); });
    }

    @Transactional
    public void supprimer(long id) {
        repo.deleteById(id);
    }
}
