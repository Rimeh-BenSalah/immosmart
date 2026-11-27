package com.immosmart.repository;

import com.immosmart.model.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminCategorieRepository extends JpaRepository<Categorie, Long> {
}
