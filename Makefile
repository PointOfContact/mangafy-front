get_gcp_cluster:
	gcloud container clusters get-credentials mangafy-cluster --zone asia-east1 --project mangafy

all: front

front: front_build_push front_delete_pod front_apply

front_build_push:
	docker build -t front -f cloudfiles/front.dockerfile .
	docker tag front:latest asia.gcr.io/mangafy/front:latest
	docker push asia.gcr.io/mangafy/front:latest

front_apply: get_gcp_cluster
	kubectl apply -f cloudfiles/front_deployment.yaml

front_delete_pod:
	kubectl delete pods -l app=front-app || true

front_run_local:
	winpty docker run -it -p 3000:3000 --rm front