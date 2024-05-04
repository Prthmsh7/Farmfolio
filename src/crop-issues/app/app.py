from flask import Flask, request, render_template, redirect, url_for
from utils import preprocess_image, compare_predictions
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'app/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the uploads directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return render_template('index.html', message='No file part')

    file = request.files['file']

    if file.filename == '':
        return render_template('index.html', message='No selected file')

    if file:
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        image = preprocess_image(file_path)
        prediction = compare_predictions(image)

        # Here you can add code to store the image file path and prediction in a database
        # For now, let's print the prediction
        print(prediction)

        return render_template('result.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)
