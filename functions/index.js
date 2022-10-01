const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const functions = require("firebase-functions");

const googleCredentials = require("./credentials.json");

const ERROR_MESSAGE = {
  status: "500",
  message: "There was an error adding the event to your calendar",
};

const TIME_ZONE = "PST";

exports.addEventListener = functions.https.onRequest((req, res) => {
  const eventData = {
    eventName: req.body.eventName,
    description: req.body.description,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  const oAuth2Client = new OAuth2(
    googleCredentials.web.client_id,
    googleCredentials.web.client_secret,
    googleCredentials.web.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
    refresh_token: googleCredentials.web.refresh_token,
  });

  addEvent(eventData, oAuth2Client)
    .then((data) => {
      res.status(200).send(data);
      return;
    })
    .catch((err) => {
      console.error("Error adding event: " + err.message);
      res.status(500).send(ERROR_MESSAGE);
      return;
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
