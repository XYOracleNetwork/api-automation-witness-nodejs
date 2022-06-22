import { getEnvFromAws } from '@xylabs/sdk-api-express-ecs'
import compression from 'compression'
import cors from 'cors'
import express, { Express } from 'express'

import { getWitnesses } from '../Witnesses'
import { addDependencies } from './addDependencies'
import { addErrorHandlers } from './addErrorHandlers'
import { addHealthChecks } from './addHealthChecks'
import { addJobs } from './addJobs'
import { addMiddleware } from './addMiddleware'

export const getApp = (): Express => {
  const app = express()
  app.set('etag', false)
  app.use(cors())
  app.use(compression())
  addDependencies(app)
  addMiddleware(app)
  addHealthChecks(app)
  addErrorHandlers(app)
  getWitnesses(app)
  addJobs(app)
  return app
}

export const server = async (port = 80) => {
  // If an AWS ARN was supplied for Secrets Manager
  const awsEnvSecret = process.env.AWS_ENV_SECRET_ARN
  if (awsEnvSecret) {
    console.log('Bootstrapping ENV from AWS')
    // Merge the values from AWS into the current ENV
    // with AWS taking precedence
    const awsEnv = await getEnvFromAws(awsEnvSecret)
    Object.assign(process.env, awsEnv)
  }

  const app = getApp()
  // const host = process.env.PUBLIC_ORIGIN || `http://localhost:${port}`
  // await configureDoc(app, { host })

  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })

  server.setTimeout(3000)
}
