from flask import Flask, render_template, request
app = Flask(__name__)

jinja_options = app.jinja_options.copy()

jinja_options.update(dict(
    block_start_string='(%',
    block_end_string='%)',
    variable_start_string='((',
    variable_end_string='))',
    comment_start_string='(#',
    comment_end_string='#)'
))
app.jinja_options = jinja_options

def hex_to_rgb(hex_string):
    if not isinstance(hex_string, str):
        raise TypeError("Hex must be a string")
    if not '#' in hex_string:
        raise ArgumentError("Hex must star with '#'")
    return tuple(int(hex_string[1:][i:i+2], 16) for i in (0, 2 ,4))

def updateLEDs(color):
    # Update LEDs when they come in the mail, lmao
    print(color)
    return True

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/update', methods=['POST'])
def colorReceiver():
    data = request.get_json()
    color = hex_to_rgb(data['color'])
    # send color to LEDs
    updateLEDs(color)
    return "True"

if __name__ == '__main__':
    app.run(host="0.0.0.0")
