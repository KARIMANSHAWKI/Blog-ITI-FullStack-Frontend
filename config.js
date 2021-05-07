import getConfig from 'next/config'
import { publicRuntimeConfig } from './next.config';
const {publicRuntimConfig} = getConfig();


export const API =  publicRuntimeConfig.PRODUCTION ? 'https://blog.com' : 'http://localhost:3400'

export const APP_NAME = publicRuntimeConfig.APP_NAME

export const DOMAIN = publicRuntimeConfig.PRODUCTION
        ? publicRuntimeConfig.API_PRODUCTION 
        : publicRuntimeConfig.API_DEVELOPEMENT   
        
export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID
        



