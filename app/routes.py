from flask import Flask,render_template, redirect, url_for, request
from werkzeug.utils import secure_filename
from . import app
from .json_utils import read_json  # Adjust the import path as necessary
import markdown

@app.route('/')
def create_prior_auth():
    return render_template('create_prior_auth.html')

@app.route('/submit-pdfs', methods=['POST'])
def submit_pdfs():
    # Example: Process uploaded files
    uploaded_files = request.files.getlist("pdf_files")  # Adjust based on your input field's name
    for uploaded_file in uploaded_files:
        if uploaded_file:
            filename = secure_filename(uploaded_file.filename)
            # Save or process the file as needed

    # After processing, redirect to the decision screen
    return redirect(url_for('decision_screen'))

@app.route('/decision-screen')
def decision_screen():
    file_path = 'app/static/case.json'
    data = read_json(file_path)

    if 'evidence' in data:
        # Assuming 'evidence' is a list of items, each with 'content' in Markdown
        for item in data['evidence']:
            if 'content' in item:
                item['content'] = markdown.markdown(item['content'])

                   # Assuming 'evidence' is a list of strings in your data
    if 'evidence' in data:
        evidence = []
        for item in data['evidence']:
            if ':' in evidence['content']:
                title, text = evidence['content'].split(':', 1)  # Split on the first colon
                evidence['title'] = title_case_custom(title.strip())
                evidence['text'] = text.strip()
            else:
                evidence['title'] = ''
                evidence['text'] = evidence['content'].strip()
    

    # Assuming 'steps' is a list that contains both options and reasoning
    if 'steps' in data:
        for step in data['steps']:
            # Convert 'reasoning' for each step from Markdown to HTML
            if 'reasoning' in step:
                step['reasoning'] = markdown.markdown(step['reasoning'])
            
            

    return render_template('decision_screen.html', data=data)

