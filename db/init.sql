-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 nov. 2026 à 18:27
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `immosmart`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonce`
--

CREATE TABLE `annonce` (
  `id` int(11) NOT NULL,
  `titre` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `prix` decimal(12,2) NOT NULL,
  `surface` int(11) DEFAULT NULL,
  `nombre_pieces` int(11) DEFAULT NULL,
  `etat` varchar(50) DEFAULT NULL,
  `statut` enum('en_attente','validee','refusee','desactivee') DEFAULT 'en_attente',
  `type_transaction_id` int(11) DEFAULT NULL,
  `categorie_id` int(11) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `annonce`
--

INSERT INTO `annonce` (`id`, `titre`, `description`, `prix`, `surface`, `nombre_pieces`, `etat`, `statut`, `type_transaction_id`, `categorie_id`, `region_id`, `user_id`, `date_creation`) VALUES
(2, 'Appartement S+3 haut standing centre-ville', 'Appartement de 120m² au 4ème étage avec ascenseur. Très lumineux, il comprend 3 chambres, un double salon, une cuisine équipée et une terrasse avec vue dégagée. Proche de toutes commodités (métro, commerces, écoles).', 280000.00, 127, 4, 'Très bon état', 'refusee', 2, 1, 2, 2, '2026-10-17 13:41:39'),
(3, 'Magnifique Villa avec piscine à La Marsa', 'Superbe villa moderne de 300m² située dans un quartier calme et sécurisé. Elle dispose de 5 chambres spacieuses, d\'un grand salon lumineux, d\'une cuisine américaine équipée et d\'une magnifique piscine extérieure. Parfait pour une famille.', 1250000.00, 300, 6, 'Neuf', 'validee', 2, 3, 1, 2, '2026-10-17 14:07:37'),
(5, 'Villa moderne avec jardin à Sfax', 'Belle villa de 250m² située dans un quartier résidentiel calme à Sfax. Elle dispose de 4 chambres, d\'un grand salon, d\'une cuisine équipée et d\'un beau jardin. Idéal pour une famille.', 650000.00, 250, 5, 'Neuf', 'validee', 2, 3, 3, 2, '2026-11-07 15:10:31'),
(6, 'Appartement S+2 proche de la plage à Sousse', 'Appartement lumineux de 110m² situé à 5 minutes de la plage de Boujaafar. Il comprend 2 chambres, un salon spacieux, une cuisine aménagée et un balcon avec vue dégagée.', 800.00, 110, 3, 'Bon état', 'validee', 1, 1, 5, 2, '2026-11-07 15:12:25'),
(7, 'Duplex haut standing avec terrasse à Tunis', 'Magnifique duplex de 180m² situé dans un quartier calme et sécurisé de Tunis. Il dispose de 3 chambres spacieuses, d\'un grand salon, d\'une cuisine américaine équipée et d\'une superbe terrasse de 40m². Idéal pour une famille.', 480000.00, 180, 4, 'Neuf', 'validee', 2, 1, 1, 7, '2026-11-07 16:12:58');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`) VALUES
(1, 'Appartement'),
(2, 'Maison'),
(3, 'Villa'),
(5, 'Terrain');

-- --------------------------------------------------------

--
-- Structure de la table `demande_contact`
--

CREATE TABLE `demande_contact` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `expediteur_id` int(11) DEFAULT NULL,
  `destinataire_id` int(11) DEFAULT NULL,
  `annonce_id` int(11) DEFAULT NULL,
  `date_envoi` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `demande_contact`
--

INSERT INTO `demande_contact` (`id`, `message`, `expediteur_id`, `destinataire_id`, `annonce_id`, `date_envoi`) VALUES
(1, 'Bonjour, je suis très intéressée par votre bien. Serait-il possible d\'organiser une visite ce week-end ou en début de semaine prochaine ? Merci d\'avance pour votre retour. Cordialement, Fatma Trabelsi.\n\n--- Réponse ---\n  \nBonjour Fatma,\n\nBienvenue et merci beaucoup pour votre intérêt porté à notre villa à La Marsa.\nJe serais ravi de vous organiser une visite pour vous faire découvrir le bien.\nProposez-moi vos disponibilités (par exemple ce week-end), et je m\'adapte à votre emploi du temps.\n\nCordialement,\nAhmed', 3, 2, 3, '2026-11-07 14:56:46'),
(2, 'Bonjour, je suis intéressé par ce bien', 3, 7, 7, '2026-11-22 23:38:33');

-- --------------------------------------------------------

--
-- Structure de la table `favori`
--

CREATE TABLE `favori` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `annonce_id` int(11) NOT NULL,
  `date_ajout` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `favori`
--

INSERT INTO `favori` (`id`, `user_id`, `annonce_id`, `date_ajout`) VALUES
(6, 3, 7, '2026-11-22 23:38:58');

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `annonce_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `photo` (`id`, `url`, `annonce_id`) VALUES
(3, 'http://localhost/immosmart/uploads/1792240942_ariana.jpg', 2),
(4, 'http://localhost/immosmart/uploads/1792242467_marsa.jpg', 3),
(5, 'http://localhost/immosmart/uploads/1792242471_marsa1.jpg', 3),
(15, 'http://localhost/immosmart/uploads/1794060686_sfax.jpg', 5),
(16, 'http://localhost/immosmart/uploads/1794060788_images1.jpg', 6),
(17, 'http://localhost/immosmart/uploads/1794064426_images4.jpg', 7),
(18, 'http://localhost/immosmart/uploads/1794064437_images2.jpg', 7);

-- --------------------------------------------------------

--
-- Structure de la table `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `region`
--

INSERT INTO `region` (`id`, `nom`) VALUES
(1, 'Tunis'),
(2, 'Ariana'),
(3, 'Sfax'),
(5, 'Sousse');

-- --------------------------------------------------------

--
-- Structure de la table `type_bien`
--

CREATE TABLE `type_bien` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_bien`
--

INSERT INTO `type_bien` (`id`, `nom`) VALUES
(1, 'Appartement'),
(2, 'Maison'),
(3, 'Villa'),
(4, 'Terrain');

-- --------------------------------------------------------

--
-- Structure de la table `type_transaction`
--

CREATE TABLE `type_transaction` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_transaction`
--

INSERT INTO `type_transaction` (`id`, `nom`) VALUES
(1, 'Location'),
(2, 'Vente');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `role` enum('admin','annonceur','utilisateur') DEFAULT 'utilisateur',
  `statut` enum('en_attente','actif','suspendu','refuse') DEFAULT 'en_attente',
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `telephone`, `role`, `statut`, `date_creation`) VALUES
(1, 'Admin', 'System', 'admin@immosmart.com', '$2y$10$zuMN5mEDtXRnuMjX6gRohO/8WHLWcHPUgrxmwkNIaiqYSbZcq3Wda', '26453126', 'admin', 'actif', '2026-10-15 17:13:35'),
(2, 'Ben Ali', 'Ahmed', 'ahmed@immosmart.com', '$2y$10$0VoWw4wlby487DMQlGM7KOvonkBKV8./Omh8ZXN39wMM764Cjc4ei', '26545123', 'annonceur', 'actif', '2026-10-15 17:13:35'),
(3, 'Trabelsi', 'Fatma', 'fatma@immosmart.com', '$2y$10$zuMN5mEDtXRnuMjX6gRohO/8WHLWcHPUgrxmwkNIaiqYSbZcq3Wda', '23546721', 'utilisateur', 'actif', '2026-10-15 17:13:35'),
(7, 'Ben Salem', 'Salma', 'salma@immosmart.com', '$2y$10$XdRlXL6g5pzem6oj0qHxsObCwxgl7D0cosXLbvyfAkELa/x/sOk9y', '56478123', 'annonceur', 'actif', '2026-10-17 14:26:53'),
(9, 'Bensalah', 'Rim', 'bensalahrimeh@immosmart.com', '$2y$10$OX1xlHfbtvhFkXmcIQGDW.BXFssVpeypoDzolvTsUC/wT83.I7bFa', '29588860', 'utilisateur', 'refuse', '2026-11-21 20:41:31'),
(10, 'Bensalah', 'Rim', 'rim@immosmart.com', '$2y$10$9mv4VCbYiz.w8iyDIxEUWeab6vmFvqHXOhXuEOoTaOMINv13hx9M.', '29588860', 'utilisateur', 'suspendu', '2026-11-21 20:43:06'),
(11, 'Ben Ali', 'Salah', 'salah@immosmart.com', '$2y$10$8L9gxd.ld8VifCjqbXjYk.lNzjWX/a1dTrdvxZKeTbn/88.Xzv0H6', '26965784', 'annonceur', 'en_attente', '2026-11-21 20:44:29');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_transaction_id` (`type_transaction_id`),
  ADD KEY `categorie_id` (`categorie_id`),
  ADD KEY `region_id` (`region_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `demande_contact`
--
ALTER TABLE `demande_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expediteur_id` (`expediteur_id`),
  ADD KEY `destinataire_id` (`destinataire_id`),
  ADD KEY `annonce_id` (`annonce_id`);

--
-- Index pour la table `favori`
--
ALTER TABLE `favori`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favori` (`user_id`,`annonce_id`),
  ADD KEY `annonce_id` (`annonce_id`);

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `annonce_id` (`annonce_id`);

--
-- Index pour la table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_bien`
--
ALTER TABLE `type_bien`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_transaction`
--
ALTER TABLE `type_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annonce`
--
ALTER TABLE `annonce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `demande_contact`
--
ALTER TABLE `demande_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `favori`
--
ALTER TABLE `favori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `type_bien`
--
ALTER TABLE `type_bien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `type_transaction`
--
ALTER TABLE `type_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`type_transaction_id`) REFERENCES `type_transaction` (`id`),
  ADD CONSTRAINT `annonce_ibfk_3` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `annonce_ibfk_4` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`),
  ADD CONSTRAINT `annonce_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `demande_contact`
--
ALTER TABLE `demande_contact`
  ADD CONSTRAINT `demande_contact_ibfk_1` FOREIGN KEY (`expediteur_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `demande_contact_ibfk_2` FOREIGN KEY (`destinataire_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `demande_contact_ibfk_3` FOREIGN KEY (`annonce_id`) REFERENCES `annonce` (`id`);

--
-- Contraintes pour la table `favori`
--
ALTER TABLE `favori`
  ADD CONSTRAINT `favori_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favori_ibfk_2` FOREIGN KEY (`annonce_id`) REFERENCES `annonce` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`annonce_id`) REFERENCES `annonce` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
