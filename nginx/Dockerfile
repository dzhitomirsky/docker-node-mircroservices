FROM nginx:stable-alpine
MAINTAINER Arne Graeper <gr4per@arne-graeper.de>

COPY consul-template_0.16.0_linux_amd64 /usr/local/bin/consul-template
COPY startup-script.sh /usr/local/bin/startup-script.sh

RUN mkdir -p /var/www/public && \
    echo "<html><body>OK</body></html>" > /var/www/public/health_check.html && \
    chmod +x /usr/local/bin/startup-script.sh /usr/local/bin/consul-template && \
    rm -v /etc/nginx/conf.d/*

COPY nginx.conf /etc/consul-templates/nginx.conf
CMD ["startup-script.sh"]
