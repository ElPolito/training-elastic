const fs = require('fs');
const path = require('path');
const http = require('http');


const directory = path.resolve(process.cwd(), process.argv[2]);
const type = process.argv[3];
const kibana_url = process.argv[4];

const files = fs.readdirSync(directory);

for (const file of files) {
    const file_path = path.resolve(directory, file);
    const stat = fs.statSync(file_path);
    if (stat.isFile()) {
        switch(type) {
            case 'visualization': {
                let req_data = JSON.parse(fs.readFileSync(file_path));
                req_data.migrationVersion.visualization = '7.9.3';
                req_data.attributes.kibanaSavedObjectMeta.searchSourceJSON = JSON.stringify(req_data.attributes.kibanaSavedObjectMeta.searchSourceJSON);
                req_data.attributes.uiStateJSON = JSON.stringify(req_data.attributes.uiStateJSON);
                req_data.attributes.visState = JSON.stringify(req_data.attributes.visState);
                req_data = {
                    objects: [req_data]
                };
                const req = http.request({
                    method: 'POST',
                    hostname: kibana_url,
                    port: 5601,
                    path: `/api/opensearch-dashboards/dashboards/import`,
                    headers: {
                        'osd-xsrf': 'true',
                        'Content-Type': 'application/json'
                    },
                }, (res) => {
                    let data = '';
                    res.on('data', d => {
                        data += d;
                    })

                    res.on('end', () => {
                        data = JSON.parse(data);
                        const error = data.objects[0].error;
                        if (error) {
                            console.log(`ERROR - Visualization ${data.objects[0].id} creation failed - ${error.error} - ${error.statusCode} - ${error.message}`)
                        } else {
                            console.log(`SUCCESS - Visualization ${data.objects[0].id} created`)
                        }
                    })
                });
                req.write(JSON.stringify(req_data));
                req.end();
                break;
            }
            case 'dashboard': {
                let req_data = JSON.parse(fs.readFileSync(file_path));
                req_data.migrationVersion.dashboard = '7.9.3';
                req_data.attributes.kibanaSavedObjectMeta.searchSourceJSON = JSON.stringify(req_data.attributes.kibanaSavedObjectMeta.searchSourceJSON);
                req_data.attributes.optionsJSON = JSON.stringify(req_data.attributes.optionsJSON);
                req_data.attributes.panelsJSON = JSON.stringify(req_data.attributes.panelsJSON);
                req_data = {
                    objects: [req_data]
                };
                const req = http.request({
                    method: 'POST',
                    hostname: kibana_url,
                    port: 5601,
                    path: `/api/opensearch-dashboards/dashboards/import`,
                    headers: {
                        'osd-xsrf': 'true',
                        'Content-Type': 'application/json'
                    },
                }, (res) => {
                    let data = '';
                    res.on('data', d => {
                        data += d;
                    })

                    res.on('end', () => {
                        data = JSON.parse(data);
                        const error = data.objects[0].error;
                        if (error) {
                            console.log(`ERROR - Dashboard ${data.objects[0].id} creation failed - ${error.error} - ${error.statusCode} - ${error.message}`)
                        } else {
                            console.log(`SUCCESS - Dashboard ${data.objects[0].id} created`)
                        }
                    })
                });
                req.write(JSON.stringify(req_data));
                req.end();
                break;
            }
        }

    }
}