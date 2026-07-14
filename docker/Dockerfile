# Опциональный контейнер для локального предпросмотра сайта в окружении,
# близком к продакшену (nginx). Не требуется для деплоя — GitHub Pages
# и DO App Platform сами обслуживают статику. Полезен для локальной
# разработки и как демонстрация владения контейнеризацией.

FROM nginx:1.27-alpine

COPY --chown=nginx:nginx docs/ /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1
