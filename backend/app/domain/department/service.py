import logging

from app.db.models import Department
from app.domain.department.repository import DepartmentRepositiry
from app.domain.department.schemas import DepartmentCreate, DepartmentUpdate
from app.exceptions import ConflictException, NotFoundException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

logger = logging.getLogger(__name__)

class DepartmentService:
    def __init__(self,session:AsyncSession) -> None:
        self.department_repo = DepartmentRepositiry(session)
        
    async def get_all(self,skip:int = 0,limit:int= 100) -> list[Department]:
        departments = await self.department_repo.get_all(skip,limit)
        return departments
    
    
    async def get_by_id(self,department_id:int) -> Department | None:
        department = await self.department_repo.get_one_or_none_by_id(department_id)
        return department
        
    async def create(self,department_in: DepartmentCreate) -> Department:
        try:
            created_department = await self.department_repo.create(department_in)
            return created_department
        except IntegrityError as e:
            logger.error(f"Integirity error while creating department: {e}")
            raise ConflictException("Department")
        
    async def update(self,department_id:int,department_in: DepartmentUpdate) -> Department:
        department = await self.department_repo.get_one_or_none_by_id(department_id)
        if not department:
            logger.error(f"Room with {department_id} id does not exist")
            raise NotFoundException("Room", department_id)
        try:
            return await self.department_repo.update(data=department, update_data=department_in)
        except IntegrityError as e:
            logger.error(f"Integirity error while updating department: {str(e)}")
            raise ConflictException("Room")
    
    async def delete(self, department_id:int):
        department = await self.department_repo.get_one_or_none_by_id(department_id)
        if department is None:
            logger.error(f"Department with id: {department_id} not found")
            raise NotFoundException("Room")
        await self.department_repo.delete(department_id)
        return department