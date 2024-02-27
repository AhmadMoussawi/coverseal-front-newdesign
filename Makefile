deploy:
	rsync -avhpz . web-host-coverseal:~/coverseal_website/front --include-from "./.syncinclude" --exclude "*" --delete

dry-deploy:
	rsync -avhpzn . web-host-coverseal:~/coverseal_website/front --include-from "./.syncinclude" --exclude "*" --delete

build_front_image:
	docker . -f ./Dockerfile.staging -t boursbenjamin/coverseal_front:2.2.0

push_front_image:
	docker push boursbenjamin/coverseal_front:0.1.2