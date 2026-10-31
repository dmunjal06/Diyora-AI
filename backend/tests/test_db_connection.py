from backend.database.connection import get_db_connection


try:
    connection = get_db_connection()

    if connection.is_connected():
        print("SUCCESS: Connected to Diyora AI database!")

    connection.close()

except Exception as error:
    print("Database connection failed:", error)