build:
	cd ../../ && docker build -t website_importer -f docker/import/Dockerfile .

run_only:
	docker run -it --rm --link website_db website_importer

run: build run_only
