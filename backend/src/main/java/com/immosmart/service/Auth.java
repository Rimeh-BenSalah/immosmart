package com.immosmart.service;

import com.immosmart.exception.ApiException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

/**
 * Remplace la session PHP.
 * Le login (AuthController) pose un cookie signé "immosmart_token".
 * Toutes les routes de l'application vérifient la signature avec la clé app.secret.
 */
@Component
public class Auth {

    public static final String COOKIE = "immosmart_token";
    private static final long DUREE_SECONDES = 12 * 3600;

    @Value("${app.secret}")
    private String secret;

    // ----- login / logout -----
    public void connecter(HttpServletResponse res, long id, String role) {
        String payload = id + ":" + role + ":" + (System.currentTimeMillis() / 1000 + DUREE_SECONDES);
        String token = b64(payload.getBytes(StandardCharsets.UTF_8)) + "." + b64(hmac(payload));
        poser(res, token, -1);
    }

    public void deconnecter(HttpServletResponse res) {
        poser(res, "", 0);
    }

    private void poser(HttpServletResponse res, String valeur, long maxAge) {
        ResponseCookie c = ResponseCookie.from(COOKIE, valeur)
                .httpOnly(true).path("/").sameSite("Lax").maxAge(maxAge).build();
        res.addHeader(HttpHeaders.SET_COOKIE, c.toString());
    }

    // ----- équivalents de verifierAuth() et verifierRole() -----
    public Session verifierAuth(HttpServletRequest req) {
        Session s = lire(req);
        if (s == null) throw new ApiException(401, "Non authentifié");
        return s;
    }

    public Session verifierRole(HttpServletRequest req, String... roles) {
        Session s = verifierAuth(req);
        for (String r : roles) if (r.equals(s.role())) return s;
        throw new ApiException(403, "Accès refusé");
    }

    private Session lire(HttpServletRequest req) {
        if (req.getCookies() == null) return null;
        for (Cookie c : req.getCookies()) {
            if (!COOKIE.equals(c.getName())) continue;
            try {
                String[] parts = c.getValue().split("\\.");
                String payload = new String(Base64.getUrlDecoder().decode(parts[0]), StandardCharsets.UTF_8);
                if (!MessageDigest.isEqual(hmac(payload), Base64.getUrlDecoder().decode(parts[1]))) return null;
                String[] p = payload.split(":");
                if (Long.parseLong(p[2]) < System.currentTimeMillis() / 1000) return null;
                return new Session(Long.parseLong(p[0]), p[1]);
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }

    private byte[] hmac(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private static String b64(byte[] b) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(b);
    }
}
