import getConfig from 'next/config'
import { publicRuntimeConfig } from './next.config';
const {publicRuntimConfig} = getConfig();


export const API =  publicRuntimeConfig.PRODUCTION ? 'https://blog.com' : 'http://localhost:3300'

export const APP_NAME = publicRuntimeConfig.APP_NAME