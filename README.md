# Next.js Forum Application

Une application de forum moderne construite avec Next.js 15, React 19, Prisma et PostgreSQL. Ce projet permet aux utilisateurs de créer et participer à des conversations via un système de messages.

## Technologies utilisées

- **Next.js 15.5.6** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Langage typé
- **Prisma** - ORM pour la gestion de la base de données
- **PostgreSQL** - Base de données relationnelle
- **Tailwind CSS v4** - Framework CSS utilitaire
- **Docker** - Conteneurisation de la base de données

## Structure du projet

```
nextjs-forum/
├── prisma/
│   ├── schema.prisma      # Schéma de base de données (Conversation, Message)
│   └── seed.ts            # Script de génération de données de test
├── src/
│   ├── app/               # Routes Next.js (App Router)
│   │   ├── (private)/     # Routes protégées
│   │   │   ├── account/
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/        # Composants React réutilisables
│   │   └── post/
│   │       └── PostList.tsx
│   ├── libs/
│   │   └── prisma.ts      # Instance Prisma Client
│   └── generated/         # Code généré par Prisma
└── docker-compose.yml     # Configuration Docker (PostgreSQL + Adminer)
```

## Modèle de données

### Conversation
- `id` - Identifiant unique (CUID)
- `title` - Titre de la conversation (optionnel)
- `messages` - Relation avec les messages
- `createdAt`, `updatedAt`, `deletedAt`, `archivedAt` - Timestamps

### Message
- `id` - Identifiant unique (CUID)
- `content` - Contenu du message
- `conversationId` - Référence à la conversation
- `createdAt`, `updatedAt`, `deletedAt`, `archivedAt` - Timestamps

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Docker](https://www.docker.com/) et Docker Compose
- npm ou yarn

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd nextjs-forum
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env` à la racine du projet :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forum?schema=public"
```

### 4. Démarrer la base de données

Lancer PostgreSQL et Adminer via Docker :

```bash
docker compose up -d
```

Services disponibles :
- **PostgreSQL** : `localhost:5432`
- **Adminer** (interface d'administration) : `http://localhost:8080`

### 5. Initialiser la base de données

Créer les tables à partir du schéma Prisma :

```bash
npx prisma db push
```

Ou créer une migration :

```bash
npx prisma migrate dev --name init
```

### 6. Générer le client Prisma

```bash
npx prisma generate
```

### 7. Peupler la base de données (optionnel)

Générer des données de test (10 conversations avec 5 messages chacune) :

```bash
npm run seed
```

### 8. Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## Commandes utiles

### Développement

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Compiler le projet pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Linter le code
```

### Prisma

```bash
npx prisma studio              # Ouvrir l'interface graphique Prisma
npx prisma db push             # Synchroniser le schéma sans migration
npx prisma migrate dev         # Créer et appliquer une migration
npx prisma migrate reset       # Réinitialiser la base de données
npx prisma generate            # Générer le client Prisma
npm run seed                   # Peupler la base de données
```

### Docker

```bash
docker compose up -d           # Démarrer les services
docker compose down            # Arrêter les services
docker compose logs -f         # Voir les logs en temps réel
```

## Accès à Adminer

Adminer est un outil d'administration de base de données accessible via le navigateur :

- URL : `http://localhost:8080`
- Système : `PostgreSQL`
- Serveur : `postgres`
- Utilisateur : `postgres`
- Mot de passe : `postgres`
- Base de données : `forum`

## Architecture

Ce projet utilise :
- **App Router** de Next.js 15 avec routes groupées `(private)` pour les pages protégées
- **Server Components** par défaut pour de meilleures performances
- **Prisma Client** personnalisé généré dans `src/generated/prisma`
- **Tailwind CSS v4** pour le styling
- **ESLint** pour la qualité du code

## Réinitialiser les données

Pour réinitialiser complètement la base de données :

```bash
npx prisma migrate reset --force
```

Cette commande va :
1. Supprimer la base de données
2. Recréer la base de données
3. Appliquer toutes les migrations
4. Exécuter le script de seed automatiquement

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
