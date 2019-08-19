const firebase = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');

firebase.initializeApp ({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://jayapruebatecnica.firebaseio.com'
});

var db = firebase.database();
module.exports = {

    /**
     * create a new log in database
     */
    setNewLog: (log) => {
        db.ref('/logs/logs').push(log);
    }
}