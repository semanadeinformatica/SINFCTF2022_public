FROM ghcr.io/downunderctf/docker-vendor/nsjail:ubuntu-18.04

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install python-minimal

ENV JAIL_CWD=/chal/
EXPOSE 1337/tcp

COPY ./challenge/ /home/ctf/chal/

RUN cp /home/ctf/chal/run.sh /home/ctf/chal/pwn