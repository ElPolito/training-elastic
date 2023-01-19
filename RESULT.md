# Resultats

Présentation des résultats suite à la formation sur la suite Elastic (Elasticsearch, Logstash, Kibana, Beats) et la comparaison avec Opensearch.

## Elasticsearch

### Présentation

- Base de données NoSQL
- Repose sur le moteur Apache Lucene
- Permet de gérer un nombre très important de données
- Utile pour la recherche textuelle et le big data

### Nodes

- Machine physique
- Différents types de nodes
  - Master
  - Client
  - Data
    - Content
    - Hot
    - Cold
    - Warm
    - Frozen
  - ML, etc...
- Communiquent toutes ensembles pour créer un cluster
- Possibilité de créer plusieurs clusters et de les connecter ensemble afin de faire de la réplication cross-cluster
- Possibilité de définir des zones afin de répliquer dans les différentes zones

### Index

- Groupe de documents
- Equivalent d'une table sur une BDD relationnelle

### Sharding et réplicas

- Shards
  - Morceaux d'index
  - Permet d'augmenter les performances de recherche
  - Possibilité de cibler un shard ou un groupe de shards pour l'indexation et la recherche
  - Impossible de modifier le nombre de shards d'un index après sa création
  - 1 shard = 1 index Apache Lucene
- Réplicas
  - Duplication de shards
  - Permet d'augmenter les performances de recherche lorsqu'il y a beaucoup de requêtes simultanées
  -  Il y a toujours des shards primaires qui s'occupent de l'indexation
  -  Résiliance à la panne
  -  Les réplicas ne peuvent pas être situés sur le même node que le shard principal

### Data stream

- Une sorte d'alias pour un index
- Permet de gérer automatiquement les indices
- Le data stream est créé par rapport à un template d'index
- Le template d'index définit :
  - Le mapping des champs
  - Le nombre de shards
  - Le nombre de réplicas
  - Des options spéciales pour le routing ou les politiques de gestion de l'index
- Il est possible de faire une rollover sur le datastream afin de créer un nouvel index qui va être responsable d'ingérer les prochaines données
- Ceci peut être utile pour générer automatiquement des nouveaux indices en fonction de règles définies dans une politique de gestion

### Politique de gestion des indices

- Permet de gérer le cycle de vie d'un index
- Définit un ensemble de phases
- Actions à effectuer pour chacune des phases
  - Rollover
  - Rollup
  - Snapshot
  - Modification du noeud
  - Modification du nombre de réplicas
  - Réindexation avec un certain nombre de shards
  - etc...
- Conditions de transition d'une phase à une autre
  - Age de l'index
  - Nombre de documents
  - Taille de l'index
  - Taille des shards
  - etc...
- Possibilité d'affecter une politique à un ensemble d'indices grâce à un wildcard

### Snapshots

<color style="color: red">TODO</color>

## Kibana

### Rollup

- Permet de créer des agrégats à partir d'un index
- Permet 

<color style="color: red">TODO</color>

## Logstash

### Présentation

- Outil pour la collecte et la transformation de logs
- Repose sur trois phases
  - Input
  - Filter
  - Output
- Permet de définir des pipelines différentes en fonction des types de logs

### Input

- Source des données en entrée
- De nombreux plugins existent pour gérer différentes situations
  - Fichiers
  - Beats
  - Http
  - Kafka
  - RabbitMQ
  - etc...
- Le codec permet de transformer les données dès maintenant notamment si c'est du texte au format json
- Il est possible de gérer des logs multilignes en spécifiant les patterns de début ou de milieu des logs

### Filter

- Modifie le format des logs
- Permet d'extraire les données d'un texte
- Permet de changer le type des données (int, float, ...)
- Permet d'extraire d'autres données (geoip)
- Liste de plugins intéressants :
  - Grok : permet l'extraction de données depuis un texte
  - Date : permet de gérer les dates
  - Mutate : permet d'effectuer des transformations
    - Conversion de type
    - Suppression de champs
    - Ajout de champs
  - Geoip : permet d'extraire des informations à partir d'une adresse IP
  - Useragent : permet d'extraire des informations à partir d'un user agent

### Output



### Pipeline

## Beats

## Elastic vs Opensearch

| Fonctionnalité | Elastic | Opensearch | Résultat |
|----------------|---------|------------|----------|
| ***Elasticsearch et Opensearch*** ||||
| Rollup         | Test    | Test       | Test     | 
| ***Kibana et Opensearch dashboards*** ||||
| ***Logstash*** ||||
| ***Beats*** ||||