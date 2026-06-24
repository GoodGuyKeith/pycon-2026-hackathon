FROM python:3.12-slim

WORKDIR /app

COPY dist ./dist
COPY server.py smoke_test.py README.md HACKATHON_SUBMISSION.md SUBMISSION_FORM_DRAFT.md ./
COPY data ./data

EXPOSE 8000

CMD ["python3", "server.py", "8000"]
