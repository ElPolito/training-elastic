PUT _plugins/_ism/policies/retention
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
							"min_index_age": "15m"
						}
					}
				]
			},
			{
				"name": "cold",
				"actions": [
					{
						"delete": {}
					}
				]
			}
		],
		"ism_template": {
			"index_patterns": [
				"fluentd-*"
			],
			"priority": 100
		}
	}
}