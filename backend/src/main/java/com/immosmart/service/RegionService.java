package com.immosmart.service;

import com.immosmart.model.Region;
import com.immosmart.repository.AdminRegionRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Gestion des regions (CRUD)
@Service
public class RegionService {

    private final AdminRegionRepository repo;

    public RegionService(AdminRegionRepository repo) { this.repo = repo; }

    public List<Region> lister() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Transactional
    public void ajouter(String nom) {
        Region x = new Region();
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
