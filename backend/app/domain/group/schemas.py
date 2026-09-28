from datetime import datetime

from app.core.base_schema import BaseSchema

class GroupBase(BaseSchema):
    name: str
    course: int
    institute: str


class GroupRead(GroupBase):
    id: int
    created_at: datetime
    updated_at: datetime


class GroupCreate(GroupBase):
    pass


class GroupUpdate(GroupBase):
    pass


class GroupSummary(GroupBase):
    id: int
    count_students: int
