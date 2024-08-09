from firebase_admin import firestore, initialize_app
from firebase_functions import https_fn, options
import json
from flask import jsonify
from google.cloud.firestore_v1.base_query import FieldFilter
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime, timedelta
import pytz

# Initialize Firebase Admin SDK
app = initialize_app()
db = firestore.client()

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USER = 'info@ilplatform.be'
SMTP_PASSWORD = 'udka wlne wgrx ehcq'

def get_event_details(event, language):
    # Define the event details
    event_details = {
        "code_geniuses2024": {
            "time": "10:00-12:00",
            "dates": {
                "en": "September 14 and 21, 2024",
                "fr": "14 et 21 septembre 2024"
            },
            "datetimes": [
                "2024-09-14T10:00:00", "2024-09-21T10:00:00"
            ],
            "address": {
                "en": "Boulevard du Régent 54, 1000 Brussels, Belgium",
                "fr": "Boulevard du Régent 54, 1000 Bruxelles, Belgique"
            },
            "how_to_get_there": {
                "en": "The building is located less than 5 minutes from Arts-Loi metro station and 2 minutes from Madou metro station.",
                "fr": "Le bâtiment se situe à moins de 5 minutes de la station de métro Arts-Loi et à 2 minutes de la station de métro Madou."
            }
        },
        "code_explorers2024": {
            "time": "13:00-15:00",
            "dates": {
                "en": "September 14 and 21, 2024",
                "fr": "14 et 21 septembre 2024"
            },
            "datetimes": [
                "2024-09-14T13:00:00", "2024-09-21T13:00:00"
            ],
            "address": {
                "en": "Boulevard du Régent 54, 1000 Brussels, Belgium",
                "fr": "Boulevard du Régent 54, 1000 Bruxelles, Belgique"
            },
            "how_to_get_there": {
                "en": "The building is located less than 5 minutes from Arts-Loi metro station and 2 minutes from Madou metro station.",
                "fr": "Le bâtiment se situe à moins de 5 minutes de la station de métro Arts-Loi et à 2 minutes de la station de métro Madou."
            }
        },
        "robotics_champions2024": {
            "time": "15:30-17:30",
            "dates": {
                "en": "September 14 and 21, 2024",
                "fr": "14 et 21 septembre 2024"
            },
            "datetimes": [
                "2024-09-14T15:30:00", "2024-09-21T15:30:00"
            ],
            "address": {
                "en": "Boulevard du Régent 54, 1000 Brussels, Belgium",
                "fr": "Boulevard du Régent 54, 1000 Bruxelles, Belgique"
            },
            "how_to_get_there": {
                "en": "The building is located less than 5 minutes from Arts-Loi metro station and 2 minutes from Madou metro station.",
                "fr": "Le bâtiment se situe à moins de 5 minutes de la station de métro Arts-Loi et à 2 minutes de la station de métro Madou."
            }
        }
    }
    return {
        "time": event_details[event]["time"],
        "dates": event_details[event]["dates"][language],
        "address": event_details[event]["address"][language],
        "how_to_get_there": event_details[event]["how_to_get_there"][language],
        "datetimes": event_details[event]["datetimes"]
    }

def create_ical_event(event_details, dtime, child_first_name, language):
    timezone = pytz.timezone("Europe/Brussels")
    start_time_naive = datetime.strptime(dtime, "%Y-%m-%dT%H:%M:%S")
    start_time = timezone.localize(start_time_naive)
    end_time = start_time + timedelta(hours=2)

    if language == "en":
        summary = f"{child_first_name}'s Coding Event"
        # description = f"Event details:\nDates: {event_details['dates']}\nTime: {event_details['time']}\nAddress: {event_details['address']}\nHow to get there: {event_details['how_to_get_there']}"
    else:
        summary = f"Événement Codage de {child_first_name}"
        # description = f"Détails de l'événement :\nDates : {event_details['dates']}\nHeure : {event_details['time']}\nAdresse : {event_details['address']}\nComment y arriver : {event_details['how_to_get_there']}"

    ical_event = f"""BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ILPlatform//EN
BEGIN:VTIMEZONE
TZID:Europe/Brussels
BEGIN:STANDARD
DTSTART:19710101T020000
TZOFFSETFROM:+0100
TZOFFSETTO:+0100
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZNAME:CET
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19710328T020000
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZNAME:CEST
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
UID:{child_first_name}-{event_details["dates"].split(" ")[0]}@ilplatform.be
DTSTAMP:{datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')}
DTSTART;TZID=Europe/Brussels:{start_time.strftime('%Y%m%dT%H%M%S')}
DTEND;TZID=Europe/Brussels:{end_time.strftime('%Y%m%dT%H%M%S')}
SUMMARY:{summary}
DESCRIPTION:description
LOCATION:{event_details['address']}
END:VEVENT
END:VCALENDAR"""

    print(ical_event)

    return ical_event

def send_confirmation_email(email, status, event_details, child_first_name, language):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = email
    msg['Subject'] = "Registration Confirmation" if language == "en" else "Confirmation d'inscription"

    logo_url = "https://www.ilplatform.be/static/media/ILPlatform_Banner.47d6450c.png"

    if language == "en":
        if status == "accepted":
            body = f"""
            <div style="border: 1px solid #ddd; padding: 16px; font-family: Arial, sans-serif;">
                <img src="{logo_url}" alt="ILPlatform" style="width: 100%; max-width: 200px;"/>
                <h2 style="color: #4CAF50;">Congratulations, {child_first_name}, you're in!</h2>
                <p>Here are the event details:</p>
                <ul>
                    <li><strong>Dates:</strong> {event_details['dates']}</li>
                    <li><strong>Time:</strong> {event_details['time']}</li>
                    <li><strong>Address:</strong> {event_details['address']}</li>
                    <li><strong>How to get there:</strong> {event_details['how_to_get_there']}</li>
                </ul>
                <p>We look forward to meeting you! You will receive more information before the event.</p>
            </div>
            """
        else:
            body = f"""
            <div style="border: 1px solid #ddd; padding: 16px; font-family: Arial, sans-serif;">
                <img src="{logo_url}" alt="ILPlatform" style="width: 100%; max-width: 200px;"/>
                <h2 style="color: #FFA500;">{child_first_name}, you're on the waiting list. We will contact you soon.</h2>
                <p>Here are the event details:</p>
                <ul>
                    <li><strong>Dates:</strong> {event_details['dates']}</li>
                    <li><strong>Time:</strong> {event_details['time']}</li>
                    <li><strong>Address:</strong> {event_details['address']}</li>
                    <li><strong>How to get there:</strong> {event_details['how_to_get_there']}</li>
                </ul>
                <p>We look forward to meeting you! You will receive more information before the event.</p>
            </div>
            """
    else:
        if status == "accepted":
            body = f"""
            <div style="border: 1px solid #ddd; padding: 16px; font-family: Arial, sans-serif;">
                <img src="{logo_url}" alt="ILPlatform" style="width: 100%; max-width: 200px;"/>
                <h2 style="color: #4CAF50;">Félicitations, {child_first_name}, vous êtes inscrit(e) !</h2>
                <p>Voici les détails de l'événement :</p>
                <ul>
                    <li><strong>Dates :</strong> {event_details['dates']}</li>
                    <li><strong>Heure :</strong> {event_details['time']}</li>
                    <li><strong>Adresse :</strong> {event_details['address']}</li>
                    <li><strong>Comment y arriver :</strong> {event_details['how_to_get_there']}</li>
                </ul>
                <p>Nous avons hâte de vous rencontrer ! Vous recevrez plus d'informations avant l'événement.</p>
            </div>
            """
        else:
            body = f"""
            <div style="border: 1px solid #ddd; padding: 16px; font-family: Arial, sans-serif;">
                <img src="{logo_url}" alt="ILPlatform" style="width: 100%; max-width: 200px;"/>
                <h2 style="color: #FFA500;">{child_first_name}, vous êtes sur la liste d'attente. Nous vous contacterons bientôt.</h2>
                <p>Voici les détails de l'événement :</p>
                <ul>
                    <li><strong>Dates :</strong> {event_details['dates']}</li>
                    <li><strong>Heure :</strong> {event_details['time']}</li>
                    <li><strong>Adresse :</strong> {event_details['address']}</li>
                    <li><strong>Comment y arriver :</strong> {event_details['how_to_get_there']}</li>
                </ul>
                <p>Nous avons hâte de vous rencontrer ! Vous recevrez plus d'informations avant l'événement.</p>
            </div>
            """

    msg.attach(MIMEText(body, 'html'))

    # Create iCal event for first and attach it
    ical_event = create_ical_event(event_details, event_details.get("datetimes")[0], child_first_name, language)
    part = MIMEBase('text', 'calendar', method='REQUEST', name='invite1.ics')
    part.set_payload(ical_event)
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="invite1.ics"')
    part.add_header('Content-Class', 'urn:content-classes:calendarmessage')
    msg.attach(part)

    # Create iCal event for second and attach it
    ical_event = create_ical_event(event_details, event_details.get("datetimes")[1], child_first_name, language)
    part = MIMEBase('text', 'calendar', method='REQUEST', name='invite2.ics')
    part.set_payload(ical_event)
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="invite2.ics"')
    part.add_header('Content-Class', 'urn:content-classes:calendarmessage')
    msg.attach(part)

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)

@https_fn.on_request(
    region='europe-west1',
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["get", "post", "options"]
    ))
def front_register_for_mac(req):
    try:
        # Parse the JSON data from the request
        data = json.loads(req.data.decode('utf8').replace("'", '"')).get("data", {})

        print(data)

        # Add timestamp to the data
        data["timestamp"] = firestore.SERVER_TIMESTAMP

        # Get event details based on the event
        event = data.get('event')
        print(data.get("language"))
        event_details = get_event_details(event, data.get("language"))

        # Get number of registrations to the given event
        registrations = db.collection('MACRegistrations').where(filter=FieldFilter('event', '==', event)).where(filter=FieldFilter('status', '==', 'accepted')).stream()
        registrations_count = len(list(registrations))

        # If too many registrations, add to waiting list
        if registrations_count >= 2:
            data["status"] = "waiting_list"
            db.collection('MACRegistrations').add(data)
            send_confirmation_email(data["parentEmail"], "waiting_list", event_details, data.get("childFirstName"), data.get("language"))
            return {"data": {"message": "Too many registrations for this event!", "status": 423}}

        # Register successfully
        data["status"] = "accepted"
        db.collection('MACRegistrations').add(data)
        send_confirmation_email(data["parentEmail"], "accepted", event_details, data.get("childFirstName"), data.get("language"))
        return {"data": {"message": "Registration successful!", "status": 200}}
    except Exception as e:
        # Return an error response in case of failure
        print(str(e))
        return {"data": {"message": f"An error occurred: {str(e)}", "status": 500}}

@https_fn.on_request(
    region='europe-west1',
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["get", "post", "options"]
    ))
def front_get_registration_mac(req):
    try:
        # Parse the JSON data from the request
        data = json.loads(req.data.decode('utf8').replace("'", '"')).get("data", {})

        # Get number of registrations to the given event
        registrations = db.collection('MACRegistrations').where(filter=FieldFilter('event', '==', data.get('event'))).stream()

        # Return a success response
        def get_registration(reg):
            reg_dict = reg.to_dict()
            reg_dict['id'] = reg.id
            return reg_dict
        return {"data": {"response": [get_registration(reg) for reg in registrations], "status": 200}}
    except Exception as e:
        # Return an error response in case of failure
        return {"data": {"message": f"An error occurred: {str(e)}", "status": 500}}

@https_fn.on_request(
    region='europe-west1',
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["get", "post", "options"]
    ))
def front_update_registration_status(req):
    try:
        # Parse the JSON data from the request
        data = json.loads(req.data.decode('utf8').replace("'", '"')).get("data", {})
        print(data)

        registration_id = data.get('id')
        new_status = data.get('status')

        # Update the document in Firestore
        registration_ref = db.collection('MACRegistrations').document(registration_id)
        registration_ref.update({'status': new_status})

        # Return a success response
        return {"data": {"message": "Status updated successfully", "status": 200}}
    except Exception as e:
        # Return an error response in case of failure
        return {"data": {"message": f"An error occurred: {str(e)}", "status": 500}}
