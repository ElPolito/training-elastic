PUT _plugins/_rollup/jobs/risf_test
{
	"rollup": {
		"source_index": "kf-risf-ci-galaxion-salt-2023.01.10",
		"target_index": "<rollup-risf_{now/d}>",
		"schedule": {
			"interval": {
				"period": 1,
				"unit": "Minutes"
			}
		},
		"description": "Example rollup job",
		"enabled": true,
		"page_size": 200,
		"delay": 0,
		"continuous": true,
		"dimensions": [{
			"date_histogram": {
				"source_field": "@timestamp",
				"fixed_interval": "1h",
        		"timezone": "America/Los_Angeles"
			}
		}]
	}
}



PUT _plugins/_ism/policies/risf_retention_test?if_seq_no=71335853&if_primary_term=5
{
	"policy": {
		"description": "This policy handle retention in RISF",
		"default_state": "hot",
		"states": [
			{
				"name": "hot",
				"actions": [],
				"transitions": [
					{
						"state_name": "warm",
						"conditions": {
							"min_index_age": "5m"
						}
					}
				]
			},
			{
				"name": "warm",
				"actions": [
					{
						"read_only": {}
					},
					{
						"replica_count": {
							"number_of_replicas": 1
						}
					}
				],
				"transitions": [
					{
						"state_name": "cold",
						"conditions": {
							"min_index_age": "10m"
						}
					}
				]
			},
			{
				"name": "cold",
				"actions": [
					{
						"rollup": {
                            "ism_rollup": {
                                "description": "Creating rollup through ISM",
                                "target_index": "kf-risf-cold",
                                "page_size": 1000,
                                "dimensions": [
                                    {
                                        "date_histogram": {
                                            "fixed_interval": "60m",
                                            "source_field": "@timestamp",
                                            "timezone": "America/Los_Angeles"
                                        }
                                    },
                                    {
                                        "terms": {
                                            "source_field": "env.keyword",
                                            "target_field": "env"
                                        }
                                    }
                                ],
                                "metrics": [
                                    {
                                        "source_field": "topic.keyword",
                                        "metrics": [
                                            {
                                                "value_count": {}
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
					}
				]
			}
		],
		"ism_template": {
			"index_patterns": [
				"kf-risf-ci-galaxion-salt-*"
			],
			"priority": 10000
		}
	}
}




// Hot
// Warm => read only, number of replicas = 1, number of shards = 1
// Cold => one big index