FROM ghcr.io/downunderctf/docker-vendor/bin-builder:ubuntu-22.04 as build

WORKDIR /usr/build

RUN apt-get update && apt-get install -y build-essential

COPY ./challenge .
RUN gcc -Wall one_time_password_fixed.c -o one_time_password_fixed

FROM ghcr.io/downunderctf/docker-vendor/nsjail:ubuntu-22.04

ENV JAIL_CWD=/chal/
EXPOSE 1337/tcp

COPY --from=build /usr/build/one_time_password_fixed /home/ctf/chal/pwn
COPY ./challenge/flag_start.txt /home/ctf/chal/flag_start.txt

# Publish executable binary
RUN mkdir -p /usr/output && cp /home/ctf/chal/pwn /usr/output/one_time_password_fixed
