function* gen(min, max) {
	let i = min;

	while (i < max) {
		yield i;
		i++;
	}
}

module.exports = (start, end) => [...gen(start, end)];
