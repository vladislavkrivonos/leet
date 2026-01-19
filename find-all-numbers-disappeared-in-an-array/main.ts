function findDisappearedNumbers(nums: number[]): number[] {
    const countArr: number[] = Array(nums.length).fill(0);

    for (let i = 0; i < nums.length; i++) {
        countArr[nums[i] - 1]++;
    }

    const res: number[] = [];

    for (let i = 0; i < countArr.length; i++) {
        if (countArr[i] === 0) {
            res.push(i + 1);
        }
    }

    return res;
};