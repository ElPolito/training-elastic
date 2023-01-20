PUT {{url}}/_plugins/_ism/policies/retention
{
	"policy": {
		"description": "This policy handle retention",
		"default_state": "hot",
		"states": [
			{
				"name": "hot",
				"actions": [],
				"transitions": [
					{
						"state_name": "warm",
						"conditions": {
							"min_index_age": "2m"
						}
					}
				]
			},
			{
				"name": "warm",
				"actions": [
					{
						"rollover": {}
					},
                    {
						"replica_count": {
							"number_of_replicas": 1
						}
					},
                    {
                        "index_priority": {
                            "priority": 75
                        }
                    },
                    {
                        "allocation": {
                            "require": { 
                                "temp": "warm" 
                            }
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
                        "allocation": {
                            "require": { 
                                "temp": "cold" 
                            }
                        }
                    },
                    {
						"replica_count": {
							"number_of_replicas": 0
						}
					},
                    {
                        "index_priority": {
                            "priority": 50
                        }
                    },
                    {
                        "force_merge": {
                            "max_num_segments": 1
                        }
                    },
                    {
                        "shrink": {
                            "num_new_shards": 1,
                            "force_unsafe": true
                        }
                    }
				],
                "transitions": [
					{
						"state_name": "frozen",
						"conditions": {
							"min_index_age": "12m"
						}
					}
				]
			},
            {
                "name": "frozen",
                "actions": [
                    {
                        "allocation": {
                            "require": {
                                "temp": "cold"
                            }
                        }
                    },
                    {
                        "index_priority": {
                            "priority": 25
                        }
                    },
                    {
                        "snapshot": {
                            "repository": "logstash-snapshots",
                            "snapshot": ""
                        }
                    }
                ]
            }
		],
        "ism_template": {
			"index_patterns": [
				"*logstash-*"
			],
			"priority": 10000
		}
	}
}