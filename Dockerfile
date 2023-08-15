FROM nginx:stable-alpine3.17-slim
COPY nginx.conf /etc/nginx/nginx.conf
RUN apk update && apk upgrade && rm -rf /var/cache/apk/* && \
    addgroup nonroot && adduser -D -G nonroot nonroot && touch /var/run/nginx.pid && \
    chown -R nonroot:nonroot /var/run/nginx.pid && \
    chown -R nonroot:nonroot /var/cache/nginx && \
    chown -R nonroot:nonroot /usr/share/nginx/html
USER nonroot
COPY dist /app
HEALTHCHECK CMD curl --fail http://localhost:8080 || exit 1
