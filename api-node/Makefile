include .env
export $(shell sed 's/=.*//' .env)

NAME = "default"
MODE = "development"
DEPENDENCIES = ""

#TAKE THE DIRECTORY'S NAME
DIR=$(notdir $(shell pwd))
export DIR

# flag: -p, --project-name NAME     Specify an alternate project name
# flag: --build                     Build images before starting containers.
# flag: --remove-orphans            Remove containers for services not defined
# flag: --force-recreate            Recreate containers even if their configuration

##------------------------------DEVELOPEMENT---------------------------------------------------------------
## 
##make api-dev-log               this commande will run the app with logs.
## 
api-$(API_MODE)-log:
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(API_MODE).yml -p $(DIR) up --build --force-recreate --remove-orphans
##make api-dev                   this commande will run the app in background without logs.
## 
api-$(API_MODE):
	@echo -e "\n\t 🎧 🤖 \n\t💻 🔧 💉\n\t🚀 🛸 🛰\n"
	@docker-compose -f docker-compose.$(API_MODE).yml -p $(DIR) up --build --force-recreate --remove-orphans -d
##make api-dev-down              this commande will delete containers.
## 
api-$(API_MODE)-down:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(API_MODE).yml -p $(DIR) down --remove-orphans
##make api-dev-down-clean        this commande will delete containers and volumes.
## 
api-$(API_MODE)-down-clean:
	@echo -e "\n\t 🚨 🚧 ⭕️ 🛑 ⛔️\n\n"
	@docker-compose -f docker-compose.$(API_MODE).yml -p $(DIR) down --remove-orphans --volumes
##------------------------------DEVELOPEMENT---------------------------------------------------------------
## 
## 
##
## 
##------------------------------TOOLS----------------------------------------------------------------------
## 
npm:## this commande will install dependencies with the right version.
	@docker-compose -f docker-compose.$(API_MODE).yml run typescript npm $(DEPENDENCIES)
##			       make npm DEPENDENCIES="i --save uuid multer" &&  make npm DEPENDENCIES="i -D @types/uuid @types/multer"
## 
api-test:## to run tests
	@echo -e "\n\t👷🏿 🧑🏼‍🔧 🥷🏼\n"
	@make npm  DEPENDENCIES="run coverage"
## 
api-backup:## this commande will retrieve all data inside the current db and will create a SQL file inside db/backup.
	docker exec -t $(DIR)_database_1 pg_dump -a --inserts -U ${POSTGRES_USER} -p ${POSTGRES_PORT} | grep "INSERT" > db/backup/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql 
## 
create-migrate:## this commande will create a migration file inside db/migrations.
	npx knex migrate:make -x ts $(NAME)
##			       make create-migrate NAME=[FILE NAME]
## 
migrate:## this commande will exec all migrations files inside db/migrations.
	npx knex migrate:latest --env $(MODE)
##			       make migrate MODE=["development or production"]
## 
migrate-rollback:## this commande will drop the leatest migration file inside db/migrations.
	npx knex migrate:rollback --env $(MODE)
##			       make migrate-rollback MODE=["development or production"]
## 
create-seed:## this commande will create a migration file inside db/seeds.
	npx knex seed:make $(NAME)
##			       make create-seed NAME=[FILE NAME]
## 
seed:## this commande will exec all seeds files inside db/seeds.
	npx knex seed:run
## 
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(firstword $(MAKEFILE_LIST)) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
##------------------------------TOOLS----------------------------------------------------------------------

.PHONY: help api-$(API_MODE) api-$(API_MODE)-log api-backup create-migrate migrate seed create-seed api-$(API_MODE)-down api-$(API_MODE)-down-clean api-test

.DEFAULT_GOAL = help