PUT {{url}}/_snapshot/logstash-snapshots
{
    "type": "fs",
    "settings": {
        "location": "/mount/snapshots/test"
    }
}