#!/usr/bin/env nash

set -e
set -x

alembic upgrade head

python app/migration/seed.py