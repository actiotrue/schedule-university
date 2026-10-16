from app.core.deps.service import DivisionServiceDep
from app.domain.division.schemas import DivisionRead
from fastapi import APIRouter


router = APIRouter(prefix="/division",tags=["Divisions"])

@router.get("/",response_model=list[DivisionRead])
async def get_all_divisions(service: DivisionServiceDep):
    divisions = await service.get_all()
    return divisions