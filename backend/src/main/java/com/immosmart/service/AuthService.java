package com.immosmart.service;

import com.immosmart.exception.ApiException;
import com.immosmart.model.Requetes;
import com.immosmart.model.User;
import com.immosmart.repository.VisiteurUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Logique de connexion et d'inscription
@Service
public class AuthService {

    private final VisiteurUserRepository users;
    private final PasswordEncoder enc;

    public AuthService(VisiteurUserRepository users, PasswordEncoder enc) {
        this.users = users;
        this.enc = enc;
    }

    public User login(Requetes.Login req) {
        String email = nz(req.email());
        User u = users.findByEmail(email).orElse(null);

        if (u == null || !enc.matches(nz(req.motDePasse()), nz(u.getMotDePasse())))
            throw new ApiException(401, "Identifiants incorrects");

        switch (nz(u.getStatut())) {
            case "en_attente" -> throw new ApiException(403, "Votre compte est en attente de validation par l'administrateur");
            case "suspendu"   -> throw new ApiException(403, "Votre compte est suspendu");
            case "refuse"     -> throw new ApiException(403, "Votre compte a été refusé");
            default -> { }
        }
        return u;
    }

    @Transactional
    public void register(Requetes.Register req) {
        if (nz(req.nom()).isEmpty() || nz(req.email()).isEmpty() || nz(req.motDePasse()).isEmpty())
            throw new ApiException(400, "Champs obligatoires manquants");

        if (users.existsByEmail(req.email()))
            throw new ApiException(409, "Email déjà utilisé");

        User u = new User();
        u.setNom(req.nom());
        u.setPrenom(nz(req.prenom()));
        u.setEmail(req.email());
        u.setMotDePasse(enc.encode(req.motDePasse()));
        u.setTelephone(nz(req.telephone()));
        // utilisateur par défaut ; on n'autorise que utilisateur ou annonceur (jamais admin)
        u.setRole("annonceur".equals(req.role()) ? "annonceur" : "utilisateur");
        u.setStatut("en_attente");
        users.save(u);
    }

    public User me(long id) {
        return users.findById(id).orElseThrow(() -> new ApiException(401, "Non authentifié"));
    }

    private static String nz(String s) { return s == null ? "" : s; }
}
