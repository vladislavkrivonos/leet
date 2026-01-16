function smallerNumbersThanCurrent(nums: number[]): number[] {
    const sortedNums = nums.toSorted((a, b) => a - b);
    const res: number[] = [];

    const numToIndexMap = new Map<number, number>();

    for (let i = 0; i < sortedNums.length; i++) {
        const v = sortedNums[i];

        if (!numToIndexMap.has(v)) {
            numToIndexMap.set(v, i);
        }
    }

    for (let i = 0; i < nums.length; i++) {
        res.push(numToIndexMap.get(nums[i]) ?? 0);
    }

    return res;
};