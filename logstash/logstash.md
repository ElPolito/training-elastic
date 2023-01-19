docker run -ti --rm -v C:\Users\Paul\Documents\opensearch-test\logstash\:/app -w /app -u root --network cluster_opensearch-net logstash:8.5.3 /bin/bash


/usr/share/logstash/bin/logstash-plugin install logstash-output-opensearch

/usr/share/logstash/bin/logstash -f /app/apache.conf