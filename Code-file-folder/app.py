from flask import Flask, render_template, request, jsonify
import re
import math
import random
import string

app = Flask(__name__)

def calculate_strength(password):
    score = 0

    checks = {
        "length": len(password) >= 8,
        "lowercase": bool(re.search(r"[a-z]", password)),
        "uppercase": bool(re.search(r"[A-Z]", password)),
        "number": bool(re.search(r"\d", password)),
        "special": bool(re.search(r"[!@#$%^&*(),.?\":{}|<>]", password))
    }

    for value in checks.values():
        if value:
            score += 1

    if len(password) >= 12:
        score += 1

    if len(password) >= 16:
        score += 1

    entropy = round(len(password) * math.log2(94), 1) if password else 0

    if score <= 2:
        strength = "Weak"
        percentage = 25
    elif score <= 4:
        strength = "Medium"
        percentage = 60
    elif score <= 6:
        strength = "Strong"
        percentage = 85
    else:
        strength = "Very Strong"
        percentage = 100

    return {
        "score": score,
        "strength": strength,
        "percentage": percentage,
        "entropy": entropy,
        "checks": checks
    }

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/check", methods=["POST"])
def check():
    password = request.json.get("password", "")
    return jsonify(calculate_strength(password))

@app.route("/generate")
def generate():
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choice(chars) for _ in range(16))
    return jsonify({"password": password})

if __name__ == "__main__":
    app.run(debug=True)