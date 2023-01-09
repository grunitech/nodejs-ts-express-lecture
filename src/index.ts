import config from './config';
import { connect } from './db';
import app from './app';

// this module is not testable!
// setup function for our express application
async function main() {
    // lets read our application configuration
    const {db, host, port} = config();

    // use the configuration to connect the database
    await connect(db);

    // use the configuration to start listening
    app.listen(port, host, () => console.log('server is running'));
}

// start the application
main().catch(console.log);


