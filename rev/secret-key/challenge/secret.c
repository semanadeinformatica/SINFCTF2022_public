#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUF_SIZE 512

int main()
{
    printf("Enter the secret key: ");
    char buf[BUF_SIZE];
    fgets(buf, BUF_SIZE, stdin);
    const int len = strlen(buf);
    if (len > 0 && buf[len - 1] == '\n')
      buf[len - 1] = '\0';

    if (strlen(buf) != 33)
    {
        printf("Invalid key 2\n");
        exit(1);
    }
    if (buf[32] != '}')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[31] != '7')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[30] != '5')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[29] != '8')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[28] != '_')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[27] != 'd')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[26] != 'e')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[25] != 'l')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[24] != 'o')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[23] != '0')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[22] != 'f')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[21] != '_')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[20] != 's')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[19] != '1')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[18] != '_')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[17] != '3')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[16] != 'n')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[15] != '0')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[14] != '_')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[13] != '0')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[12] != 'n')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[11] != '{')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[10] != '2')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[9] != '2')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[8] != '0')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[7] != '2')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[6] != 'F')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[5] != 'T')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[4] != 'C')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[3] != 'F')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[2] != 'N')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[1] != 'I')
    {
        printf("Invalid key\n");
        exit(1);
    }
    if (buf[0] != 'S')
    {
        printf("Invalid key\n");
        exit(1);
    }
    printf("Valid key, congrats! :D\n");
    return 0;
}
