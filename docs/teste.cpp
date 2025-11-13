#include <bits/stdc++.h>
int main()
{
   FILE *fp;
   char str[80];
   if((fp=fopen("teste.txt", "w"))==NULL)
   {
      printf("arquivo nao pode ser aberto\n");
      exit(1);
   }
   do
   {
      printf("Entre uma string (CR para sair) : \n");
      gets(str);
      strcat(str, "\n");
      fputs(str, fp);
   }while(*str != '\n' );
   return 0;
}
