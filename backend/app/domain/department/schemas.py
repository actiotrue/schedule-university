from app.core.base_schema import BaseSchema


class DepartmentBase(BaseSchema):
    name: str
    address: str

    
class DepartmentRead(DepartmentBase):
    id: int 

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(DepartmentBase):
    pass