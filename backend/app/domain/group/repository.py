from app.domain import department
from sqlalchemy import func, select
from sqlalchemy.orm import joinedload

from app.db.base_repository import SqlAlchemyRepository
from app.db.models import Department, Group, Student


class GroupRepository(SqlAlchemyRepository[Group]):
    model = Group

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[Group]:
        stmt = select(self.model).options(joinedload(self.model.department)).offset(skip).limit(limit)
        results = await self.session.execute(stmt)
        groups = list(results.scalars().all())
        return groups

    async def get_one_or_none_by_id(self, id: int) -> Group | None:
        stmt = (
            select(self.model)
            .options(joinedload(self.model.department))
            .filter(self.model.id == id)
        )
        result = await self.session.execute(stmt)
        group = result.scalar_one_or_none()
        return group

    async def search(self, query: str) -> list[Group]:
        stmt = select(self.model).options(joinedload(self.model.department)).where(self.model.name.ilike(f"%{query}%"))
        results = await self.session.execute(stmt)
        groups = list(results.scalars().all())
        return groups

    async def get_groups_summary(self):
        stmt = (
            select(
                self.model,
                func.count(Student.id).label("count_students"),
                Department,
            )
            .outerjoin(
                Student,
                Student.group_id == self.model.id,
            )
            .join(
                Department,
                Department.id == self.model.department_id,
            )
            .group_by(
                self.model.id,
                Department.id,
            )
        )
        result = await self.session.execute(stmt)
        return [
            {
                "id": group.id,
                "name": group.name,
                "course": group.course,
                "department_id": group.department_id,
                "department": department,
                "count_students": count_students,
            }
            for group, count_students, department in result.all()
        ]