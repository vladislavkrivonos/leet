class SlidingWindowContainer {
    private k: number;
    private smallElements: number[];
    private largeElements: number[];
    private delayedRemovals: Map<number, number>;
    private smallSize: number;
    private largeSize: number;
    private sum: number;

    constructor(k: number) {
        this.k = k;
        this.smallElements = [];
        this.largeElements = [];
        this.delayedRemovals = new Map();
        this.smallSize = 0;
        this.largeSize = 0;
        this.sum = 0;
    }

    private smallTop(): number {
        return this.smallElements[0];
    }

    private largeTop(): number {
        return this.largeElements[0];
    }

    private smallPush(val: number): void {
        this.smallElements.push(val);
        this.heapifyUpSmall(this.smallElements.length - 1);
    }

    private largePush(val: number): void {
        this.largeElements.push(val);
        this.heapifyUpLarge(this.largeElements.length - 1);
    }

    private smallPop(): number {
        if (this.smallElements.length === 0) return 0;
        const top = this.smallElements[0];
        this.smallElements[0] = this.smallElements[this.smallElements.length - 1];
        this.smallElements.pop();
        if (this.smallElements.length > 0) {
            this.heapifyDownSmall(0);
        }
        return top;
    }

    private largePop(): number {
        if (this.largeElements.length === 0) return 0;
        const top = this.largeElements[0];
        this.largeElements[0] = this.largeElements[this.largeElements.length - 1];
        this.largeElements.pop();
        if (this.largeElements.length > 0) {
            this.heapifyDownLarge(0);
        }
        return top;
    }

    private heapifyUpSmall(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.smallElements[parentIndex] >= this.smallElements[index]) break;
            [this.smallElements[parentIndex], this.smallElements[index]] = [this.smallElements[index], this.smallElements[parentIndex]];
            index = parentIndex;
        }
    }

    private heapifyDownSmall(index: number): void {
        while (true) {
            let maxIndex = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.smallElements.length && this.smallElements[left] > this.smallElements[maxIndex]) {
                maxIndex = left;
            }
            if (right < this.smallElements.length && this.smallElements[right] > this.smallElements[maxIndex]) {
                maxIndex = right;
            }

            if (maxIndex === index) break;
            [this.smallElements[index], this.smallElements[maxIndex]] = [this.smallElements[maxIndex], this.smallElements[index]];
            index = maxIndex;
        }
    }

    private heapifyUpLarge(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.largeElements[parentIndex] <= this.largeElements[index]) break;
            [this.largeElements[parentIndex], this.largeElements[index]] = [this.largeElements[index], this.largeElements[parentIndex]];
            index = parentIndex;
        }
    }

    private heapifyDownLarge(index: number): void {
        while (true) {
            let minIndex = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.largeElements.length && this.largeElements[left] < this.largeElements[minIndex]) {
                minIndex = left;
            }
            if (right < this.largeElements.length && this.largeElements[right] < this.largeElements[minIndex]) {
                minIndex = right;
            }

            if (minIndex === index) break;
            [this.largeElements[index], this.largeElements[minIndex]] = [this.largeElements[minIndex], this.largeElements[index]];
            index = minIndex;
        }
    }

    private cleanSmall(): void {
        while (this.smallElements.length > 0) {
            const num = this.smallTop();
            if (this.delayedRemovals.has(num) && this.delayedRemovals.get(num)! > 0) {
                this.delayedRemovals.set(num, this.delayedRemovals.get(num)! - 1);
                if (this.delayedRemovals.get(num) === 0) {
                    this.delayedRemovals.delete(num);
                }
                this.smallPop();
            } else {
                break;
            }
        }
    }

    private cleanLarge(): void {
        while (this.largeElements.length > 0) {
            const num = this.largeTop();
            if (this.delayedRemovals.has(num) && this.delayedRemovals.get(num)! > 0) {
                this.delayedRemovals.set(num, this.delayedRemovals.get(num)! - 1);
                if (this.delayedRemovals.get(num) === 0) {
                    this.delayedRemovals.delete(num);
                }
                this.largePop();
            } else {
                break;
            }
        }
    }

    private balance(): void {
        if (this.smallSize > this.k) {
            const val = this.smallTop();
            this.largePush(val);
            this.smallPop();
            this.smallSize--;
            this.largeSize++;
            this.sum -= val;
            this.cleanSmall();
        } else if (this.smallSize < this.k && this.largeSize > 0) {
            const val = this.largeTop();
            this.smallPush(val);
            this.largePop();
            this.smallSize++;
            this.largeSize--;
            this.sum += val;
            this.cleanLarge();
        }
    }

    add(x: number): void {
        if (this.smallSize === 0 || x <= this.smallTop()) {
            this.smallPush(x);
            this.sum += x;
            this.smallSize++;
        } else {
            this.largePush(x);
            this.largeSize++;
        }
        this.balance();
    }

    remove(x: number): void {
        this.delayedRemovals.set(x, (this.delayedRemovals.get(x) || 0) + 1);

        if (this.smallSize > 0 && x <= this.smallTop()) {
            this.smallSize--;
            if (x === this.smallTop()) {
                this.cleanSmall();
            }
            this.sum -= x;
        } else {
            this.largeSize--;
            if (x === this.largeTop()) {
                this.cleanLarge();
            }
        }

        this.balance();
    }

    getSum(): number {
        this.cleanSmall();
        return this.sum;
    }
}

function minimumCost(nums: number[], k: number, dist: number): number {
    const n = nums.length;
    const container = new SlidingWindowContainer(k - 2);
    
    for (let i = 1; i < k - 1; i++) {
        container.add(nums[i]);
    }

    let result = container.getSum() + nums[k - 1];
    
    for (let i = k; i < n; i++) {
        const j = i - dist - 1;
        if (j > 0) {
            container.remove(nums[j]);
        }
        container.add(nums[i - 1]);
        result = Math.min(result, container.getSum() + nums[i]);
    }

    return result + nums[0];
}
