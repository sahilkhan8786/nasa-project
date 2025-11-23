const http = require('http');
require('dotenv')
    .config({
        path: ['.env']
    })
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);



const startServer = async () => {
    await mongoConnect()
    await loadPlanetsData();
    await loadLaunchData()
    server.listen(PORT, () => {
        console.log(`Server is listening on PORT ${PORT}...`)
    });

};
startServer();