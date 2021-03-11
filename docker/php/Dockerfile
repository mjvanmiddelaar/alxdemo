FROM php:7.3-fpm-alpine3.13

RUN docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apk add --no-cache fish git openssh

CMD ["php-fpm"]

EXPOSE 9001