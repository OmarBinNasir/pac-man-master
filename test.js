class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(priority, value) {
        this.items.push({ priority, value });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift().value;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function dijkstra(start, end, width, squares) {
    const distances = Array(squares.length).fill(Infinity);
    const previous = Array(squares.length).fill(null);
    const visited = new Set();
    const queue = new PriorityQueue();

    distances[start] = 0;
    queue.enqueue(0, start);

    const directions = [-1, 1, width, -width];

    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        if (visited.has(current)) continue;
        visited.add(current);

        if (current === end) break;

        for (const dir of directions) {
            const neighbor = current + dir;
            if (
                neighbor < 0 ||
                neighbor >= squares.length ||
                squares[neighbor].classList.contains("wall")
            ) continue;

            const newDist = distances[current] + 1;
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = current;
                queue.enqueue(newDist, neighbor);
            }
        }
    }

    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    console.log(start)
    return path[0] === start ? path : [];
}