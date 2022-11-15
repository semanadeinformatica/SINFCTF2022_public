FROM php:8.0-apache

RUN groupadd app
RUN useradd -m -g app app

COPY ./challenge/ /var/www/html/

RUN echo "RedirectMatch 404 \flag.txt$" >> /etc/apache2/apache2.conf

RUN chown -R app:app /var/www/html/
RUN chmod -R 777 /var/www/html/

USER app