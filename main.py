import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
model = load_model('exercise_model.h5')
cap = cv2.VideoCapture(0)
def preprocess_frame(frame):
    # Pre-processing code here
    return preprocessed_frame
while True:
    ret, frame = cap.read()
    preprocessed_frame = preprocess_frame(frame)
    exercise_name = model.predict(np.expand_dims(preprocessed_frame, axis=0))
    # Display the recognized exercise name on the screen
    cv2.putText(frame, exercise_name, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Exercise Recognition', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    
    cap.release()
    cv2.destroyAllWindows()