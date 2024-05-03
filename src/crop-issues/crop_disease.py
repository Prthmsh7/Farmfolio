import numpy as np
import tensorflow as tf
from PIL import Image

# Load the TFLite model and allocate tensors.
interpreter = tf.lite.Interpreter(model_path="your_model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Function to preprocess the image
def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.resize((input_details[0]['shape'][1], input_details[0]['shape'][2]))
    image = np.array(image, dtype=np.float32)
    image = (image - 127.5) / 127.5  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# Function to perform inference
def detect_disease(image_path):
    input_data = preprocess_image(image_path)
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    return output_data

# Path to the image you want to classify
image_path = "your_image.jpg"

# Perform inference
result = detect_disease(image_path)

# You may want to post-process the result depending on your model output format
# For example, if it's a classification model, you might want to map the output to class labels.

print("Inference result:", result)
