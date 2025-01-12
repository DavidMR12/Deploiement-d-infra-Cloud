# Utilisation d'une image de base avec Node.js pré-installé
FROM node:latest

# Créer le répertoire de travail de l'application
WORKDIR /app

# Copier les fichiers package.json et yarn.lock dans le répertoire de travail
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier tout le code source dans le répertoire de travail
COPY . .

# Construire l'application Next.js
RUN yarn build

# Définir le port sur lequel l'application va écouter
EXPOSE 3000

# Commande pour exécuter l'application
CMD ["yarn", "start"]