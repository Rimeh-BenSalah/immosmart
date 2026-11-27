#!/bin/bash

# ==========================================
# ImmoSmart - Vérification automatique
# ==========================================

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0

echo "======================================"
echo "       VERIFICATION IMMOSMART"
echo "======================================"

# 1. Vérifier Java
echo ""
echo "[1/5] Vérification de Java..."

if command -v java >/dev/null 2>&1; then
    java -version
    echo "OK : Java est installé."
else
    echo "ERREUR : Java n'est pas installé."
    ERRORS=$((ERRORS + 1))
fi

# 2. Vérifier Maven
echo ""
echo "[2/5] Vérification de Maven..."

if command -v mvn >/dev/null 2>&1; then
    mvn -version
    echo "OK : Maven est installé."
else
    echo "ERREUR : Maven n'est pas installé."
    ERRORS=$((ERRORS + 1))
fi

# 3. Vérifier le backend
echo ""
echo "[3/5] Vérification du backend..."

if [ -f "$PROJECT_ROOT/backend/pom.xml" ]; then
    echo "OK : backend/pom.xml existe."
else
    echo "ERREUR : backend/pom.xml est introuvable."
    ERRORS=$((ERRORS + 1))
fi

# 4. Vérifier le fichier SQL
echo ""
echo "[4/5] Vérification de la base de données..."

if [ -f "$PROJECT_ROOT/db/init.sql" ]; then
    echo "OK : db/init.sql existe."
else
    echo "ERREUR : db/init.sql est introuvable."
    ERRORS=$((ERRORS + 1))
fi

# 5. Exécuter les tests du backend
echo ""
echo "[5/5] Exécution des tests du backend..."

if command -v mvn >/dev/null 2>&1 && [ -f "$PROJECT_ROOT/backend/pom.xml" ]; then
    cd "$PROJECT_ROOT/backend"

    if mvn -B test; then
        echo "OK : tous les tests sont réussis."
    else
        echo "ERREUR : les tests du backend ont échoué."
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "Tests ignorés : Maven ou le backend est indisponible."
    ERRORS=$((ERRORS + 1))
fi

# Résultat final
echo ""
echo "======================================"

if [ "$ERRORS" -eq 0 ]; then
    echo "SUCCES : toutes les vérifications sont passées."
else
    echo "ECHEC : $ERRORS vérification(s) ont échoué."
fi

echo "======================================"

exit "$ERRORS"
