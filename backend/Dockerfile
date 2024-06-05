# Use a base image suitable for your project
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory within the container
WORKDIR /backend

# Copy the requirements.txt file to the container
COPY requirements.txt /backend/
COPY .env /backend/.env
# Create a virtual environment
RUN python -m venv venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip
RUN pip install --upgrade pip

# Install project dependencies
RUN pip install -r requirements.txt

# Copy the rest of your project files to the container
COPY . /backend/

# Run collectstatic command to collect static files
RUN python3 manage.py collectstatic --noinput

# Run database migrations
# RUN python3 manage.py migrate

# Set any additional configuration or environment variables

# Specify the command to run your application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]
