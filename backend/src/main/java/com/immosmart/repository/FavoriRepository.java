package com.immosmart.repository;

import com.immosmart.model.Favori;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriRepository extends JpaRepository<Favori, Long> {

    boolean existsByUserIdAndAnnonceId(Long userId, Long annonceId);

    List<Favori> findByUserIdOrderByIdDesc(Long userId);

    long deleteByUserIdAndAnnonceId(Long userId, Long annonceId);
}
