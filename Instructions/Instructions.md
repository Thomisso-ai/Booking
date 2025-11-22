# Instructions

## Project description
Purpose of this project is to create a webpage, which will allow users to search for available hotel rooms, challets, appartments, houses and other accommodations. Users will be able to find available accommodations for a specific period of time (date from / date to). User will be albe to enter number of adults and children, as well as check-in and check-out dates. User will be able to search for accommodations and see the results in a list. User will be able to click on a specific accommodation to see more details and book it. There will be link to the information source (like booking.com, airbnb.com, etc.). User will be able to provide information about their location preferences (city, country, etc.), price range, number of adults and children, check-in and check-out dates, as well as other preferences: pets, spa, sauna, ski lift, ski resort. It will be also possible to add a free text with instructions, which will be used as a AI prompt later on. AI will be used to generate a list of accommodations based on the user's preferences. 

## User workflow
Enter all the information about the user's preferences and click on the "Search" button. AI will generate a list of accommodations based on the user's preferences. User will be able to click on a specific accommodation to see more details and book it. There will be link to the information source (like booking.com, airbnb.com, etc.).

## Technogogy stack
Web application will be using most advance technologies available today. It will be using React for the frontend, Node.js for the backend. System will select best AI model for the user based on the user's preferences. It will be possible to select AI model from the list of available models. Models will be available based on the server configuration (Open AI, Anthropic, Gemini.). AI will be used to generate a list of accommodations based on the user's preferences. If more models are available, system will select the best one based on the user's preferences. It whould be possible to call a web service (webhook) to send the search results to the user or other systems for further processing (like n8n node). Outcome for the webhook should be in JSON format.

## Administration
There will be an admin page, which will allow to setup AI modes and their parameters (API keys for instance). This must be secured, so only authorized users can access it. It will be possible to define webhook URL, which will be called when the search results are ready. 

## Security
Admin page must be secured, so only authorized users can access it. It will be possible to setup authentication method (Google). My account tom.masopust@gmail.com should be used for authentication as administrator. 

## Build
Webpage will be deployed to Raspberi pi, which will be connected to the internet. This pi have Docker installed. Webpage will be built using Docker and will be run as a container. For the testing purposes, it will be possible to run the webpage on the local machine, but it should be possible to run it on the Raspberi pi as well (for the final deployment or when requested to create a build for the final deployment).

## Git
All changes must be committed to the repository. All security should not be available in the repository as the repository is public. 

## APIs
API enpoints will be needed for the models to be selected and their parameters to be set. 
API calls for main service providers should be available (booking.com, airbnb.com, etc.).
It should be possible to search the internet (e.g.: google search) for additional accomodations and also for additional information about the accommodations.

## GUI
Nice looking page should be available. It should be responsive and mobile friendly. It should be easy to use and navigate. It should be modern and clean.

## AI
AI should be used to generate a list of accommodations based on the user's preferences. AI should be able to select the best model based on the user's preferences. AI should be able to select the best model based on the user's preferences. AI should be able to select the best model based on the user's preferences. AI should be able to select the best model based on the user's preferences.

## Future
Future features should be added as needed.