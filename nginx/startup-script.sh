#!/bin/sh

SED="$(which sed)"
AWK="$(which awk)"

DOCKERHOST="$(printf "%d." $(
  echo $($AWK '$2 == "00000000" {print $3}' /proc/net/route) | $SED 's/../0x& /g' | tr ' ' '\n' | tac
  ) | $SED 's/\.$/\n/')"

# wait=1s is a bug work-around.
exec consul-template \
     -consul=$DOCKERHOST:8500 \
     -template="/etc/consul-templates/nginx.conf:/etc/nginx/conf.d/app.conf" \
     -exec-reload-signal=SIGHUP \
     -exec-kill-signal=SIGQUIT \
     -log-level=info \
     -wait=1s \
     -exec="nginx -c /etc/nginx/nginx.conf -g 'daemon off;'"
