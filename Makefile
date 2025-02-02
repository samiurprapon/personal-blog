SHELL := /bin/bash

.PHONY: help

help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

#-- Database
dx: ## Create database migrations
	@if [ -z "$(word 2, $(MAKECMDGOALS))" ]; then \
	  echo "Usage: make create <migration_name>"; \
	  exit 0; \
	fi; \
	pnpm -F @samiurprapon/api exec typeorm migration:create ./src/providers/postgres/migrations/$(word 2, $(MAKECMDGOALS))

migration: ## Generate database migrations
	@if [ -z "$(word 2, $(MAKECMDGOALS))" ]; then \
	  echo "Usage: make generate <migration_name>"; \
	  exit 0; \
	fi; \
	pnpm -F @samiurprapon/api exec pnpm typeorm migration:generate \
	  -d ./src/providers/postgres/DataSource.ts \
	  ./src/providers/postgres/migrations/$(word 2, $(MAKECMDGOALS))

migrate: ## Run database migrations
	pnpm -F @samiurprapon/api exec pnpm typeorm migration:run -d ./src/providers/postgres/DataSource.ts

show:
	pnpm -F @samiurprapon/api exec pnpm typeorm migration:show -d src/providers/postgres/DataSource.ts

rollback: ## Revert database migrations
	pnpm -F @samiurprapon/api exec pnpm typeorm migration:revert -d src/providers/postgres/DataSource.ts

#-- Environment
dev: ## Run Development environment for required services (Postgres, Redis, etc)
	docker compose up -d

deploy: ## Deploy the application to production
# build all Dockerfiles inside apps directory
	docker compose -f compose.prod.yml build && \
	docker compose -f compose.prod.yml up -d
