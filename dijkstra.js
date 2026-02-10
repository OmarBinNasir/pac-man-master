class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, value) {
        this.nodes.push({ priority, value });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift();
    }

    sort() {
        //console.log("before")
        //console.log(this.nodes)
        this.nodes.sort((a, b) => a.priority - b.priority); 
        //console.log("after")
        //console.log(this.nodes)
    }

    isEmpty() {
        return !this.nodes.length;
    }
}
export function dijkstra(start, end, width, squares) {
    const distances = Array(squares.length).fill(Infinity);
    const previous = Array(squares.length).fill(null);
    const visited = new Set();
    const pq = new PriorityQueue();

    distances[start] = 0;
    pq.enqueue(0, start);

    while (!pq.isEmpty()) {
        const { value: current } = pq.dequeue();
        if (visited.has(current)) continue;
        visited.add(current);

        if (current === end) break;

        const directions = [-1, 1, width, -width];
        for (let dir of directions) {
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
                pq.enqueue(newDist, neighbor);
            }
        }
    }

    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return path[0] === start ? path : [];
}
