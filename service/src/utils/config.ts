import fs from 'fs'
import yaml from 'yaml'
import logger from './log'

try {
    fs.readFileSync('./config.yml')
} catch (error) {
    logger.error('config.yml not found , will auto create , please edit.')
    const _config = fs.readFileSync('./template/_config.yml')
    fs.writeFileSync('./config.yml', _config)

    process.exit()
}

const config = yaml.parse(fs.readFileSync('./config.yml').toString())
export default config
