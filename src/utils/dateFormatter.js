const showFormattedDate = (date) => {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}
	return new Date(date).toLocaleDateString("en-US", options)
}
 
export default showFormattedDate;