import logging
import time
from typing import Awaitable, Callable
import uuid

from contextlib import asynccontextmanager

from app.core.broker.dep import message_publisher
from app.exeption_handlers import register_exception_handlers
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from app.configure_logging import configure_logging
from app.cache.manager import redis_manager
from app.router import api_router
from app.core.config import settings
from fastapi.routing import APIRoute
import sentry_sdk

logger = logging.getLogger(__name__)

configure_logging()

if settings.SENTRY_DSN:
    sentry_sdk.init(dsn=settings.SENTRY_DSN, send_default_pii=True, enable_logs=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await redis_manager.connect()
    logger.info("Redis connected")
    await message_publisher.connect()
    logger.info("RabbitMQ connected")
    yield
    await redis_manager.close()
    logger.info("Redis disconnected")
    await message_publisher.close()
    logger.info("RabbitMQ disconnected")

def custom_generate_unique_id(route: APIRoute) -> str:
    return route.name

app = FastAPI(lifespan=lifespan,generate_unique_id_function=custom_generate_unique_id)

app.include_router(router=api_router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.all_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next: Callable[[Request],Awaitable[Response]]) -> Response:
    request_id = str(uuid.uuid1())
    logger.info(f"Request started | ID: {request_id} | {request.method} {request.url}")

    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = (time.perf_counter() - start_time) * 1000

    logger.info(
        f"Request completed | ID: {request_id} "
        f"Status: {response.status_code} | Time {process_time:.2f}ms"
    )
    return response


register_exception_handlers(app)