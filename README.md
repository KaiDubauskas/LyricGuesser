# Taylor Swift Coding Challenge - Kai Dubauskas
### Name: Kai Dubauskas
### Email: kai.w.dubauskas@vanderbilt.edu

## Description
Web-based game where users guess the lyrics of an artist of their choosing. Built in 72 hours as a part of the interview for Vanderbilt Change++

## Demonstration
![](demonstration.gif)

## Built With
- Node
- Express
- React 
- Musixmatch API
- HTML
- CSS
- Bootstrap

## How to Run

1. Download and unzip project
2. Open terminal and navigate to the my-app folder
3. Type in and run 'npm install'
4. Type in and run 'npm start'
4. In a different terminal window, navigate to the backend folder
5. Type in and run 'npm install'
5. Type in and run 'nodemon start'
6. The project should load up in the browser and start!

## Important notes
- USE CHROME. When safari is used, the site will only make one GET request at a time instead of 5
- On the homepage, the Start button is not a button. Clicking it will not work. You're supposed to hover over the Start button, then type in the name of the artist of interest, and only then do you click 'Start'.
- For your ease, the name of the song will be printed to the console for every song. During production build, this obviously wouldn't be there, but it makes it easier on you to test entering correct answers. 
- This was built on a Mac. Running it on a mac may cause less problems. 

## Troubleshooting and Common Problems

#### Used API Key

Likely the case if the backend server is giving an error similar to 'Cannot run .forEach on undefined'
I use the Musixmatch api for this project. Since it's free, they only allow a limited number of api calls per day. If your opening the program close to the deadline, these calls may have been used up when I was testing the project. 
To fix this, navigate to the .env folder in the backend, and change the api key to either one of 
- dc2bed87b28488950c39ff2c0ff2ec2d
- f1865c1ca1fde95012cf743b577990fe

This should fix the problem. 

#### 'Cannot Read '0' of undefined for .album' 

For some reason, this error runs for certain artists, mostly uncommon ones. To be safe, try and stick to popular ones. The ones I always used for testing are: 
- Taylor Swift
- Coldplay
- Lana Del Rey
- Nicki Minaj

These artists caused me no problems. 

#### Empty lyrics body
If you get a set of lyrics where nothing shows up, a karaoke version of the song was fetched (this is especially a problem with Taylor Swift). The karaoke version obviously won't have any lyrics, so the box will just be blank. 

## Reflection
Building this project was a great learning experience for me. While spending over 10 hours making this project, I learned a lot about the importance of problem-solving and determination. There were multiple times where I experienced a bug and was trying to fix it for hours, yet I never gave up and kept searching for the answer or fix. For example, at first I struggled with figuring out how to pick a specific element from the JSON object, but after doing some research and problem-solving I realized that there is a chrome extension that helps with this. Additionally, I learned a lot about components with React, such as how to pass props to child components through a link tag. If I had more time, I would:
- Make it so that when the Lyrics element has a hidden visibility until the API calls are finished and I could retrieve all the lyrics, as right now when the API is fetching the lyrics you can see the lyrics changing 
- Allow users to choose specific songs from a Taylor Swift album 
- Make the UI better by adding more colors
- Filtering out the karaoke versions of songs that the Musixmatch API has
- Allow users to not include featured artists in parenthesis when they are guessing a song

As with any app, there can always be future improvements, yet I am most proud of my hard work and learning throughout the process.  

*Project completed over the course of 3 days as the coding challenge for my application to Vanderbilt Change++
