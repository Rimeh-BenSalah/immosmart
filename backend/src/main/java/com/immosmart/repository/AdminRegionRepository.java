package com.immosmart.repository;

import com.immosmart.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRegionRepository extends JpaRepository<Region, Long> {
}
