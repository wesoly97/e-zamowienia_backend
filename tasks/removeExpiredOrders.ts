import { getExpiredOrders, removeEditedOrder } from '../controllers/orders/orders.utils'
import { deleteFiles } from '../utils/filesUpload'

export const removeExpiredOrders = async () => {
	const orders = await getExpiredOrders()

	if(orders.length > 0) {
		orders.map(async order => {
			const filesToDelete: object[] = []
			order.files.map(file => filesToDelete.push({ Key: file.key }))
			await deleteFiles(filesToDelete)
			await removeEditedOrder(order._id)
			await order.delete()
		})
		console.log(`${orders.length} orders deleted!`)
	} else {
		console.log('expired orders not found!')
	}
}