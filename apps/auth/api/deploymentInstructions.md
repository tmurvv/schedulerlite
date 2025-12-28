This app is run on barebones server tmurv@66.85.30.155 -p 222

- See One Note/clients for passwords
- ssh root@143.198.188.28
- FE = /var/www/auth.take2tech.ca/html
- FE URL = auth.take2tech.ca
- BE = /app/ultrenos/auth-api
- BE URL = auth-staging-api.take2tech.ca (as of 2024, running on port 4050 and 4051 (staging))

## Deployment Instructions

- working tree clean
- ON SERVER, go to dir above auth-staging-api `cd /apps/ttt` // leave out staging if prod deploy
- delete "auth-staging-api-last-deploy" dir `sudo rm -rf auth-staging-api-last-deploy/`
- rename auth-staging-api dir to "auth-staging-last-deploy" `sudo mv auth-staging-api.take2tech.ca auth-staging-api-last-deploy`
- mkdir again `sudo mkdir auth-staging-api.take2tech.ca`
- add permissions `sudo chown -R $tmurv:$tmurv auth-staging-api.take2tech.ca`
- go back to local
- build app `npm run build`
- copy package.json and .env to dist dir
- cd to dist dir, from dist dir, scp to server:
  `scp -P 222 -r . root@66.85.30.155:/apps/ttt/auth-staging-api.take2tech.ca`
- go back to server and `sudo npm i` -- if you are getting `npm WARN EBADENGINE` showing an old node version, you need to
- log in as root and run `npm i`
- stop pm2 instance to free up port
- test new instance with 'node app.js'
- stop test to free up port
- run pm2 start filename

## logs

- pm2 logs

## to deploy production

- check that config.env NODE_ENV is production
- check that config.env port is 7050
- git push all changes
- `ssh root@66.85.30.155 -p 222`
- cd apps/ultrenos/auth-api
- git reset --hard
- git pull
- check that config.env port is 7050, linux command is "cat config.env"

## to deploy Staging

- staging version at subdomain: auth-staging-api.take2tech.ca
- port: 7051
- staging version uses ultrenos-portfolio db
- git push all changes
- ssh root@143.198.188.28
- cd apps/ultrenos/auth-staging-api.take2tech.ca
- git reset --hard
- git pull
- if new changes involve config or index, the staging version of these files should be updated in parent directory
- copy config.env and index-stg.js from parent directory

### STAGING VERSION SHOULD BE STARTED AND STOPPED ON BACKEND

- from dir apps/ultrenos/auth-staging-api.take2tech.ca
- command is: pm2 start index-stg.js
- to check: pm2 status
- to stop, use index in status list: pm2 stop 2 // for example

## Portfolio

- portfolio version at subdomain: portfolio.auth-api.ca
- port: 5050
