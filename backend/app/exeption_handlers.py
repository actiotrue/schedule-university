# app/exceptions.py
import logging
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError, ResponseValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError

logger = logging.getLogger(__name__)

def register_exception_handlers(app: FastAPI) -> None:
    
    @app.exception_handler(RequestValidationError)
    async def request_validation_exception_handler(req: Request, exc: RequestValidationError) -> JSONResponse:
        logger.error(f"Validation error: {exc.errors()}")
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"detail": "Validation error", "errors": exc.errors()},
        )

    @app.exception_handler(ResponseValidationError)
    async def response_validation_exception_handler(req: Request, exc: ResponseValidationError) -> JSONResponse:
        logger.error(f"Validation error: {exc.errors()}")
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": "Validation error", "errors": exc.errors()},
        )

    @app.exception_handler(ValidationError)
    async def pydantic_validation_exception_handler(req: Request, exc: ValidationError) -> JSONResponse:
        logger.error(f"Manual Pydantic validation error: {exc.errors()}")
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"detail": "Data validation error", "errors": exc.errors()},
        )
