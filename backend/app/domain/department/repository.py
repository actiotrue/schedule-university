from app.db.base_repository import SqlAlchemyRepository
from app.db.models import Department

class DepartmentRepositiry(SqlAlchemyRepository[Department]):
    model = Department
    