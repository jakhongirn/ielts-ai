# Use a base image suitable for your project
FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}

# Set the working directory within the container
WORKDIR /backend

# Copy the requirements.txt file to the container
COPY requirements.txt /backend/

# Create a virtual environment
RUN python -m venv /opt/venv

# Activate the virtual environment
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip
RUN pip install --upgrade pip

# Install project dependencies
RUN pip install -r requirements.txt

# Copy the rest of your project files to the container
COPY . /backend/

# Run collectstatic command to collect static files
RUN python manage.py collectstatic --noinput

# Run database migrations
RUN python manage.py migrate

# Set any additional configuration or environment variables

# Specify the command to run your application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]