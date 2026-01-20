function buildArray(target: number[], n: number): string[] {
    const stack: number[] = [];
    let targetIdx = 0;
    const output: string[] = [];

    for (let i = 1; i <= n && targetIdx < target.length; i++) {
        stack.push(i);
        output.push('Push');
        if (stack[targetIdx] === target[targetIdx]) {
            targetIdx++;
        } else {
            stack.pop();
            output.push('Pop');
        }
    }

    return output;
};