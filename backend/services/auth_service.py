from backend.database.connection import get_db_connection
from passlib.context import CryptContext
from backend.config.security import create_access_token


pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)


def register_user(name: str, email: str, password: str):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        if cursor.fetchone():
            return {"error": "Email already registered"}

        hashed_password = pwd_context.hash(password)

        cursor.execute(
            """
            INSERT INTO users (full_name, email, password_hash)
            VALUES (%s, %s, %s)
            """,
            (name, email, hashed_password)
        )

        connection.commit()

        return {
            "message": "User registered successfully"
        }

    finally:
        cursor.close()
        connection.close()
        
def login_user(email: str, password: str):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id, full_name, email, password_hash FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()

        if not user or not pwd_context.verify(
            password, user["password_hash"]
        ):
            return {"error": "Invalid email or password"}
        
        access_token = create_access_token(
            user["id"], 
            user["email"]
        )

        return {
            "message": "Login successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "name": user["full_name"],
                "email": user["email"]
            }
        }

    finally:
        cursor.close()
        connection.close()