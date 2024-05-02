import numpy as np
import tensorflow as tf
from PIL import Image

# Load TFLite model and allocate tensors.
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Load and preprocess input image.
input_image_path = "input_image.jpg"  # Replace with the path to your input image
input_image = Image.open(input_image_path).resize((224, 224))  # Resize as per your model's input shape
input_data = np.expand_dims(input_image, axis=0)
input_data = input_data.astype(np.uint8)  # Convert input data to UINT8

# Perform inference.
interpreter.set_tensor(input_details[0]['index'], input_data)
interpreter.invoke()

# Get the output.
output_data = interpreter.get_tensor(output_details[0]['index'])

# Process the output as needed.
print("Output:", output_data)
