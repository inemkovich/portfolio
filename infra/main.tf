# =============================================================================
# ОПЦИОНАЛЬНЫЙ / ДЕМОНСТРАЦИОННЫЙ модуль.
#
# Основной способ публикации сайта — GitHub Pages (см. .github/workflows/deploy.yml),
# он не требует Terraform и полностью бесплатен.
#
# Этот модуль — альтернативный вариант хостинга на DigitalOcean App Platform
# (тоже бесплатный тариф для статических сайтов, до 3 приложений, 1 GiB
# исходящего трафика в месяц на приложение). Он полезен, если вы хотите:
#   - держать хостинг в том же аккаунте DigitalOcean, что и остальные проекты;
#   - показать в портфолио пример реального IaC для DevOps-собеседования.
#
# Активация не обязательна. См. infra/README.md перед запуском.
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.40"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_app" "portfolio" {
  spec {
    name   = "portfolio"
    region = var.region

    static_site {
      name = "portfolio-site"

      github {
        repo           = var.github_repo
        branch         = var.github_branch
        deploy_on_push = true
      }

      source_dir     = "docs"
      index_document = "index.html"
      error_document = "index.html"
    }

    dynamic "domain" {
      for_each = var.domain_name != "" ? [var.domain_name] : []
      content {
        name = domain.value
        type = "PRIMARY"
      }
    }
  }
}
