FROM php:7.4-apache

RUN ln -sf /bin/bash /bin/sh

COPY ./challenge/* /var/www/html/

RUN echo "RedirectMatch 404 \.txt$" >> /etc/apache2/apache2.conf