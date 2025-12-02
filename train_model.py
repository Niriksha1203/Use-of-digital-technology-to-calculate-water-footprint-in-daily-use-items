import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
import json
import os

# Dataset path
dataset_path = "dataset/"

# Image size for MobileNetV2
img_size = (224, 224)

# Data Augmentation for better accuracy
datagen = ImageDataGenerator(
    rescale=1/255,
    validation_split=0.2,
    rotation_range=10,
    zoom_range=0.2,
    horizontal_flip=True
)

train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=img_size,
    batch_size=32,
    subset="training",
    class_mode="categorical"
)

val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=img_size,
    batch_size=32,
    subset="validation",
    class_mode="categorical"
)

# Save class-label mapping
with open("labels.json", "w") as f:
    json.dump(train_data.class_indices, f, indent=4)
print("✅ Saved labels.json:", train_data.class_indices)

# Load MobileNetV2 base model (Transfer Learning)
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(len(train_data.class_indices), activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=10
)

# Save model in Keras format
model.save("productModel.h5")
print("✅ Model trained & saved as productModel.h5")
