plugins {
    kotlin("jvm") version "1.6.10"
    application
    java
}

group = "pt.sinf.ctf"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
}

application {
    mainClass.set("pt.sinf.ctf.private_chat.PrivateChatKt")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}