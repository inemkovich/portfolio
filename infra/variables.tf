variable "do_token" {
  description = "DigitalOcean API token. НЕ коммитьте значение — передавайте через переменную окружения TF_VAR_do_token или terraform.tfvars (в .gitignore)."
  type        = string
  sensitive   = true
}

variable "github_repo" {
  description = "Репозиторий в формате \"username/portfolio\""
  type        = string
}

variable "github_branch" {
  description = "Ветка, из которой деплоится сайт"
  type        = string
  default     = "main"
}

variable "region" {
  description = "Регион DigitalOcean App Platform"
  type        = string
  default     = "fra"
}

variable "domain_name" {
  description = "Кастомный домен (например portfolio.example.com). Оставьте пустой строкой, чтобы использовать только *.ondigitalocean.app."
  type        = string
  default     = ""
}
