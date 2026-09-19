.PHONY: local lint format type-check test stop

local:
	docker compose up -d redis rabbitmq

	@echo "Waiting for container with Redis..."
	@until docker compose exec -T redis redis-cli ping | grep -q "PONG"; do sleep 0.5; done

	@echo "Waiting for container with RabbitMQ..."
	@until docker compose exec -T rabbitmq rabbitmq-diagnostics -q check_running; do sleep 0.5; done

	@echo "All services are ready! Starting apps..."
	cd frontend && npx concurrently \
		"cd ../backend && uv run uvicorn app.main:app --reload" \
		"npm run dev"

dev:
	docker compose up -d

stop:
	docker compose down

lint:
	uvx ruff check .

format:
	uvx ruff format .

type-check:
	uvx pyright

test:
	uv run pytest -v -s --tb=short -x

check: format lint type-check

