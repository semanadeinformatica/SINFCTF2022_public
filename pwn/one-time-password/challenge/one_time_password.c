// gcc -Wall -fno-stack-protector one_time_password.c -o one_time_password
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_ADMIN_BUF_SIZE 32
#define MAX_PASSWORD_BUF_SIZE 32
#define FLAG_SIZE 32

__attribute__((constructor)) void setup() {
  setvbuf(stdout, 0, 2, 0);
  setvbuf(stdin, 0, 2, 0);
}

void random_string_generator(char *buf, int size) {
  for (int i = 0; i < size - 1; i++) {
    if (rand() % 2 == 1) {
      buf[i] = rand() % 26 + 'a';
    } else {
      buf[i] = rand() % 26 + 'A';
    }
  }
  buf[size - 1] = '}';
  buf[size] = '\0';
}

void get_flag(char *buf) {
  FILE *fp = fopen("flag_start.txt", "r");
  if (fp == NULL) {
    puts("flag file not found");
    exit(0);
  }
  fgets(buf, FLAG_SIZE, fp);
  fclose(fp);

  char *token = strtok(buf, "\n");
  if (token != NULL) {
    buf[strlen(token)] = '\0';
  }
  int len = strlen(buf);
  random_string_generator(buf + len, FLAG_SIZE - len);
}

int main() {
  printf("ONE TIME PASSWORD SYSTEM\n");
  printf("Welcome back, admin.\n\n");

  int matches = 0;

  char username[MAX_ADMIN_BUF_SIZE];
  printf("Username: ");
  fflush(stdout);
  gets(username);
  username[strcspn(username, "\n")] = 0;

  char password[MAX_PASSWORD_BUF_SIZE];
  printf("Password: ");
  fflush(stdout);
  gets(password);
  password[strcspn(password, "\n")] = 0;

  printf("\nDear %s, ", username);
  fflush(stdout);

  if (matches) {
    char flag[FLAG_SIZE];
    get_flag(flag);
    printf("here's your password: %s\n", flag);
  } else {
    printf("did not find your credentials on system.\n");
  }

  return 0;
}
