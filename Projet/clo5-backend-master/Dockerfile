# Utiliser une image de base contenant Node.js
FROM node:latest

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le yarn.lock pour installer les dépendances
COPY package.json yarn.lock ./

# Installer les dépendances avec Yarn
RUN yarn install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["yarn", "start"]