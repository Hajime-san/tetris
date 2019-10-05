/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\nlet controllableBlock = 0;\nlet nowBlocks = [];\nlet tmpBlocks = [];\nlet howManyFall = 0;\nlet left = true;\nlet right = true;\nlet down = true;\nlet angle = 0;\n// let stop = false;\nlet isComplete = false;\nconst ROW = 10;\nconst COLUMN = 14;\nlet field = [...Array(COLUMN * ROW)].map(v => v = 'empty');\nconst a = 4;\nconst BLOCKS = [\n    {\n        number: [a, a + 1, a + ROW, a + ROW + 1],\n        color: 'red',\n    },\n    {\n        number: [a, a + ROW, a + (ROW * 2), a + (ROW * 3)],\n        color: 'blue',\n    },\n    {\n        number: [a, a + 1, a + ROW, a + (ROW * 2)],\n        color: 'green',\n    },\n    {\n        number: [a, a + 1, a + ROW + 1, a + (ROW * 2) + 1],\n        color: 'orange',\n    },\n    {\n        number: [a, a + ROW, a + ROW + 1, a + (ROW * 2)],\n        color: 'yellow',\n    },\n    {\n        number: [a, a + ROW, a + ROW + 1, a + (ROW * 2) + 1],\n        color: 'purple',\n    },\n    {\n        number: [a + 1, a + ROW, a + ROW + 1, a + (ROW * 2)],\n        color: 'pink',\n    },\n];\nlet copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS));\nfunction createNewBlock() {\n    //controllableBlock = 5;\n    return controllableBlock = Math.floor(Math.random() * BLOCKS.length);\n}\nfunction updateBlocks(parts, direction) {\n    const plus = ((direction === 'down') ? ROW\n        : (direction === 'left') ? -1\n            : (direction === 'right') ? 1\n                : (direction === 'rotate') ? 0\n                    : 0);\n    parts.forEach((_, i, arr) => {\n        arr[i] += plus;\n    });\n}\nfunction fixToFirstDigit(digit) {\n    return Number(digit.toFixed().substr(-1, 1));\n}\nfunction resetBlocks() {\n    copyBLOCKS = JSON.parse(JSON.stringify(BLOCKS));\n}\nfunction updateField(array) {\n    array.forEach((v) => field[v] = 'current');\n}\nfunction clearField() {\n    nowBlocks.forEach((v) => field[v] = 'empty');\n}\nfunction controllableBlocksNumber() {\n    nowBlocks.length = 0;\n    field.forEach((v, i) => {\n        if (v === 'current') {\n            nowBlocks = [...nowBlocks, i];\n        }\n    });\n}\nfunction clearCanvas() {\n    if (!ctx) {\n        return;\n    }\n    ctx.clearRect(0, 0, 300, 420);\n}\nfunction blockMovable() {\n    left = true;\n    right = true;\n    down = true;\n    // check movable around block\n    field.forEach((v, i) => {\n        if (typeof v !== \"number\") {\n            return;\n        }\n        copyBLOCKS[controllableBlock].number.forEach((w) => {\n            if (w === (i + 1)) {\n                console.log('left failed');\n                left = false;\n            }\n            if (w === (i - 1)) {\n                console.log('right failed');\n                right = false;\n            }\n            if (field[i - ROW] === 'current') {\n                console.log('down failed');\n                down = false;\n            }\n        });\n    });\n    copyBLOCKS[controllableBlock].number.forEach((v, i, arr) => {\n        // check last row\n        const isLastRow = field.some(some => v >= field.length - ROW);\n        if (isLastRow) {\n            console.log('last row');\n            down = false;\n        }\n        // check left/right walls if its number of the first digit is 0(left)/9(right)\n        if (fixToFirstDigit(arr[i]) === fixToFirstDigit(ROW)) {\n            console.log('left walled');\n            left = false;\n        }\n        if (fixToFirstDigit(arr[i]) === fixToFirstDigit(ROW - 1)) {\n            console.log('right walled');\n            right = false;\n        }\n    });\n}\nfunction rotateAngle() {\n    angle += 90;\n    if (angle === 360) {\n        angle = 0;\n    }\n}\nfunction angleToRadians(num) {\n    let radians = 1.57;\n    radians += (Math.PI / 180) * (num);\n    return Number(radians.toFixed(2));\n}\nfunction translateNumberToRect(num, o) {\n    let rect;\n    if (num <= o && (o - num) <= 2) {\n        rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 0];\n    }\n    else if (num >= o && (num - o) <= 2) {\n        rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 0];\n    }\n    else if (num <= o && (o - num) >= 3 && (o - num) <= 13) {\n        rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 1];\n    }\n    else if (num >= o && (num - o) >= 3 && (num - o) <= 13) {\n        rect = [fixToFirstDigit(num) - fixToFirstDigit(o), -1];\n    }\n    else if (num <= o && (o - num) >= 3 && (o - num) >= 13) {\n        rect = [fixToFirstDigit(num) - fixToFirstDigit(o), 2];\n    }\n    else if (num >= o && (num - o) >= 3 && (num - o) >= 13) {\n        rect = [fixToFirstDigit(num) - fixToFirstDigit(o), -2];\n    }\n    else {\n        return [0, 0];\n    }\n    return rect;\n}\nfunction rotate(rect) {\n    const radians = (Math.PI / 180) * 90, cos = Math.cos(radians), sin = Math.sin(radians), nx = (cos * (rect[0] - 0)) + (sin * (rect[1] - 0)), ny = (cos * (rect[1] - 0)) - (sin * (rect[0] - 0));\n    return [Math.round(nx), Math.round(ny)];\n}\nfunction translateRectToNum(rotateRect) {\n    if (rotateRect[0] === 0 && rotateRect[1] > 0) {\n        return -(rotateRect[1] * ROW);\n    }\n    else if (rotateRect[0] === 0 && rotateRect[1] < 0) {\n        return -(rotateRect[1] * ROW);\n    }\n    else if (rotateRect[0] === 0 && rotateRect[1] > 0) {\n        return (rotateRect[1] * ROW);\n    }\n    else if (rotateRect[0] > 0 && rotateRect[1] === 0) {\n        return rotateRect[0];\n    }\n    else if (rotateRect[0] < 0 && rotateRect[1] === 0) {\n        return rotateRect[0];\n    }\n    else if (rotateRect[0] > 0 && rotateRect[1] > 0) {\n        return -(rotateRect[1] * ROW) + rotateRect[0];\n    }\n    else if (rotateRect[0] > 0 && rotateRect[1] < 0) {\n        return -(rotateRect[1] * ROW) + rotateRect[0];\n    }\n    else if (rotateRect[0] < 0 && rotateRect[1] > 0) {\n        return -(rotateRect[1] * ROW) + rotateRect[0];\n    }\n    else if (rotateRect[0] < 0 && rotateRect[1] < 0) {\n        return -(rotateRect[1] * ROW) + rotateRect[0];\n    }\n    else if (rotateRect[0] === 0 && rotateRect[1] === 0) {\n        return 0;\n    }\n    else {\n        return 0;\n    }\n}\nfunction isRotate(array) {\n    let leftWall = true;\n    let rightWall = true;\n    // wall check left/right\n    array.forEach((v) => {\n        if (fixToFirstDigit(v) === fixToFirstDigit(ROW)) {\n            leftWall = false;\n        }\n        if (fixToFirstDigit(v) === fixToFirstDigit(ROW - 1)) {\n            rightWall = false;\n        }\n    });\n    // fixed block check\n    let isFilled = true;\n    field.forEach((v, i) => {\n        if (typeof v !== \"number\") {\n            return;\n        }\n        array.forEach((w) => {\n            if (i === w) {\n                isFilled = false;\n            }\n        });\n    });\n    if (!leftWall && !rightWall || !isFilled) {\n        angle -= 90;\n        copyBLOCKS[controllableBlock].number = tmpBlocks;\n        return false;\n    }\n    else {\n        return true;\n    }\n}\nfunction blockRotatableArray() {\n    // position of organization point\n    let center;\n    // fix position after rotated\n    let fixPosition;\n    // can't rotate |+| block\n    if (controllableBlock === 0) {\n        return copyBLOCKS[controllableBlock].number;\n    }\n    // bar block\n    if (controllableBlock === 1) {\n        center = 1;\n    }\n    if (controllableBlock === 1 && angle === 0) {\n        fixPosition = 0;\n    }\n    else if (controllableBlock === 1 && angle === 270) {\n        fixPosition = 0;\n    }\n    else {\n        fixPosition = 1;\n    }\n    // reverse L block\n    if (controllableBlock === 2) {\n        fixPosition = 0;\n    }\n    if (controllableBlock === 2 && angle === 0) {\n        center = 2;\n    }\n    else if (controllableBlock === 2 && angle === 90) {\n        center = 2;\n    }\n    else {\n        center = 1;\n    }\n    // L block\n    if (controllableBlock === 3) {\n        fixPosition = 0;\n    }\n    if (controllableBlock === 3 && angle === 0) {\n        center = 1;\n    }\n    else if (controllableBlock === 3 && angle === 90) {\n        center = 2;\n    }\n    else if (controllableBlock === 3 && angle === 180) {\n        center = 2;\n    }\n    else if (controllableBlock === 3 && angle === 270) {\n        center = 1;\n    }\n    // T block\n    if (controllableBlock === 4) {\n        fixPosition = 0;\n    }\n    if (controllableBlock === 4 && angle === 0) {\n        center = 0;\n    }\n    else if (controllableBlock === 4 && angle === 90) {\n        center = 2;\n    }\n    else if (controllableBlock === 4 && angle === 180) {\n        center = 3;\n    }\n    else if (controllableBlock === 4 && angle === 270) {\n        center = 1;\n    }\n    // _| block\n    if (controllableBlock === 5) {\n        fixPosition = 0;\n    }\n    if (controllableBlock === 5 && angle === 0) {\n        center = 3;\n        fixPosition = -(ROW + 1);\n    }\n    else if (controllableBlock === 5 && angle === 90) {\n        center = 2;\n    }\n    else if (controllableBlock === 5 && angle === 180) {\n        center = 3;\n    }\n    else if (controllableBlock === 5 && angle === 270) {\n        center = 2;\n        fixPosition = ROW - 1;\n    }\n    // |_ block\n    if (controllableBlock === 6) {\n        center = 2;\n        fixPosition = 0;\n    }\n    if (controllableBlock === 6 && angle === 0) {\n        fixPosition = -(ROW + 1);\n    }\n    if (controllableBlock === 6 && angle === 270) {\n        fixPosition = ROW - 1;\n    }\n    const rotateBlocks = nowBlocks.map((v) => {\n        let num = translateNumberToRect(v, nowBlocks[center]), rect = rotate(num), update = translateRectToNum(rect);\n        return update + nowBlocks[center] + fixPosition;\n    });\n    rotateBlocks.sort((a, b) => a - b);\n    tmpBlocks = copyBLOCKS[controllableBlock].number;\n    return copyBLOCKS[controllableBlock].number = rotateBlocks;\n}\nfunction filterUndef(ts) {\n    return ts.filter((t) => !!t);\n}\nfunction isBlocksGathersInRow() {\n    if (left === false && right === false && down === false) {\n        isComplete = true;\n        // creat Array on each rows\n        let start = 0;\n        let end = ROW;\n        const oneRowArray = [...Array(COLUMN)].map(() => {\n            let oneROW = field.slice(start, end);\n            start += ROW;\n            end += ROW;\n            return oneROW;\n        });\n        let completeRowArray = []; // should delete areas\n        let completeRowNumbers = []; // row numbers\n        oneRowArray.forEach((v, i) => {\n            // skip if the row include 0\n            const isIncludeEmpty = v.every(item => item !== 'empty');\n            if (isIncludeEmpty) {\n                completeRowNumbers.push(i);\n                [...Array(ROW)].forEach((_, j) => {\n                    completeRowArray.push((i * ROW) + j);\n                });\n            }\n        });\n        // delete complete rows\n        completeRowArray.forEach((v) => field[v] = 'empty');\n        clearCanvas();\n        draw();\n        // move blocks as the amount of deleted rows\n        const lowerBlocks = filterUndef(field.map((v, i, arr) => {\n            if (i >= completeRowNumbers[0] * ROW) {\n                return;\n            }\n            if (v !== 'empty') {\n                arr[i] = 'empty';\n                return [v, i + (completeRowNumbers.length * ROW)];\n            }\n        }));\n        lowerBlocks.forEach((v) => {\n            const index = v[1];\n            field[index] = v[0];\n        });\n        setTimeout(clearCanvas, 1500);\n        setTimeout(draw, 1500);\n        // let c = [95,103,104,105];\n        // let ee = [];\n        // field.forEach((e,i) => {\n        //   if(e === 0) {\n        //     c.forEach((d,j) => {\n        //       if(field[i-(ROW+1)] === 2) {\n        //         field[d] = 0;\n        //         ee.push(d+(ROW+1));\n        //       }\n        //     })\n        //   }\n        // })\n        // ee.forEach((e,i) => {\n        //   field[e] = 2;\n        // });\n        //stop = true;\n    }\n}\nfunction draw() {\n    if (!ctx) {\n        return;\n    }\n    let outline = new Path2D();\n    outline.rect(0, 0, 300, 420);\n    ctx.stroke(outline);\n    field.forEach((v, i) => {\n        // draw controllable block\n        if (v !== 'empty' && v === 'current') {\n            ctx.fillStyle = copyBLOCKS[controllableBlock].color;\n            ctx.fillRect(fixToFirstDigit(i) * 30, Math.floor(i / 10) * 30, 30, 30);\n            ctx.fill();\n            // draw fixed block\n        }\n        if (v !== 'empty' && v !== 'current') {\n            ctx.fillStyle = copyBLOCKS[v].color;\n            ctx.fillRect(fixToFirstDigit(i) * 30, Math.floor(i / 10) * 30, 30, 30);\n            ctx.fill();\n        }\n    });\n}\nwindow.addEventListener('keydown', event => {\n    if (!event.isTrusted) {\n        return;\n    }\n    // down direction\n    if (event.keyCode === 40 && down) {\n        console.log('down');\n        updateBlocks(copyBLOCKS[controllableBlock].number, 'down');\n        clearField();\n        clearCanvas();\n        updateField(copyBLOCKS[controllableBlock].number);\n        draw();\n        // left direction\n    }\n    else if (event.keyCode === 37 && left) {\n        console.log('left');\n        updateBlocks(copyBLOCKS[controllableBlock].number, 'left');\n        clearField();\n        clearCanvas();\n        updateField(copyBLOCKS[controllableBlock].number);\n        draw();\n        // right direction\n    }\n    else if (event.keyCode === 39 && right) {\n        console.log('right');\n        updateBlocks(copyBLOCKS[controllableBlock].number, 'right');\n        clearField();\n        clearCanvas();\n        updateField(copyBLOCKS[controllableBlock].number);\n        draw();\n    }\n    else if (event.keyCode === 38 && rotate) {\n        rotateAngle();\n        if (!isRotate(blockRotatableArray())) {\n            console.log('cant rotate');\n            updateField(copyBLOCKS[controllableBlock].number);\n            return;\n        }\n        else {\n            console.log('rotate');\n            clearField();\n            clearCanvas();\n            updateField(blockRotatableArray());\n            updateBlocks(copyBLOCKS[controllableBlock].number, 'rotate');\n            draw();\n        }\n    }\n    blockMovable();\n    controllableBlocksNumber();\n    isBlocksGathersInRow();\n    if (down === false) {\n        console.log('check');\n        angle = 0;\n        resetBlocks();\n        field.forEach((v, i) => {\n            if (v === 'current') {\n                field[i] = controllableBlock;\n            }\n        });\n        controllableBlocksNumber();\n        clearField();\n        clearCanvas();\n        createNewBlock();\n        updateField(copyBLOCKS[controllableBlock].number);\n        controllableBlocksNumber();\n        draw();\n        down = true;\n    }\n    // console.log(angle);\n    // console.log(nowBlocks);\n    // console.log(field);\n});\nwindow.addEventListener('load', () => {\n    createNewBlock();\n    updateField(copyBLOCKS[controllableBlock].number);\n    draw();\n    controllableBlocksNumber();\n    blockMovable();\n});\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ })

/******/ });