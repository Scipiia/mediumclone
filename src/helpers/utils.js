//вспомогательная функция, что бы посчитать необходимое количество страниц
//пагинация, функция range(она есть в некоторых библиотеках)

export const range = (start, end) => {
	return [...Array(end).keys()].map(el => el + start)
}