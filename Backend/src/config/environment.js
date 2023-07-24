require('dotenv').config()

module.exports.staticFiles = process.env.STATICFILES
module.exports.port = process.env.PORT

module.exports.postgresuser = process.env.POSTGRESUSER
module.exports.postgreshost = process.env.POSTGRESHOST
module.exports.postgresdb = process.env.POSTGRESDB
module.exports.postgrespassword = process.env.POSTGRESPASSWORD
module.exports.postgresport = process.env.POSTGRESPORT

module.exports.treblleApiKey = process.env.TREBLLEAPIKEY
module.exports.treblleProjectId = process.env.TREBLLEPROJECTID
