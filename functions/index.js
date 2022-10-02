const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const functions = require("firebase-functions");

const googleCredentials = require("./credentials.json");
const { event } = require("firebase-functions/v1/analytics");

const ERROR_MESSAGE = {
	status: "500",
	message: "There was an error adding the event to your calendar",
};

const TIME_ZONE = "PST";

function addEvent(eventInfo, auth) {
	console.log("Before calendar insert");
	return new Promise(function (resolve, reject) {
		// console.log("#################Calling Calendar")
		// calendar.events.insert(
		// 	{
		// 		auth: auth,
		// 		calendarId: "primary",
		// 		resource: {
		// 			summary: event.eventName,
		// 			description: event.description,
		// 			start: {
		// 				date: event.startDate,
		// 				timeZone: TIME_ZONE,
		// 			},
		// 			end: {
		// 				date: event.endDate,
		// 				timeZone: TIME_ZONE,
		// 			},

		// 			location: event.location,
		// 		},
		// 	},

		// 	(err, res) => {
		// 		if (err) {
		// 			console.log("Rejecting because of error: " + err);
		// 			reject(err);
		// 		} else {
		// 			console.log("Request successful");
		// 			resolve(res.data);
		// 		}
		// 	}
		// );

		const event = {
			summary: eventInfo.eventName,
			location: eventInfo.location,
			description: eventInfo.description,
			start: {
				dateTime: eventInfo.startDate,
				// timeZone: "America/Los_Angeles",
			},
			end: {
				dateTime: eventInfo.endDate,
				// timeZone: "America/Los_Angeles",
			},
		};

		const request = calendar.events.insert(
			{
				calendarId: "primary",
				auth: auth,
				resource: event,
			},
			(err, res) => {
				if (err) {
					console.log("Rejecting because of error: " + err);
					reject(err);
				} else {
					console.log("Request successful");
					resolve(res.data);
				}
			}
		);

		// request.execute(function (event) {
		// 	appendPre("Event created: " + event.htmlLink);
		// });
	});
}

exports.addEventToCalendar = functions.https.onRequest((request, response) => {
	// console.log("request", request.body);

	const parsedData = JSON.parse(request.body);

	const eventData = {
		eventName: parsedData.eventName,
		description: parsedData.description,
		startDate: parsedData.startDate,
		endDate: parsedData.endDate,
		location: parsedData.location,
	};

	const OAuth2Client = new OAuth2(
		googleCredentials.web.client_id,
		googleCredentials.web.client_secret,
		googleCredentials.web.redirect_uris[0]
	);

	OAuth2Client.setCredentials({
		refresh_token: googleCredentials.refresh_token,
	});

	console.log("*******************eventData", eventData);
	console.log(
		"*******************refresh_token",
		googleCredentials.refresh_token
	);

	addEvent(eventData, OAuth2Client)
		.then((data) => {
			console.log("data", data);
			response.status(200).send(data);
			return;
		})
		.catch((err) => {
			console.error("Error adding event: " + err.message);
			response.status(500).send(err);
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
