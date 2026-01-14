function findMaxConsecutiveOnes(nums: number[]): number {
    let maxOnes = 0;
    let curOnes = 0;

    for (let i = 0; i < nums.length; i++) {
        curOnes = nums[i] === 1 ? curOnes + 1 : 0;
        maxOnes = Math.max(curOnes, maxOnes);
    }

    return maxOnes;
};