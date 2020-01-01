FROM python:3.7-alpine


COPY requirements.txt /
RUN pip install -r /requirements.txt

RUN apk add --update nodejs npm



RUN npm run build 