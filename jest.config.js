module.exports = {
    "roots": [
        "client",
    ],
    "testMatch": [
//        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
        "<rootDir>/**/__tests__/**/?(*.)+(spec|test).(ts|tsx|js|jsx)", // @x-shipit-enable
    ],
    "coveragePathIgnorePatterns": [
        "node_modules",
        "__generated__",
    ],
//    "transform": {
//        "^.+\\.(ts|tsx)$": "ts-jest",
//    },
}
