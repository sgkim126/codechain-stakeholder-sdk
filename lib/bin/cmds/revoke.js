"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("codechain-primitives/lib");
var src_1 = require("../../src");
var summerizer_1 = require("../summerizer");
var util_1 = require("../util");
exports.module = {
    command: "revoke",
    describe: "Revoke delegation to an account",
    builder: function (args) {
        return args
            .option("delegator", {
            coerce: util_1.coerce("delegator", lib_1.PlatformAddress.ensure),
            demand: true
        })
            .option("delegatee", {
            coerce: util_1.coerce("delegatee", lib_1.PlatformAddress.ensure),
            demand: true
        })
            .option("quantity", {
            coerce: util_1.coerce("quantity", lib_1.U64.ensure),
            demand: true
        })
            .option("fee", {
            number: true,
            default: 0
        });
    },
    handler: util_1.asyncHandler(function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var _a, sdk, blockNumber, passphrase, tx, signed, _b, _c, _d, _e, newBlockNumber;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, util_1.prologue(argv)];
                case 1:
                    _a = _f.sent(), sdk = _a.sdk, blockNumber = _a.blockNumber;
                    console.log("=== Confirm your action ===");
                    console.log("Action:", "Revoke");
                    console.log("Quantity:", argv.quantity.toString(10));
                    return [4 /*yield*/, printSummary(sdk, blockNumber, argv.delegator, argv.delegatee, {
                            ccsChanges: argv.quantity,
                            cccChanges: lib_1.U64.ensure(argv.fee)
                        })];
                case 2:
                    _f.sent();
                    return [4 /*yield*/, util_1.askPasspharaseFor(argv.delegator)];
                case 3:
                    passphrase = _f.sent();
                    tx = src_1.createRevokeTransaction(sdk, argv.delegatee, argv.quantity);
                    _c = (_b = sdk.key).signTransaction;
                    _d = [tx];
                    _e = {
                        account: argv.delegator,
                        passphrase: passphrase,
                        fee: argv.fee
                    };
                    return [4 /*yield*/, sdk.rpc.chain.getSeq(argv.delegator)];
                case 4: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.seq = _f.sent(),
                            _e)]))];
                case 5:
                    signed = _f.sent();
                    console.log("Sending tx:", signed.hash().value);
                    return [4 /*yield*/, util_1.waitForTx(sdk, signed)];
                case 6:
                    newBlockNumber = _f.sent();
                    console.log("Tx is contained in block #", newBlockNumber);
                    return [4 /*yield*/, printSummary(sdk, newBlockNumber, argv.delegator, argv.delegatee)];
                case 7:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); })
};
function printSummary(sdk, blockNumber, delegator, delegatee, changes) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, ccsChanges, _c, cccChanges, summary, cccBalance, _d, balance, undelegated, delegationsTo, _e, balance, undelegated, delegationsFrom;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = changes || {}, _b = _a.ccsChanges, ccsChanges = _b === void 0 ? new lib_1.U64(0) : _b, _c = _a.cccChanges, cccChanges = _c === void 0 ? new lib_1.U64(0) : _c;
                    return [4 /*yield*/, summerizer_1.summarize(sdk, blockNumber)];
                case 1:
                    summary = _f.sent();
                    console.group("Delegator", delegator.value);
                    return [4 /*yield*/, sdk.rpc.chain.getBalance(delegator, blockNumber)];
                case 2:
                    cccBalance = _f.sent();
                    _d = summary.get(delegator), balance = _d.balance, undelegated = _d.undelegated, delegationsTo = _d.delegationsTo;
                    console.log.apply(console, __spread(["CCC Balance:"], util_1.minusChangeArgs(cccBalance, cccChanges)));
                    console.log("CCS Balance:", balance.toLocaleString());
                    console.log.apply(console, __spread(["Undelegated CCS:"], util_1.plusChangeArgs(undelegated, ccsChanges)));
                    console.log.apply(console, __spread(["Delegations (out):"], util_1.minusChangeArgs(delegationsTo.sum, ccsChanges)));
                    console.groupEnd();
                    console.group("Delegatee", delegatee.value);
                    {
                        _e = summary.get(delegatee), balance = _e.balance, undelegated = _e.undelegated, delegationsFrom = _e.delegationsFrom;
                        console.log("CCS Balance:", balance.toLocaleString());
                        console.log("Undelegated CCS:", undelegated.toLocaleString());
                        console.log.apply(console, __spread(["Delegations (in):"], util_1.minusChangeArgs(delegationsFrom.sum, ccsChanges)));
                    }
                    console.groupEnd();
                    console.log.apply(console, __spread(["Delegations between:"], util_1.minusChangeArgs(summary.delegations(delegator, delegatee), ccsChanges)));
                    return [2 /*return*/];
            }
        });
    });
}
