#!/bin/bash

response=$(curl --request POST \
--url https://api.qase.io/v1/run/DEMO \
--header 'Token: 67a704604fda399800d330232852c63437d572a680f3213fa3fed51027c08d23' \
--header 'accept: application/json' \
--header 'content-type: application/json' \
--data '{
"title": "API_Auto_Test_Merchant",
"is_autotest": true,
"tags": ["APiAutoTest"]
}')

echo "Response: $response"

run_id=$(echo "$response" | grep -o '"id":[0-9]*' | cut -d':' -f2)

if [ -z "$run_id" ]; then
echo "Не удалось получить ID созданного прогона из ответа."
exit 1
fi

export QASE_TESTOPS_RUN_ID=$run_id

echo "QASE_TESTOPS_RUN_ID=$run_id" >> $GITHUB_ENV

newman run example_collection.json -r qase,cli
