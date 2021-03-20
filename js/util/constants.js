const BLOCK_TYPES = {
    1: {
        key:1,
        shape: [[1, 1, 1, 1],
            [0, 0, 0, 1]], color: "orange"
    },
    2: {
        key:2,
        shape: [[1, 1, 1, 1],
            [0, 0, 1, 0]], color: "brown"
    },
    3: {
        key:3,
        shape: [[1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]], color: "lightblue"
    },
    4: {
        key:4,
        shape: [[0, 1, 1, 1],
            [1, 1, 0, 0]], color: "darkblue"
    },
    5: {
        key:5,
        shape: [[1, 1, 1],
            [1, 1, 0], [0, 0, 0]], color: "pink"
    },
    6: {
        key:6,
        shape: [[1, 0, 1],
            [1, 1, 1], [0, 0, 0]], color: "yellow"
    },
    7: {
        key:7,
        shape: [[1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]], color: "darkgreen"
    },
    8: {
        key:8,
        shape: [[0, 1, 1],
            [1, 1, 0],
            [1, 0, 0]], color: "green"
    },
    9: {
        key:9,
        shape: [[1, 0, 0],
            [1, 1, 1],
            [0, 0, 1]], color: "cyan"
    },
    10: {
        key:10,
        shape: [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 1]], color: "gray"
    },
    11: {key:11,shape: [[1, 1, 1, 1, 1]], color: "aqua"},
    12: {key:12,
        shape: [[0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]], color: "red"
    },
};
const PENTAS = {
    3: {
        A: [1, 2, 7],
        B: [4, 5, 6],
        C: [1, 3, 5],
        D: [2, 5, 6],
        E: [1, 4, 3],
        F: [5, 6, 9],
        G: [1, 3, 5],
    },
    4: {
        A: [1, 2, 7, 5],
        B: [4, 5, 6, 1],
        C: [1, 3, 5, 2],
        D: [2, 5, 6, 4],
        E: [1, 4, 3, 8],
        F: [5, 6, 9, 2],
        G: [1, 3, 5, 8],
    },
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
};
const BLOCK_SIZE=40
var hitOptions = {
    segments: false,
    stroke: false,
    fill: true,
    tolerance: 5
};
