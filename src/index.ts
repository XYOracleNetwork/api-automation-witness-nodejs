import { tryParseInt } from '@xylabs/express'
import { automationWitness } from '@xyo-network/automation-witness-server'
import { config } from 'dotenv'

config()

void automationWitness(tryParseInt(process.env.APP_PORT))
