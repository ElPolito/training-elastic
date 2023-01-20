PUT {{url}}/_index_template/logs-template
{
    "index_patterns": [
        "logstash-access"
    ],
    "priority": 100,
    "data_stream": {},
    "template": {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 1,
            "index.routing.allocation.require.temp": "hot",
            "index.plugins.index_state_management.rollover_alias": "data-logstash"
        }
    }
}