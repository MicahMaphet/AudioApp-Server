# AudioApp-Server
Server side for [AudioApp](http://github.com/MicahMaphet/AudioApp).
Handles mongodb drivers and logic for data requests.
Contains [scripts](./scripts) for adding to the database.

## Getting Started
### Requrements
- NPM
- MongoDB Server (v7.0.12 is tested)
## Checkout Repo
Clone repo from terminal and cd into it
```
git clone https://github.com/MicahMaphet/AudioApp-Server.git
cd AudioApp-Server
```
## Start server
Install packages
```
npm install
```
Start Server
```
npm start
```

## Add to server
No items will be in the database until you add them. <br>
Add items to mongodb using [scripts](scripts/README.md).