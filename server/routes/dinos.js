const dinoRoutes = (app, fs) => {

    // variables
    const dataPath = './data/dinos.json';

    // READ
    app.get('/api/dinos', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.status(200).send(JSON.parse(data));
        });
    });

    // READ BY NAME
    app.get('/api/dinos/search/:term', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            const allData = JSON.parse(data);            
            let filteredData = [];
            const searchTerm = req.params.term.toLowerCase();

            if(searchTerm.length === 1) {
                // single character search                
                filteredData = allData.data.filter(dino => dino.name[0].toLowerCase() === searchTerm);
            } else {
                filteredData = allData.data.filter(dino => dino.name.toLowerCase().indexOf(searchTerm) >= 0);
            }

            res.status(200).send({
                data: filteredData
            });
        });
    });

    // READ SINGLE
    app.get('/api/dinos/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            try {
                const id = req.params.id;
                const allData = JSON.parse(data);
                const foundDino = allData.data.find(dino => dino._id === id);
    
                if(foundDino) {
                    res.status(200).send(foundDino);
                    return;
                }
                
                // Dino not found :(
                res.status(404).send({
                    message: "No dinosaur found with that id value"
                });
            } catch(err) {
                console.log('error fetching single dino', err);
                res.status(500).send({
                    message: "Error fetching a single dinosaur"
                });
            }            
        });
    });
};

module.exports = dinoRoutes;