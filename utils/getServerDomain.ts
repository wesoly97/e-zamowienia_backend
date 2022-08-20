import { config } from '../config/config'

export const getServerDomain = () => {
	return `http://localhost:${config.server.port}`
}