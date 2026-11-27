package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.User;
import com.immosmart.repository.AdminUserRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Gestion des comptes (un admin n'est jamais modifiable ici)
@Service
public class UserService {

    private final AdminUserRepository users;

    public UserService(AdminUserRepository users) { this.users = users; }

    // en attente d'abord, puis actifs, suspendus, refusés ; les plus récents en premier
    public List<User> lister() {
        return users.findByRoleNot("admin").stream()
                .sorted(Comparator.comparingInt((User u) -> rang(u.getStatut()))
                        .thenComparing(User::getId, Comparator.reverseOrder()))
                .toList();
    }

    @Transactional
    public void changerStatut(long id, String statut) {
        users.changerStatut(id, statut);
    }

    @Transactional
    public void supprimer(long id) {
        if (users.supprimerSaufAdmin(id) == 0)
            throw new ApiException(403, "Impossible de supprimer cet utilisateur");
    }

    private static int rang(String statut) {
        return switch (statut == null ? "" : statut) {
            case "en_attente" -> 1;
            case "actif" -> 2;
            case "suspendu" -> 3;
            case "refuse" -> 4;
            default -> 5;
        };
    }
}
