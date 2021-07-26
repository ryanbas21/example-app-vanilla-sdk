# example-app-sdk
Example app using sdk for basic use

[Progress]
- [x] Create a personal project for learning. Create the project with the following requirements:
- [x] A personal Github repo. It can be private or public, if private, invite me (Justin) to it
- [x] HTTPS with self-signed certs
- [x] DNS alias within /etc/hosts
- [x] Uses a cloud platform of some kind
- [x] Write Hello, World!
- [x] Create a README that tracks your progress

- [] At each milestone, commit your progress and link the commit to the progress statement on the README
- [] Create the most basic username-password SPA with the following requirements:
- [] With no JavaScript framework, just create the most basic HTML, JS and CSS SPA with no dependencies other than the Core JS SDK (no FRUI) and Twitter Bootstrap (TBS) or an equivalent for default styling
- [] Dependencies are just imported via old-school script and style tags; just use the single, built file from the SDK repo
- [] The app renders a basic username-password form with default styling from TBS
- [] Upon submission of the form, plain JS catches the form submission event and uses the value off of the event target to submit them with the SDK's FRAuth to AM.

- [] Handles a success or failure of login, rendering some kind of basic message to user
- [] Once logged in, display a functional logout button that uses the SessionManager to logout the user
- [] Once logged out, display the same login form from above
 
- [ ] Add an OAuth flow to the basic username-password from above:
- [ ] After successful login, use the SDK's getTokens to call an OAuth client to get access token and id token
- [ ] After getting tokens, use the SDK's getUserInfo to call the userinfo endpoint
- [ ] Render user info to screen
- [ ] Using the logout button from the previous task, refactor to use FRUser to logout both session and OAuth tokens
