package com.immosmart.repository;

import com.immosmart.model.Annonce;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VisiteurAnnonceRepository extends JpaRepository<Annonce, Long>, JpaSpecificationExecutor<Annonce> {

    Optional<Annonce> findByIdAndStatut(Long id, String statut);

    Optional<Annonce> findByIdAndUserId(Long id, Long userId);

    List<Annonce> findByUserIdOrderByIdDesc(Long userId);

    List<Annonce> findTop5ByOrderByIdDesc();

    long countByStatut(String statut);

    @Modifying
    @Query("UPDATE Annonce a SET a.statut = :statut WHERE a.id = :id")
    int changerStatut(@Param("id") Long id, @Param("statut") String statut);

    @Modifying
    @Query("DELETE FROM Annonce a WHERE a.id = :id AND a.userId = :userId")
    int supprimerDe(@Param("id") Long id, @Param("userId") Long userId);
}
