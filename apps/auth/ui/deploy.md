See Joplin for github personal access token

Currently served from barebones

- FE = /var/www/auth.take2tech.ca
- FE URL = auth.take2tech.ca
- BE = /apps/ttt/auth-api
- BE URL = auth-api.take2tech.ca (as of 2021, running on port 7050)
- FE-staging = /var/www/auth-staging.take2tech.ca
- FE-staging URL = auth-staging.take2tech.ca
- BE-staging = /apps/ttt/auth-staging-api // staging not currently implemented?
- BE-staging URL = auth-staging-api.take2tech.ca // staging not currently implemented? (as of 2021, running on port 7051)

[//]: # "DEPLOY INSTRUCTIONS FOR AWS"
[//]: #
[//]: # "scp -r -i ~/.ssh/ultrenos/ultrenos-business-operations.pem html ubuntu@ec2-100-25-191-79.compute-1.amazonaws.com"
[//]: # ":/var/www/auth-fe-staging-legacy.take2tech.ca"
[//]: #
[//]: # "300 // what's this?"

To Deploy FE:

- check .env for correct env and db
- npm run build or npm run build-without-ts
- cd dist dir
  Production DEPLOY:
- login to server `ssh tmurv@66.85.30.155 -p 222`
- `sudo rm -rf scheduler.ultrenos.ca`
- `sudo mkdir scheduler.ultrenos.ca`
- `sudo chown -R ubuntu:ubuntu scheduler.ultrenos.ca`
- ON LOCAL don't forget to run build and go to dist
- `scp -P 222 -r . root@66.85.30.155:/var/www/auth.take2tech.ca`
  Staging DEPLOY:
- `sudo rm -rf scheduler-staging.ultrenos.ca`
- `sudo mkdir scheduler-staging.ultrenos.ca`
- `sudo chown -R tmurv:tmurv scheduler-staging.ultrenos.ca`
- don't forget to run build and go to dist dir
- `scp -P 222 -r . root@66.85.30.155:/var/www/auth-staging.take2tech.ca`

NEW DEPLOY INSTRUCTION FOR BAREBONES

### To Deploy FE:

- check .env for correct BackEnd
- npm run build
- cd dist dir

#### Production BUILD:

- don't forget to run build
- scp -P 222 -r . root@66.85.30.155:/var/www/auth.take2tech.ca

#### Staging BUILD:

- don't forget to run build
- scp -P 222 -r . root@66.85.30.155:/var/www/auth-staging.take2tech.ca
