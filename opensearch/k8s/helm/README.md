# Helm

## Install Helm repo

```
helm repo add opensearch https://opensearch-project.github.io/helm-charts/
```

## Deploy master node

```
helm install opensearch-master opensearch/opensearch -f ./k8s/helm/master.yml
```

## Deploy data nodes

### Content nodes

```
helm install opensearch-data-content opensearch/opensearch -f ./k8s/helm/data-content.yml
```


## Deploy client node

```
helm install opensearch-master opensearch/opensearch -f ./k8s/helm/client.yml
```

Access the client node (*http://localhost:9201*)

```
kubectl port-forward opensearch-cluster-client-0 9201:9200
```

## Cleanup


