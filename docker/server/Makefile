build:
	cd ../../ && docker build -t website_server -f docker/server/Dockerfile .

run_only:
	docker stop website_server || true
	docker rm website_server || true
	docker run -d --name website_server --link website_db -p 8000:8000 website_server
	docker logs -f website_server

run: build run_only
