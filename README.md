# Intro
Snakey is the classic game Snake made using React and Typescript!

FullStack Application with FrontEnd statically hosted on AWS S3 Bucket and Backend with Docker running on AWS EC2

# Try it yourself!
Snakey is now hosted on AWS
Frontend: [S3 link](http://snakey-s3.s3-website-us-west-1.amazonaws.com/)

If you'd like to try it out locally, please clone this repo and run:
```
npm run ci
```
Make sure you have concurrently, nodemon, and typescript installed globally
if not, please run
```
npm i -g concurrently nodemon typescript
```

After everything is installed, you can run this to start dev client and server
```
npm run dev
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

![Snakey](https://user-images.githubusercontent.com/71372051/129515321-093b91e2-f174-4096-985f-7c8627623412.gif)




