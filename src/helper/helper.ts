function getFormattedDate(rawDate: Date): string {
	const year = rawDate.getFullYear().toString();
	const month = rawDate.getMonth().toString();
	const date = rawDate.getDate().toString();
	return year.toString() + (month === '12' ? '01' : month.length === 2 ? parseFloat(month) + 1 : '0' + (parseFloat(month) + 1)) + date;
}

export { getFormattedDate };
