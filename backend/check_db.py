import sys
from sqlmodel import Session, create_engine, select
from app.core.config import settings
from app.models.models import Property

def main():
    # Override port to 5434 for host machine connection
    db_uri = str(settings.SQLALCHEMY_DATABASE_URI).replace(":5432/", ":5434/")
    engine = create_engine(db_uri)
    with Session(engine) as session:
        properties = session.exec(select(Property)).all()
        print(f"Total properties: {len(properties)}")
        for p in properties:
            print(f"ID: {p.property_id}, Title: {p.title}, Status: {p.status}")

if __name__ == "__main__":
    main()
