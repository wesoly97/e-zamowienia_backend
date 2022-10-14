export const getFilteredText = (value: string, caseInsensitive= 'i') => {
	return { '$regex': value, '$options': caseInsensitive }
}