package com.immosmart.service;

import com.immosmart.repository.AdminAnnonceRepository;
import com.immosmart.repository.AdminDemandeContactRepository;
import com.immosmart.repository.AdminUserRepository;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

// Statistiques du tableau de bord
@Service
public class DashboardService {

    private final AdminUserRepository users;
    private final AdminAnnonceRepository annonces;
    private final AdminDemandeContactRepository demandes;

    public DashboardService(AdminUserRepository users, AdminAnnonceRepository annonces, AdminDemandeContactRepository demandes) {
        this.users = users;
        this.annonces = annonces;
        this.demandes = demandes;
    }

    public Map<String, Object> stats() {
        Map<String, Object> r = new LinkedHashMap<>();
        r.put("users", users.countByRoleNot("admin"));
        r.put("annonces", annonces.count());
        r.put("en_attente", annonces.countByStatut("en_attente"));
        r.put("demandes", demandes.count());
        r.put("dernieres_annonces", annonces.findTop5ByOrderByIdDesc());
        r.put("derniers_users", users.findTop5ByRoleNotOrderByIdDesc("admin"));
        return r;
    }
}
