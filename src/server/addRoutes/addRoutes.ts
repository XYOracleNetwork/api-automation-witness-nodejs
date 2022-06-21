import { Express } from 'express'

import { configureAuth } from '../../middleware'
import { addArchiveRoutes } from './addArchiveRoutes'
import { addBlockRoutes } from './addBlockRoutes'
import { addDomainRoutes } from './addDomainRoutes'
import { addManagementRoutes } from './addManagementRoutes'
import { addNodeRoutes } from './addNodeRoutes'
import { addPayloadRoutes } from './addPayloadRoutes'
import { addPayloadSchemaRoutes } from './addPayloadSchemaRoutes'
import { addSchemaRoutes } from './addSchemaRoutes'

export const addRoutes = (app: Express): Express => {
  return app
}
