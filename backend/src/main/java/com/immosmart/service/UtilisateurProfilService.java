package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.User;
import com.immosmart.repository.UtilisateurUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Profil de l'utilisateur
@Service
public class UtilisateurProfilService {

    private final UtilisateurUserRepository users;
    private final PasswordEncoder enc;

    public UtilisateurProfilService(UtilisateurUserRepository users, PasswordEncoder enc) {
        this.users = users;
        this.enc = enc;
    }

    public User get(long id) {
        if (id == 0) throw new ApiException(400, "ID manquant");
        return users.findById(id).orElseThrow(() -> new ApiException(404, "Utilisateur non trouvé"));
    }

    @Transactional
    public void modifier(Requetes.Profil req) {
        if (req.id() == null || req.id() == 0 || isEmpty(req.nom()) || isEmpty(req.email()))
            throw new ApiException(400, "Données incomplètes");

        User u = users.findById(req.id()).orElseThrow(() -> new ApiException(404, "Utilisateur non trouvé"));
        u.setNom(req.nom());
        u.setPrenom(req.prenom() == null ? "" : req.prenom());
        u.setEmail(req.email());
        u.setTelephone(req.telephone() == null ? "" : req.telephone());
        if (!isEmpty(req.motDePasse())) u.setMotDePasse(enc.encode(req.motDePasse()));
        users.save(u);
    }

    private static boolean isEmpty(String s) { return s == null || s.isEmpty(); }
}
