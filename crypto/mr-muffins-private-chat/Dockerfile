FROM openjdk:17.0.2-oracle AS build

RUN microdnf install findutils

WORKDIR /usr/gradle
COPY ./challenge/gradlew ./challenge/gradlew.bat ./
COPY ./challenge/gradle ./gradle

RUN [ "./gradlew" ]

COPY ./challenge .

RUN [ "./gradlew", "installDist" ]

FROM openjdk:17.0.2-oracle

RUN microdnf install findutils

WORKDIR /usr/app

RUN groupadd app
RUN useradd -m -g app app

USER app

COPY --from=build --chown=app:app /usr/gradle/build/install/private_chat ./

EXPOSE 8000

CMD ["./bin/private_chat"]
