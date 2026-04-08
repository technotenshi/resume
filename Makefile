.PHONY: help install dev build preview typecheck test-unit test-e2e test nginx ps logs stop down

DOCKER_COMPOSE := docker compose
APP_SERVICE := app

help:
	@printf "%s\n" \
		"Available targets:" \
		"  make install     Install dependencies in the app container" \
		"  make dev         Start the Nuxt dev server on port 3000" \
		"  make build       Generate the static site into .output/public" \
		"  make preview     Build and serve .output/public on port 3000" \
		"  make typecheck   Run Nuxt and vue-tsc checks" \
		"  make test-unit   Run Vitest unit tests" \
		"  make test-e2e    Run Playwright end-to-end tests" \
		"  make test        Run the full test suite" \
		"  make nginx       Serve .output/public with nginx on port 8030" \
		"  make ps          Show Docker Compose service status" \
		"  make logs        Tail Docker Compose logs" \
		"  make stop        Stop running Docker Compose services" \
		"  make down        Stop and remove Docker Compose services"

install:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) yarn install

dev:
	$(DOCKER_COMPOSE) up dev

build:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) yarn build

preview:
	$(DOCKER_COMPOSE) up preview

typecheck:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) yarn typecheck

test-unit:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) yarn test:unit

test-e2e:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) yarn test:e2e

test:
	$(DOCKER_COMPOSE) run --rm $(APP_SERVICE) yarn test

nginx:
	$(DOCKER_COMPOSE) up nginx

ps:
	$(DOCKER_COMPOSE) ps

logs:
	$(DOCKER_COMPOSE) logs -f

stop:
	$(DOCKER_COMPOSE) stop

down:
	$(DOCKER_COMPOSE) down
