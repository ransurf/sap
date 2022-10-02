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

function addEvent(event, auth) {
	return new Promise(function (resolve, reject) {
		calendar.events.insert(
			{
				auth: auth,
				calendarId: "primary",
				resource: {
					summary: event.eventName,
					description: event.description,
					start: {
						dateTime: event.startTime,
						timeZone: TIME_ZONE,
					},
					end: {
						dateTime: event.endTime,
						timeZone: TIME_ZONE,
					},

					location: event.location,
				},
			},
			(err, res) => {
				if (err) {
					console.log("Rejecting because of error");
					reject(err);
				}
				console.log("Request successful");
				resolve(res.data);
			}
		);
	});
}

exports.addEventToCalendar = functions.https.onRequest((request, response) => {
	const eventData = {
		eventName: request.body.eventName,
		description: request.body.description,
		startTime: request.body.startTime,
		endTime: request.body.endTime,
		location: request.body.location,
	};

	const oAuth2Client = new OAuth2(
		googleCredentials.web.client_id,
		googleCredentials.web.client_secret,
		googleCredentials.web.redirect_uris[0]
	);

	oAuth2Client.setCredentials({
		refresh_token: googleCredentials.refresh_token,
	});

	addEvent(eventData, oAuth2Client)
		.then((data) => {
			response.status(200).send(data);
			return;
		})
		.catch((err) => {
			console.error("Error adding event: " + err.message);
			response.status(500).send(ERROR_RESPONSE);
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
