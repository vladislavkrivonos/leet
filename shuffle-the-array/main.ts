function shuffle(nums: number[], n: number): number[] {
    const res = [];

    for (let i = 0; i < n; i++) {
        res[i * 2] = nums[i];
        res[i * 2 + 1] = nums[n + i];
    }

    return res;
};