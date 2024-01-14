[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HTlAZVnP)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13027362)
# Final Project

**Title:** Premier League App
**Name:** Daniel Fitzsimons 
**Student ID:** G00393110

## Application Function

Login Page![alt text](/login.png)
This page handles the login, creating of accounts, along with allowing the user to enter their email to reset their password. Which if successful, reroutes the user to the home page.

Home Page![alt text](/homePage.png)
Here i have my home page, within the page, with the use of a menu tab, it allows the user to navigate between pages, these include, a page for viewing premier league tables, fixtures and current squads.
Using ion picker, the user can choose between seasons back as far as 2010 to view topscorers, and 2014 for assists, using ion segment, this allows the user to switch between both the top scorers in the league and the players with the most assists.
Then using an api to capture the data, the use of ion lists show each player ranging from 1 to 20.
Number of players in the lists are shown using ion badge.

Tables Page![alt text](/tables.png)

Using grids, columns to display the data from the api, it allowed me to show the current years standings in a table, as well as using ion selectors to select from 2023-2010.

Fixtures Page![alt text](/fixtures.png)

This page allows users to view previous and future fixtures in realtion to the premier league. A user can select from seasons ranging back 4 years to scan and view games, when they were played, and what the score was, also who was home and who was away.

Players Page![alt text](/squad-page.png)

This page allows users to select between each team in the premier league and view the current players with use of ion-card for displaying the players, and ion select to choose which team. To match the Id's with the teams for user readability, i provied an ion popover for information pairing the name with the id.



## Running the Application

Provide step by step instructions on how to run your applicaiton. Are there any prerequisite softwares required?

```MARKDOWN
List the instructions step by step
    1. Install Angular CLI - npm install -g @angular/cli
    2. Log in to Firebase - firebase login
    3. Install capacitor plugin npm install @capacitor/dialog
    4. ionic serve
            :
            :
```

## Minimum Project Requirments

Confirm and demonstrate how you have met all minimum project requirments:

* The project, including code and documentaion, will be fully contained in the provied Git repo.
* The project **MUST** contain a working Ionic Angular app which matches the app you chose.
* The Ionic app must include the use of the Angular Router, Connection to a Backend service such as Firebase or Supabase, Use of a Capacitor native plugin.
* The app must not resemble in any way an app you have previously developed for another module or are currently developing for any project. 
* The code MUST compile. 30% grade reduction if code does not compile when I issue the ionic serve command. 
* The application code must be formatted in a consistent and standard way.
* The code must contain comments. One comment per class, method and variable at minimum.
* There must be two commits per week minimum (Note: Should be many commits per day coding).
* The documentation and commentary must be free of a grammar and speling mistakes.

## Project Requirments above and beyond

The use of an api. I used http and mapping within an api to call the data based for use of the api, this allowed me to retrieve the data correctly, and map it accordingly based on the header 'response', where the data was stored. and then if i was, for example, getting the players and their teams. Here i had to map the data through the response, and create a variable for the teamData through the response, to show the players team, and the amount of goals or asissts.

getTeamPlayers(teamId: number): Observable<any> {
    const url = `${this.apiUrl}/players/squads`;
    const params = new HttpParams().set('team', teamId.toString());
    const headers = this.getHeaders();

    // Make an HTTP GET request to the API to get team players
    return this.http.get(url, { headers, params }).pipe(
      map((response: any) => {
        console.log(response);
        if (response && response.response && Array.isArray(response.response) && response.response.length > 0) {
          const teamData = response.response[0].team;
          const playersData = response.response[0].players;
          return { team: teamData, players: playersData };
        } else {
          console.error('Unexpected response format:', response);
          return { team: null, players: [] };
        }
      })
    );
  }

  I used Ion popover to inject a two components containing information regarding what was on the page, for example, as i discussed above on my players page, i had to use the team id for selecting which team squad to play, so i added a popover to pair the id with the team name for users.
  

async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TeamsSquadsPopoverComponent, // Use TeamsSquadsPopoverComponent as the popover component
      event: ev,
      translucent: true,
    });
    await popover.present(); // Show the popover
  }


## Application Architecture

Pages and Their Purposes
Fixtures Page: Displays and manages fixture-related information. It likely includes functionality for listing upcoming matches, displaying details about specific fixtures, and possibly interacting with fixture data.

Login Page: Handles user authentication processes. This page is responsible for managing user login procedures, including form inputs for credentials, validation, and possibly integrating with external authentication services like Firebase.

Players Page: Dedicated to displaying player-related information. This could involve listing players, showing detailed player profiles, stats, and other relevant data about football players.

Fixture Page: Focuses on the details of individual football fixtures. It might provide comprehensive information about a specific match, including teams involved, scores, dates, times, and other relevant match details.

Methods and Their Functionalities


Fixtures Page: Methods for retrieving fixture data from a service, handling user interactions with fixture lists, and possibly methods for filtering or sorting fixtures.
Login Page: Methods for handling form submissions, validating user inputs, communicating with authentication services, and redirecting users upon successful login.
Players Page: Methods for fetching player data, handling user interaction with player lists, and possibly methods for searching or filtering players.
Fixture Page: Methods specific to retrieving detailed data about a single fixture, handling any user interactions related to that fixture.
HomePage: Methods for retrieving the players information regarding assists and amount of goals scored starting from the most for each, using the top 20.



![alt text](/architecture.png)



## Roadblocks and Unfinished Functionality

Discuss the issues you faced with creating your application. Provide possible solutions to these issues. What would you have done differently if you had to do this again? What did you not get finished?

## Resources

Provide links to resources used:

* [RapidApi]([https://www.youtube.com/watch?v=Y0vH5Cm3HAk](https://rapidapi.com/api-sports/api/api-football/tutorials)https://rapidapi.com/api-sports/api/api-football/tutorials) - Rapid Api tutorials.
