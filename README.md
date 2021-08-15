# Intro
Snakey is the classic game Snake made using React and Typescript!

The End goal is a FullStack Application with FrontEnd hosted on Netlify and Backend to use Docker to run on AWS EC2

# Progress
Snakey is now hosted on AWS
Frontend: ![S3 link](http://snakey-s3.s3-website-us-west-1.amazonaws.com/)

If you'd like to try it out locally, please clone this repo and run:
```
cd client && npm i
```
Current progression is:
 - [x] Start Screen Modal to enter Name
 - [x] Board with Snake and Apple Displayed
 - [x] Snake run through the Board and check border and body collision
 - [x] Snake extend by 1 block when eating an apple
 - [x] Apple gets randomly generated each time
 - [x] GameOver Screen
 - [x] Ranking Modal Page showing Backend highest scores and player names
 
 BackEnd:
 - [x] Simple Express Server to serve API for player data access
 - [x] Use Docker to host on AWS EC2 instance

Current Progress:
![Snakey](https://user-images.githubusercontent.com/71372051/129150037-7918ae67-1884-44bc-8b19-b60a119078a2.gif)



