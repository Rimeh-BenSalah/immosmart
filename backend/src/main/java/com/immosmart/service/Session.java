package com.immosmart.service;

// Utilisateur connecté (équivalent de $_SESSION['user_id'] et $_SESSION['role'])
public record Session(long id, String role) {}
