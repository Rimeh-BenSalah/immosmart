package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.User;
import com.immosmart.repository.AnnonceurUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Profil de l'annonceur connecté
@Service
public class AnnonceurProfilService {

    private final AnnonceurUserRepository users;
    private final PasswordEncoder enc;

    public AnnonceurProfilService(AnnonceurUserRepository users, PasswordEncoder enc) {
        this.users = users;
        this.enc = enc;
    }

    @Transactional
    public void modifier(Requetes.Profil req, long userId) {
        if (isEmpty(req.nom()) || isEmpty(req.email()))
            throw new ApiException(400, "Le nom et l'email sont obligatoires");

        User u = users.findById(userId).orElseThrow(() -> new ApiException(401, "Non authentifié"));
        u.setNom(req.nom());
        u.setPrenom(req.prenom());
        u.setEmail(req.email());
        u.setTelephone(req.telephone());
        if (!isEmpty(req.motDePasse())) u.setMotDePasse(enc.encode(req.motDePasse()));
        users.save(u);
    }

    private static boolean isEmpty(String s) { return s == null || s.isEmpty(); }
}
