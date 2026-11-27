package com.immosmart.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Sert les photos : http://localhost:8081/uploads/nom_du_fichier.jpg
@Configuration
public class UploadsConfig implements WebMvcConfigurer {

    @Value("${app.uploads-dir}")
    private String dossier;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        try {
            Path p = Path.of(dossier).toAbsolutePath();
            Files.createDirectories(p);
            registry.addResourceHandler("/uploads/**").addResourceLocations(p.toUri().toString());
        } catch (IOException e) {
            throw new IllegalStateException("Impossible de créer le dossier uploads", e);
        }
    }
}
