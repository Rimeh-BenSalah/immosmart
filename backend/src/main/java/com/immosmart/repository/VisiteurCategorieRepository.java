package com.immosmart.repository;

import com.immosmart.model.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisiteurCategorieRepository extends JpaRepository<Categorie, Long> {
}
