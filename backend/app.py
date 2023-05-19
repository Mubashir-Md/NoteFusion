import pdfplumber
import openai
import PyPDF2
import os
import requests
from flask import Flask, request, jsonify,Response
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)



@app.route("/output", methods=['POST'])
def home():

    url = 'https://api.pawan.krd/resetip'
    headers = {
        'Authorization': 'Bearer ' + os.getenv('API_KEY')
    }

    response1 = requests.post(url, headers=headers)
   
    file = request.files['file']
    readpdf = PyPDF2.PdfReader(file)
    totalpages = len(readpdf.pages)
    response_data = {"summary": []}
    for i in range(totalpages):
        with pdfplumber.open(file) as pdf:
            first_page = pdf.pages[i]
            x = first_page.extract_text()
            openai.api_key = os.getenv('API_KEY')
            openai.api_base = 'https://api.pawan.krd/v1'

            prop = x + "These are the contents of a single page of a pdf.Identify the all topics and subtopics covered in this page using NLP techniques such as Named Entity Recognition and Topic Modeling. Generate a summary of the page by selecting the most important sentences and phrases related to the identified topics and subtopics. Create a concise summary of the page based on the selected sentences and phrases. The summary should be roughly based on all the contents of the page. Mention page numbers at the end of each page. The response must start with 'The summary of this page is: .....'. towards the end add a neatly formatted list of important keywords and creative pnemonics to help remember them in the exam."

            response = openai.Completion.create(

                model="gpt-3.5-turbo",
                prompt=prop,
                temperature=0.7,
                max_tokens=250,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
            )
            print(i)
            summary = response.choices[0].text
            response_data["summary"].append(summary)
            x = ""
            if(i>=10):
                break

    return jsonify(response_data)



