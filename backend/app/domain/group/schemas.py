from datetime import datetime

from app.core.base_schema import BaseSchema
from app.domain.department.schemas import DepartmentRead

class GroupBase(BaseSchema):
    name: str
    course: int
    department_id: int


class GroupRead(GroupBase):
    id: int
    department: DepartmentRead
    created_at: datetime
    updated_at: datetime


class GroupCreate(GroupBase):
    pass


class GroupUpdate(GroupBase):
    pass


class GroupSummary(GroupBase):
    id: int
    department: DepartmentRead
    count_students: int
