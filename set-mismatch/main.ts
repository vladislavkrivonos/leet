function findErrorNums(nums: number[]): number[] {
  let j = 0;

  while (j < nums.length) {
    const correctIdx = nums[j] - 1;

    // If current value isn't already sitting on top of an identical value
    // at its target position, swap it into place.
    // If they are equal, swapping would do nothing / could loop forever
    // when duplicates collide.
    if (nums[j] !== nums[correctIdx]) {
      const tmp = nums[j];
      nums[j] = nums[correctIdx];
      nums[correctIdx] = tmp;
    } else {
      j += 1;
    }
  }

  for (let i = 0; i < nums.length; i += 1) {
    const expected = i + 1;
    if (nums[i] !== expected) {
      return [nums[i], expected];
    }
  }

  return [0, 0];
}