import { removeExpiredOrders } from '../../tasks/removeExpiredOrders'
import schedule from 'node-schedule'

export const cronInit = () => {
	schedule.scheduleJob('0 1 * * *', removeExpiredOrders)
}