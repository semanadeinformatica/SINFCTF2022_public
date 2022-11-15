# Mr. Muffin's Private Chat

## Description (problem statement)

Mr. Muffin has given me access to this new application he's been working on...

He says it's super safe and that someone can only access my profile if they prove P=NP. I think I'll trust him!

## Instructions

For this challenge, participants are given the description above and a server that can be executed by running the following commands:

```shell
docker build -t sinf-ctf-2022:mr-muffins-private-chat .
docker run --env-file .env -itp 8000:8000 sinf-ctf-2022:mr-muffins-private-chat
```

After that, to interact with the challenge, use software such as Netcat:
```shell
nc localhost 8000
```