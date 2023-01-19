FROM nginx

WORKDIR /app

RUN apt update && apt install build-essential rubygems ruby-dev -y

RUN gem install fluentd
RUN gem install fluent-plugin-opensearch

COPY ./nginx/fluentd.conf /app/fluentd.conf
COPY ./nginx/init.sh /app/init.sh
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 

CMD  /app/init.sh