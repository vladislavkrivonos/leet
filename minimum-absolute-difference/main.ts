function minimumAbsDifference(arr: number[]): number[][] {
    arr.sort((a,b) => a - b);

    const diffs = [];
    for (let i = 0; i < arr.length - 1; i++) {
        diffs[i] = arr[i+1] - arr[i];
    }

    const minDiff = Math.min(...diffs);
    const res = [];

    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i] === minDiff) {
            res.push([arr[i], arr[i + 1]]);
        }
    }

    return res;
};