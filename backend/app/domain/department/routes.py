from app.core.deps.service import DepartmentServiceDep
from app.domain.department.schemas import DepartmentCreate, DepartmentRead, DepartmentUpdate
from app.exceptions import NotFoundException
from fastapi import APIRouter,status

router = APIRouter(prefix="/department",tags=["Department"])

@router.get("/",response_model=list[DepartmentRead])
async def get_all_departments(department_service:DepartmentServiceDep):
    departments = await department_service.get_all()
    return departments

@router.get("/{department_id}",response_model=DepartmentRead)
async def get_department_by_id(department_id:int, department_service:DepartmentServiceDep):
    department = await department_service.get_by_id(department_id) 
    if department is None:
        raise NotFoundException("Department",department_id)
    return department

@router.post("/",response_model=DepartmentRead)
async def create_department(department_in:DepartmentCreate,department_service:DepartmentServiceDep):
    created_department = await department_service.create(department_in)
    return created_department

@router.put("/{department_id}",response_model=DepartmentRead)
async def update(department_id:int, department_in:DepartmentUpdate, department_service:DepartmentServiceDep):
    updated_department = await department_service.update(department_id=department_id, department_in=department_in)
    return updated_department

@router.delete("/{department_id}",response_model=None,status_code=status.HTTP_204_NO_CONTENT)
async def delete_department(department_id:int,department_service:DepartmentServiceDep):
    return await department_service.delete(department_id)