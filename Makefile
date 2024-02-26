#Generates the Production Codebase in a "dist" folder. 
#dist folders will be used for containers.
build: clean
	cd weather-service && npm run build
	cd weather-ui && npm run build

#Containers must be built with the latest file changes.
build-containers: clean
	cd weather-service && docker build -t weatherservice:latest .
	cd weather-ui && docker build -t weatherui:latest .

#Install node packages locally.
install:	
	cd weather-service && npm install & 
	cd weather-ui && npm install

#Runs the local development instances of the weather service.
run:
	cd weather-service && npm run start & 
	cd weather-ui && npm run start

#Runs Unit Tests
test: 
	cd weather-service && npm run test

#Deploys the latest built containers
#Unit Tests must pass and containers be built with latest
#Code changes.
deploy: test build-containers 
	docker compose up

#Removes the production code directories.
clean:
	rm -rf weather-service/dist weather-ui/dist
