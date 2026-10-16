from app.db.base_repository import SqlAlchemyRepository
from app.db.models import Division


class DivisionReposiotry(SqlAlchemyRepository[Division]):
    model = Division