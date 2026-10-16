from app.db.models import Division
from app.domain.division.repository import DivisionReposiotry
from app.domain.division.schemas import DivisionCreate
from sqlalchemy.ext.asyncio import AsyncSession

class DivisionService:
    def __init__(self,session: AsyncSession) -> None:
        self.division_repo = DivisionReposiotry(session=session)
        
        
    async def get_all(self,skip=0,limit=0) -> list[Division]:
        divisions = await self.division_repo.get_all(skip,limit)
        return divisions
    
    async def create(division_in: DivisionCreate) -> Division:
        division = self.divis