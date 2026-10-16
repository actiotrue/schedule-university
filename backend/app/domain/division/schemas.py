from app.core.base_schema import BaseSchema
from app.domain.department.schemas import DepartmentRead
from pydantic import EmailStr


class DivisionBase(BaseSchema):
    name: str
    phone: str | None
    email: EmailStr | None
    department_id: int

    
class DivisionRead(DivisionBase):
    id: int
    department: DepartmentRead
    
    
class DivisionCreate(DivisionBase):
    pass


class DivisionUpdate(DivisionBase):
    pass