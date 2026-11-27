package com.immosmart.repository;

import com.immosmart.model.Photo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findByAnnonceId(Long annonceId);
}
