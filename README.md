# Planning Poker(Work in Progress)
Make estimates for Agile development.  
This application can perform Planning Poker in real-time.

## Tech Stacks
* React
  * MUI
* Firebase
  * Hosting
  * Firestore Database
  * Realtime Database

## Architecture
SPA(single page application) using Creat-React-App.  
Not implement a backend program, use Firebase services(but no use Cloud Functions).


Use Firestore as data store.  
Realtime Database is used for user presence(for detect disconnection).

## Environments
### Sets environment variables
Create `.env.local` and set the following environment variables.
For the "XXXXX" part, check the value from the Firebase setting screen and set it.
```bash
REACT_APP_API_KEY=XXXXX
REACT_APP_AUTH_DOMAIN=XXXXX
REACT_APP_PROJECT_ID=XXXXX
REACT_APP_STORAGE_BUCKET=XXXXX
REACT_APP_MESSAGING_SENDER_ID=XXXXX
REACT_APP_APP_ID=XXXXX
REACT_APP_DATABASE_URL=XXXXX
```

### NPM Scripts
```bash
# install node modules
npm ci

# Start React
npm start
```
## CI/CD
Run CI / CD using a GitHub actions.  
Set the `.env` environment variable in Secrets of the GitHub repository.  
The above Secrets are used in the workflows file of GitHub Actions.  
If you updated the environment variable key, modify the workflows file in GitHub Actions.  

