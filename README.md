## Todo_App_Client

### Front-end de Todo_App_API

### Configuration et lancement de l'application

Il faut d'abord créer un fichier '.env' à la racine du repo Todo_App_API, avec les variables suivantes: 

- PORT= 
- AUTH0_AUDIENCE=''
- AUTH0_DOMAIN='' 
- DATABASE_LOCAL='mongodb://localhost:27017/VOTRENOMDEDATABASE'
- AUTH0_ISSUER = 'https://DOMAINE'

Dans le répertoire Middlewares , le fichier checkJwt, la variable jwtURI à modifier en mettant son AUTH0_ISSUER.

A la racine du répertoire Todo_App_client, il faut créer un fichier '.env' avec les variables suivantes (aucune apostrophe dans le contenu): 

- REACT_APP_AUTH0_DOMAIN=
- REACT_APP_AUTH0_CLIENT_ID=
- REACT_APP_API_URL=http://localhost:PORT/api/
- REACT_APP_AUTH0_AUDIENCE=


Il faut avoir MongoDB sur sa machine, ensuite pour l'exécuter, entrez la commande suivante dans un terminal: 

- ```mongod```

Pour lancer l'application côté client, il faut aller dans le repo Todo_App_Client et entrez les commandes suivantes dans un second terminal:

- ```yarn install```
- ```yarn start```
 
Se placer ensuite dans le repo Todo_App_API et entrez les commandes suivantes dans un troisème terminal:

- ```npm install```
- ```npm run dev```


##### Bonne visite!


