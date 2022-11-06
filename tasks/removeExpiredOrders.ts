import { getExpiredOrders } from '../controllers/oders/orders.utils'
import { deleteFiles } from '../middlewares/amazonS3'

export const removeExpiredOrders = async () => {
	const orders = await getExpiredOrders()
	if(orders.length > 0) {
		orders.map(async order => {
			const filesToDelete: object[] = []
			order.files.map(file => filesToDelete.push({ Key: file.key }))
			await deleteFiles(filesToDelete)
			await order.delete()
		})
		console.log(`${orders.length} orders deleted!`)
	} else {
		console.log('expired orders not found!')
	}
}