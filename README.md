# Zendesk Extension for Quiq Message-UI


This is an example of a custom extension for the **Quiq Message-UI** built using the [Quiq Extension SDK](https://github.com/Quiq/ui-extensions).  

This extension is designed to integrate with a Zendesk CRM account to display the ticket history for an incoming customer service request via SMS.  It is written in Angular based on the [QuickStart Seed](https://angular.io/guide/setup) setup.

## Usage

The app makes use of Zendesk's implicit grant OAuth flow to access an organization's Zendesk Support account.  It uses the the Quiq Extension SDK to access the **Contact object**, a member of the **Quiq object** that is exported by the, along with the [Zendesk Search API](https://developer.zendesk.com/rest_api/docs/core/search) to pull up any previous tickets requested by a Zendesk End User.  The SDK is loaded in `./index.html`.

### Running Locally

The app is designed to run inside an iFrame within the context of the Quiq Message-UI.  However it can be configured to run locally to test the integration with Zendesk.  To configure the app for your Zendesk support instance, navigate to `src/app/envs.service.ts` and set the appropriate names.  Note that you will have to register the app with your Zendesk Support instance ahead of time, specifying the `CLIENT_ID` and the `REDIRECT_URI`.  `REDIRECT_URI` should be set to `http://localhost:3000/oauth`.

Make sure to run the commands `npm install` and `npm update`, then start the dev server with `npm start`.  

When running locally the code will skip the call to to Quiq Extension SDK and call the Zendesk Search API with a name set in `src/app/envs.service.ts`.
If you have custom Zendesk fields you can map their ID to a meaningful name in this file as well.
You should also set `END_USER` to a name of one of your Zendesk Support end-users.

Ticket history is sorted by the `updated_at` property of a Zendesk ticket.  Each ticket header has a color coded badge based on ticket status and priority (solved and closed tickets are dark grey, otherwise tickets are colored according to priority) and an icon representing the medium through which the end user requested the ticket.
