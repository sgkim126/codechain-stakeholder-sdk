"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Table = require("cli-table3");
var codechain_primitives_1 = require("codechain-primitives");
var codechain_sdk_1 = require("codechain-sdk");
var fs = require("fs");
var yargs = require("yargs");
var PromptPassword = require("prompt-password");
function newSDK(params) {
    return __awaiter(this, void 0, void 0, function () {
        var sdk, networkId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = new codechain_sdk_1.SDK(__assign({}, params, { networkId: "cc" }));
                    return [4 /*yield*/, sdk.rpc.chain.getNetworkId()];
                case 1:
                    networkId = _a.sent();
                    return [2 /*return*/, new codechain_sdk_1.SDK(__assign({}, params, { networkId: networkId }))];
            }
        });
    });
}
exports.newSDK = newSDK;
function prologue(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var sdk, networkId, _a, hash, number, block, date;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, newSDK({
                        server: argv["rpc-server"],
                        keyStoreType: {
                            type: "local",
                            path: argv["keys-path"]
                        }
                    })];
                case 1:
                    sdk = _b.sent();
                    return [4 /*yield*/, sdk.rpc.chain.getNetworkId()];
                case 2:
                    networkId = _b.sent();
                    return [4 /*yield*/, sdk.rpc.chain.getBestBlockId()];
                case 3:
                    _a = _b.sent(), hash = _a.hash, number = _a.number;
                    return [4 /*yield*/, sdk.rpc.chain.getBlock(number)];
                case 4:
                    block = (_b.sent());
                    date = new Date(block.timestamp * 1000);
                    console.log("RPC server:", argv["rpc-server"]);
                    console.log("Network Id:", networkId);
                    console.group("Current block:");
                    console.log("Block number:", number);
                    console.log("Block hash:", hash.toString());
                    console.log("Block time:", date.toISOString());
                    console.groupEnd();
                    console.log();
                    return [2 /*return*/, {
                            sdk: sdk,
                            networkId: networkId,
                            date: date,
                            blockNumber: number,
                            blockHash: hash
                        }];
            }
        });
    });
}
exports.prologue = prologue;
function askPasspharaseFor(account) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt;
        return __generator(this, function (_a) {
            prompt = new PromptPassword({
                type: "password",
                message: "To continue, enter passphrase for " + account.value,
                name: "password"
            });
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    return prompt
                        .run()
                        .then(resolve)
                        .catch(reject);
                })];
        });
    });
}
exports.askPasspharaseFor = askPasspharaseFor;
function waitForTx(sdk, signed) {
    return __awaiter(this, void 0, void 0, function () {
        var hash, retry, tx, errorHint;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.chain.sendSignedTransaction(signed)];
                case 1:
                    hash = _a.sent();
                    retry = 0;
                    _a.label = 2;
                case 2:
                    if (retry === 10) {
                        throw new Error("Cannot fetch the transaction result");
                    }
                    return [4 /*yield*/, sdk.rpc.chain.containsTransaction(hash)];
                case 3:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, sdk.rpc.chain.getTransaction(hash)];
                case 4:
                    tx = (_a.sent());
                    return [2 /*return*/, tx.blockNumber];
                case 5: return [4 /*yield*/, sdk.rpc.chain.getErrorHint(hash)];
                case 6:
                    errorHint = _a.sent();
                    if (errorHint != null) {
                        console.error(signed.toJSON());
                        throw new Error(errorHint);
                    }
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    retry++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.waitForTx = waitForTx;
function createTable(head, colAligns) {
    var table = new Table({
        chars: {
            top: "",
            "top-mid": "",
            "top-left": "",
            "top-right": "",
            bottom: "",
            "bottom-mid": "",
            "bottom-left": "",
            "bottom-right": "",
            left: "",
            "left-mid": "",
            mid: "",
            "mid-mid": "",
            right: "",
            "right-mid": "",
            middle: " "
        },
        style: { "padding-left": 0, "padding-right": 1 },
        head: head,
        colAligns: colAligns || []
    });
    return table;
}
exports.createTable = createTable;
function percent(a, b) {
    var digits = 1;
    return new codechain_primitives_1.U64(100).value
        .times(a.value)
        .div(b.value)
        .toFixed(digits);
}
exports.percent = percent;
function plusChangeArgs(a, b) {
    if (b.isEqualTo(0)) {
        return [a.toLocaleString()];
    }
    else {
        return [a.toLocaleString(), "=>", a.plus(b).toLocaleString()];
    }
}
exports.plusChangeArgs = plusChangeArgs;
function minusChangeArgs(a, b) {
    if (b.isEqualTo(0)) {
        return [a.toLocaleString()];
    }
    else {
        if (a.isGreaterThanOrEqualTo(b)) {
            return [a.toLocaleString(), "=>", a.minus(b).toLocaleString()];
        }
        else {
            return [
                a.toLocaleString(),
                "=>",
                "-" + b.minus(a).toLocaleString()
            ];
        }
    }
}
exports.minusChangeArgs = minusChangeArgs;
function humanizeTimstamp(ts, options) {
    var _a = options || {}, _b = _a.current, current = _b === void 0 ? Date.now() / 1000 : _b, _c = _a.precision, precision = _c === void 0 ? 2 : _c, _d = _a.limit, limit = _d === void 0 ? 60 * 60 * 24 * 7 * 4 : _d;
    var offset = Math.abs(current - ts);
    if (offset < 1) {
        return "now";
    }
    else if (offset >= limit) {
        return null;
    }
    var table = [
        [60 * 60 * 24 * 7, "week", "weeks"],
        [60 * 60 * 24, "day", "days"],
        [60 * 60, "hour", "hours"],
        [60, "minute", "minutes"],
        [1, "second", "seconds"]
    ];
    var result = [];
    var firstIndex = -1;
    for (var i = 0; i < table.length; i++) {
        if (firstIndex !== -1 && i - firstIndex === precision) {
            break;
        }
        var _e = __read(table[i], 3), interval = _e[0], singular = _e[1], plural = _e[2];
        if (offset >= interval) {
            var units = Math.floor(offset / interval);
            offset %= interval;
            if (units === 1) {
                result.push(units + " " + singular);
            }
            else {
                result.push(units + " " + plural);
            }
            if (firstIndex === -1) {
                firstIndex = i;
            }
        }
    }
    var postfix;
    if (current > ts) {
        postfix = "ago";
    }
    else {
        postfix = "after";
    }
    return result.join(" ") + " " + postfix;
}
exports.humanizeTimstamp = humanizeTimstamp;
function formatTimestamp(ts, options) {
    if (options === void 0) { options = {}; }
    var date = new Date(ts * 1000).toISOString();
    var humanized = humanizeTimstamp(ts, options);
    if (humanized) {
        return date + " (" + humanized + ")";
    }
    else {
        return date;
    }
}
exports.formatTimestamp = formatTimestamp;
function asyncHandler(handler) {
    var _this = this;
    return function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    yargs.showHelpOnFail(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, handler(argv)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error("Error:", e_1.message);
                    if (process.env.STACK_TRACE_CCSTAKE) {
                        fs.writeFileSync("./ccstake-error.log", e_1.stack);
                    }
                    yargs.exit(-1, e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
}
exports.asyncHandler = asyncHandler;
function coerce(name, func) {
    return function (arg) {
        try {
            return func(arg);
        }
        catch (e) {
            throw new Error("Invalid option \"" + name + "\":\n" + e.message);
        }
    };
}
exports.coerce = coerce;
