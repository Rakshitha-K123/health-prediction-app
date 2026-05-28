
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///patients.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Model
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    
    gender = db.Column(db.String(20))


    dob = db.Column(db.String(20))
    email = db.Column(db.String(100))
    glucose = db.Column(db.Float)
    haemoglobin = db.Column(db.Float)
    cholesterol = db.Column(db.Float)
    remarks = db.Column(db.String(200))

# Create database
with app.app_context():
    db.create_all()

# AI Prediction Logic



def predict_health(glucose, haemoglobin, cholesterol):

    conditions = []

    # Glucose Conditions
    if glucose > 140:
        conditions.append("High Diabetes Risk")

    elif glucose < 70:
        conditions.append("Low Blood Sugar")

    # Haemoglobin Conditions
    if haemoglobin < 12:
        conditions.append("Possible Anemia")

    elif haemoglobin > 17:
        conditions.append("High Haemoglobin")

    # Cholesterol Conditions
    if cholesterol > 200:
        conditions.append("Heart Disease Risk")

    elif cholesterol < 125:
        conditions.append("Low Cholesterol")

    # Final Result
    if len(conditions) == 0:
        return "Healthy"

    return ", ".join(conditions)







# CREATE Patient
@app.route('/patients', methods=['POST'])
def add_patient():

    data = request.json

    remarks = predict_health(
        float(data['glucose']),
        float(data['haemoglobin']),
        float(data['cholesterol'])
    )

    patient = Patient(
        full_name=data['full_name'],
        gender=data['gender'],
        dob=data['dob'],
        email=data['email'],
        glucose=data['glucose'],
        haemoglobin=data['haemoglobin'],
        cholesterol=data['cholesterol'],
        remarks=remarks
    )

    db.session.add(patient)
    db.session.commit()

    return jsonify({"message": "Patient Added Successfully"})

# READ Patients
@app.route('/patients', methods=['GET'])
def get_patients():

    patients = Patient.query.all()

    output = []

    for p in patients:
        output.append({
            "id": p.id,
            "full_name": p.full_name,
            "gender": p.gender,
            "dob": p.dob,
            "email": p.email,
            "glucose": p.glucose,
            "haemoglobin": p.haemoglobin,
            "cholesterol": p.cholesterol,
            "remarks": p.remarks
        })

    return jsonify(output)

# DELETE Patient
@app.route('/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):

    patient = Patient.query.get(id)

    db.session.delete(patient)
    db.session.commit()

    return jsonify({"message": "Deleted Successfully"})


# UPDATE Patient
@app.route('/patients/<int:id>', methods=['PUT'])
def update_patient(id):

    patient = Patient.query.get(id)

    data = request.json

    patient.full_name = data['full_name']
    patient.gender = data['gender']
    patient.dob = data['dob']
    patient.email = data['email']
    patient.glucose = data['glucose']
    patient.haemoglobin = data['haemoglobin']
    patient.cholesterol = data['cholesterol']

    patient.remarks = predict_health(
        float(data['glucose']),
        float(data['haemoglobin']),
        float(data['cholesterol'])
    )

    db.session.commit()

    return jsonify({"message": "Updated Successfully"})



if __name__ == '__main__':
    app.run(debug=True)

