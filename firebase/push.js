var admin = require('firebase-admin');

var serviceAccount = require('../../keys/webtab-f5818-firebase-adminsdk-2s9h1-ea84e1730e.json');

function main() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://webtab-f5818.firebaseio.com',
  });

  var message = {
    data: {
      type: 'Settings',
    },
    topic: 'all',
    notification: {
      title: 'Basic Notification',
      body: 'This is a basic notification sent from the server!',
    },
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    })
    .finally(() => {
      process.exit();
    });
}

main();
