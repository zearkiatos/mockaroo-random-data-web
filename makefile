build:
	mkdir -p dist
	cp -a src/* dist/

docker-env-up:
	docker-compose up --build

docker-env-offline-up:
	docker-compose up

docker-env-down:
	docker-compose down