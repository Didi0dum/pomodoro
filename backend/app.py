from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)  # allow frontend requests

def get_conn():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT", 5432),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS")
    )

# --- SETTINGS ENDPOINTS ---

@app.route("/settings", methods=["GET"])
def get_settings():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT task_name, work_minutes, break_minutes FROM settings WHERE id=1")
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        task, work, brk = row
        return jsonify({
            "task_name": task,
            "work_minutes": work,
            "break_minutes": brk
        })
    return jsonify({}), 404

@app.route("/settings", methods=["POST"])
def update_settings():
    data = request.json
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        UPDATE settings
        SET task_name=%s, work_minutes=%s, break_minutes=%s
        WHERE id=1
    """, (data["task_name"], data["work_minutes"], data["break_minutes"]))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"status": "updated"})

# --- STATS ENDPOINTS ---

@app.route("/pomodoro/end", methods=["POST"])
def end_pomodoro():
    minutes = request.json["work_minutes"]
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        UPDATE stats
        SET completed = completed + 1,
            total_minutes = total_minutes + %s
        WHERE id=1
    """, (minutes,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"status": "ok"})

@app.route("/stats", methods=["GET"])
def stats():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT completed, total_minutes FROM stats WHERE id=1")
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        completed, minutes = row
        return jsonify({
            "completed_pomodoros": completed,
            "total_minutes": minutes,
            "total_hours": minutes // 60
        })
    return jsonify({}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
