from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

questions = [
    {
        "question": "What does CPU stand for?",
        "answer": "central processing unit"
    },
    {
        "question": "What does GPU stand for?",
        "answer": "graphics processing unit"
    },
    {
        "question": "What does RAM stand for?",
        "answer": "random access memory"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.get_json()
    question_index = data['question_index']
    user_answer = data['answer'].lower()
    correct_answer = questions[question_index]['answer']

    if user_answer == correct_answer:
        result = True
    else:
        result = False

    return jsonify({"result": result})

@app.route('/get_question', methods=['GET'])
def get_question():
    question_index = int(request.args.get('question_index'))
    question = questions[question_index]['question']
    return jsonify({"question": question})

if __name__ == '__main__':
    app.run(debug=True)
