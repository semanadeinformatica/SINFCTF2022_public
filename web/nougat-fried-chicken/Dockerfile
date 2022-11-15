FROM nginx:alpine

COPY ./challenge/index.html /usr/share/nginx/html
COPY ./challenge/flag.txt /usr/share/nginx/html
COPY ./challenge/chicken.jpg /usr/share/nginx/html
COPY ./challenge/wrong.jpg /usr/share/nginx/html
COPY ./challenge/styles.css /usr/share/nginx/html

EXPOSE 80
# Build the image and run docker run -p <PORT>:80 <NAME>
