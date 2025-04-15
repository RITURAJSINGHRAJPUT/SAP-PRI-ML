from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Crop-specific moisture thresholds
CROP_THRESHOLDS = {
    'wheat': 30,
    'rice': 40,
    'corn': 35,
    'soybean': 32,
    'cotton': 28
}

def predict_irrigation(soil_moisture, humidity, temperature, crop_type):
    threshold = CROP_THRESHOLDS[crop_type]
    if soil_moisture < threshold:
        if temperature > 30 and humidity < 60:
            return True
        elif soil_moisture < threshold - 5:
            return True
    return False

def calculate_water_amount(soil_moisture, crop_type):
    threshold = CROP_THRESHOLDS[crop_type]
    if soil_moisture < threshold:
        return round((threshold - soil_moisture) * 2, 1)
    return 0

@app.route('/')
def index():
    return render_template('mlw.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        soil_moisture = float(data['soilMoisture'])
        humidity = float(data['humidity'])
        temperature = float(data['temperature'])
        crop_type = data['cropType']

        if not (0 <= soil_moisture <= 100):
            return jsonify({'error': 'Soil moisture must be between 0 and 100'}), 400
        if not (0 <= humidity <= 100):
            return jsonify({'error': 'Humidity must be between 0 and 100'}), 400
        if crop_type not in CROP_THRESHOLDS:
            return jsonify({'error': 'Invalid crop type'}), 400

        needs_irrigation = predict_irrigation(soil_moisture, humidity, temperature, crop_type)
        water_amount = calculate_water_amount(soil_moisture, crop_type) if needs_irrigation else 0

        return jsonify({
            'irrigationNeeded': needs_irrigation,
            'waterAmount': water_amount,
            'cropType': crop_type
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)