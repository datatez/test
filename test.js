function serialize(numbers) {
    const uniqueNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);
    let compacted = '';
    let start = uniqueNumbers[0];
    let count = 1;

    for (let i = 1; i < uniqueNumbers.length; i++) {
        if (uniqueNumbers[i] === start + count) {
            count++;
        } else {
            compacted += (count > 1) ? `${start}-${start + count - 1},` : `${start},`;
            start = uniqueNumbers[i];
            count = 1;
        }
    }
    compacted += (count > 1) ? `${start}-${start + count - 1}` : `${start}`;
    
    return compacted;
}

function deserialize(compacted) {
    const numbers = [];
    const ranges = compacted.split(',');

    ranges.forEach(range => {
        const bounds = range.split('-');
        if (bounds.length === 2) {
            const start = parseInt(bounds[0], 10);
            const end = parseInt(bounds[1], 10);
            for (let i = start; i <= end; i++) {
                numbers.push(i);
            }
        } else {
            numbers.push(parseInt(bounds[0], 10));
        }
    });

    return numbers;
}

function testSerialization() {
    const testCases = [
        { input: [1, 3, 2], expected: '1-3' },
        { input: [1, 1, 3, 2], expected: '1-3' },
        { input: [1, 2, 3, 4, 5, 6], expected: '1-6' },
        { input: [5, 4, 6, 1, 3, 2], expected: '1-6' },
        { input: [1, 2, 5, 6, 7, 8, 10], expected: '1-2,5-8,10' },
        { input: Array.from({length: 50}, (_, i) => i + 1), expected: '1-50' },
        { input: Array.from({length: 100}, (_, i) => i + 1).concat(Array.from({length: 100}, (_, i) => i + 101)), expected: '1-100,101-200' },
        { input: Array.from({length: 500}, (_, i) => Math.floor(Math.random() * 300) + 1), expected: 'various' }, 
    ];

    testCases.forEach(({input, expected}) => {
        const serialized = serialize(input);
        const deserialized = deserialize(serialized);
        const compressionRatio = (input.length * 2) / serialized.length; 
        console.log(`Input: ${input} | Serialized: ${serialized} | Compression Ratio: ${compressionRatio.toFixed(2)}`);
    });
}

testSerialization();