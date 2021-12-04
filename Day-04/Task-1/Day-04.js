"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var fs = require("fs");
var readline = require("readline");
var Board = /** @class */ (function () {
    function Board(input) {
        this.board1 = input.map(function (arr) {
            return arr.slice();
        });
        this.board2 = input.map(function (arr) {
            return arr.slice();
        });
        for (var i = 0; i < input.length; i++) {
            for (var j = 0; j < input[i].length; j++) {
                this.board1[i][j] = input[i][j];
                this.board2[j][i] = input[i][j];
            }
        }
    }
    Board.prototype.getBoards = function () {
        return [this.board1, this.board2];
    };
    Board.prototype.chechDraw = function (draw) {
        this.lastDraw = draw;
        for (var i = 0; i < this.board1.length; i++) {
            for (var j = 0; j < this.board1[i].length; j++) {
                if (this.board1[i][j] == draw)
                    this.board1[i][j] = 99999;
            }
        }
        for (var i = 0; i < this.board2.length; i++) {
            for (var j = 0; j < this.board2[i].length; j++) {
                if (this.board2[i][j] == draw)
                    this.board2[i][j] = 99999;
            }
        }
    };
    Board.prototype.getUnmarkedSum = function () {
        var unmarked = [];
        var sum = 0;
        for (var i = 0; i < this.board1.length; i++) {
            for (var j = 0; j < this.board1[i].length; j++) {
                if (this.board1[i][j] != 99999) {
                    unmarked.push(this.board1[i][j]);
                }
            }
        }
        unmarked.forEach(function (element) {
            sum += parseInt(element);
        });
        return sum;
    };
    Board.prototype.checkWin = function () {
        for (var i = 0; i < this.board1.length; i++) {
            var streak = true;
            for (var j = 0; j < this.board1[i].length; j++) {
                if (this.board1[i][j] != 99999) {
                    streak = false;
                    break;
                }
            }
            if (streak)
                return true;
        }
        for (var i = 0; i < this.board2.length; i++) {
            var streak = true;
            for (var j = 0; j < this.board2[i].length; j++) {
                if (this.board2[i][j] != 99999) {
                    streak = false;
                    break;
                }
            }
            if (streak)
                return true;
        }
        return false;
    };
    Board.prototype.getLastDraw = function () {
        return this.lastDraw;
    };
    return Board;
}());
parseInputs("input.txt").then(function (_a) {
    var draws = _a.draws, boards = _a.boards;
    var b = false;
    draws.forEach(function (element) {
        boards.forEach(function (el) {
            el.chechDraw(parseInt(element));
            if (el.checkWin() && !b) {
                var final = el.getUnmarkedSum() * el.getLastDraw();
                console.log(final);
                b = true;
            }
        });
    });
});
function parseInputs(file) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var filestream, rl, c, draws, boards, rl_1, rl_1_1, line, e_1_1, boardlist, board, fboardlist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    filestream = fs.createReadStream(file);
                    rl = readline.createInterface({ input: filestream, crlfDelay: Infinity });
                    c = 0;
                    draws = [];
                    boards = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    rl_1 = __asyncValues(rl);
                    _b.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _b.sent(), !rl_1_1.done)) return [3 /*break*/, 5];
                    line = rl_1_1.value;
                    if (c == 0) {
                        draws = line.split(",");
                    }
                    else if (c > 1) {
                        boards.push(line.replace("\n", "").split(" "));
                    }
                    c++;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(rl_1_1 && !rl_1_1.done && (_a = rl_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(rl_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    boardlist = [];
                    board = [];
                    boards.forEach(function (el) {
                        if (el.length == 1) {
                            boardlist.push(board);
                            board = [];
                        }
                        else {
                            var row_1 = [];
                            el.forEach(function (element) {
                                if (element != "")
                                    row_1.push(element);
                            });
                            board.push(row_1);
                        }
                    });
                    fboardlist = [];
                    boardlist.forEach(function (element) {
                        var b = new Board(element);
                        fboardlist.push(b);
                    });
                    return [2 /*return*/, { draws: draws, boards: fboardlist }];
            }
        });
    });
}
