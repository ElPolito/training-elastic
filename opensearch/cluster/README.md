# Run Opensearch cluster with Docker Compose

## Start the master node

```
docker-compose -f .\cluster\docker-compose.yml up opensearch-master
```

## Start the data nodes

```
docker-compose -f .\cluster\docker-compose.yml up opensearch-data-content opensearch-data-cold opensearch-data-hot-1 opensearch-data-hot-2 opensearch-data-hot-3 opensearch-data-warm-1 opensearch-data-warm-2
```

## Start the client node

```
docker-compose -f .\cluster\docker-compose.yml up opensearch-client
```

Opensearch is available at http://localhost:9200