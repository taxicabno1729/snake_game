from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def start_page():
    return render_template('start_page.html')

@app.route('/game')
def game_page():
    return render_template('game_page.html')

@app.route('/end')
def end_page():
    return render_template('end_page.html')

if __name__ == '__main__':
    app.run(debug=True)
