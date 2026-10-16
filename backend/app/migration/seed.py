import asyncio
from datetime import datetime,date
import inspect
import json
import logging
import pathlib
from typing import Any

from app.domain.auth.utils import get_password_hash
from sqlalchemy import Date, DateTime, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from app.db.database import engine
from app.db.models import User
from app.core.config import settings
from app.domain.auth.repository import UserRepository
from app.domain.auth.schemas import UserCreate
from app.db import models
from app.db.database import Base

file_path = pathlib.Path(__file__).parent / "seed.json"

logger = logging.getLogger(__name__)

def create_models_dict() -> dict[str,Base]:
    models_dict = {}
    for _,obj in inspect.getmembers(models):
        if inspect.isclass(obj) and issubclass(obj,Base) and obj is not Base:
           models_dict[obj.__tablename__] = obj
    return models_dict


def convert_record_types(model_class:Base, record: dict[str,Any]) -> dict[str,Any]:
    for column in model_class.__table__.columns:
        value = record.get(column.name)
        if value is None or not isinstance(value,str):
            continue
        if isinstance(column.type,Date):
            record[column.name] = date.fromisoformat(value)
        elif isinstance(column.type,DateTime):
            record[column.name] = datetime.fromisoformat(value)
    return record

def parse_models_from_json() -> list[list[Base]]:
    models_instances = []
    classes_models_dict = create_models_dict()
    with open(file_path,"r") as f:
        file_str = f.read() 
    seed_data_dict: dict[str,list[dict[str,Any]]] = json.loads(file_str)
    
    for table_name,seed_records in seed_data_dict.items():
        if table_name in classes_models_dict:
            model_class = classes_models_dict[table_name]
            records = []
            for seed_record in seed_records:
                model_inst = convert_record_types(model_class, seed_record)
                records.append(model_class(**model_inst)) # type: ignore
            models_instances.append(records)
    return models_instances


async def init():
    async with AsyncSession(engine) as session:
        try:
            models_list = parse_models_from_json()
            for models_instances in models_list:
                for inst in models_instances:
                    try:
                        async with session.begin_nested():
                            session.add(inst)
                            await session.flush()
                    except IntegrityError as e:
                        logger.warning(e)
        except json.JSONDecodeError as e:
            print(f"Error while parsing seed.json: {e}")
        
        result = await session.execute(select(User).where(User.email == settings.FIRST_SUPERUSER))
        user = result.scalar_one_or_none()
        if not user:
            new_password = get_password_hash(settings.FIRST_SUPERUSER_PASSWORD)
            user_in = UserCreate(
                email=settings.FIRST_SUPERUSER, password=new_password, role="admin"
            )
            user_repo = UserRepository(session)
            await user_repo.create(user_in)
        await session.commit()

async def main():
    print("Creating initial data")
    await init()
    print("Initial data created")


if __name__ == "__main__":
    asyncio.run(main())
