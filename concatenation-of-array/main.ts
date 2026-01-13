function getConcatenation(nums: number[]): number[] {
    const res = [];

    for (let i = 0; i < nums.length; i++) {
        res[i] = res[i + nums.length] = nums[i];
    }

    return res;
};