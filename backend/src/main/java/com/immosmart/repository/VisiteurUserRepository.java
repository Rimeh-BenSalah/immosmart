package com.immosmart.repository;

import com.immosmart.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VisiteurUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRoleNot(String role);

    List<User> findByRoleNot(String role);

    List<User> findTop5ByRoleNotOrderByIdDesc(String role);

    // Change le statut d'un compte, sans jamais toucher à un admin
    @Modifying
    @Query("UPDATE User u SET u.statut = :statut WHERE u.id = :id AND u.role <> 'admin'")
    int changerStatut(@Param("id") Long id, @Param("statut") String statut);

    // Supprime un compte (sauf admin) -> nombre de lignes supprimées
    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :id AND u.role <> 'admin'")
    int supprimerSaufAdmin(@Param("id") Long id);
}
