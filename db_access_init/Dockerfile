FROM alpine:3.7
RUN apk add --no-cache mysql-client
ADD db_alter.sh /db_alter.sh
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
RUN chmod +x /db_alter.sh
CMD /wait && /db_alter.sh