function calculateComplexity() {
    const code = document.getElementById('inputCode').value;
    const resultDiv = document.getElementById('result');

    let timeComplexity = 'O(1)'; // Default time complexity
    let spaceComplexity = 'O(1)'; // Default space complexity

    const lines = code.split('\n');
    let maxLoopDepth = 0;
    let currentLoopDepth = 0;
    let recursionCount = 0;
    let spaceUsage = 0;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('for') || line.startsWith('while')) {
            currentLoopDepth++;
            if (currentLoopDepth > maxLoopDepth) {
                maxLoopDepth = currentLoopDepth;
            }
        } else if (line === '}') {
            currentLoopDepth--;
        } else if (line.includes('function') && line.includes('(') && line.includes(')')) {
            if (code.includes(line.split(' ')[1].split('(')[0])) {
                recursionCount++;
            }
        } else if (line.includes('new ')) {
            spaceUsage++;
        }
    });

    // Determine time complexity based on the depth of loops
    if (maxLoopDepth === 1) {
        timeComplexity = 'O(n)';
    } else if (maxLoopDepth === 2) {
        timeComplexity = 'O(n^2)';
    } else if (maxLoopDepth > 2) {
        timeComplexity = 'O(n^' + maxLoopDepth + ')';
    }

    if (recursionCount > 0) {
        timeComplexity = 'O(n^' + recursionCount + ')';
    }

    // Determine space complexity based on heuristic for new objects/arrays
    if (spaceUsage > 0) {
        spaceComplexity = 'O(n)';
    }

    resultDiv.innerText = `Estimated Time Complexity: ${timeComplexity}\nEstimated Space Complexity: ${spaceComplexity}`;
}
