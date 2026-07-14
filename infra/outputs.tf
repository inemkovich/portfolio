output "live_url" {
  description = "URL приложения на *.ondigitalocean.app"
  value       = digitalocean_app.portfolio.live_url
}

output "app_id" {
  description = "ID приложения в DigitalOcean App Platform"
  value       = digitalocean_app.portfolio.id
}
