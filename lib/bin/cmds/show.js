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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var summerizer_1 = require("../summerizer");
var util_1 = require("../util");
exports.module = {
    command: "show [account]",
    describe: "Show staking status of an account",
    builder: function (args) {
        return args.positional("account", {
            describe: "An account to show",
            type: "string",
            coerce: util_1.coerce("account", function (account) {
                if (account !== undefined) {
                    return codechain_primitives_1.PlatformAddress.ensure(account);
                }
                else {
                    return undefined;
                }
            })
        });
    },
    handler: util_1.asyncHandler(function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var _a, sdk, blockNumber;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, util_1.prologue(argv)];
                case 1:
                    _a = _b.sent(), sdk = _a.sdk, blockNumber = _a.blockNumber;
                    if (!argv.account) return [3 /*break*/, 3];
                    return [4 /*yield*/, show(sdk, argv.account, blockNumber)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, overview(sdk, blockNumber)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); })
};
function show(sdk, account, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, e_2, _b, summaryAll, summary, balance, totalCCS, share, table, _c, _d, _e, delegatee, quantity, table, _f, _g, _h, delegator, quantity;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log("Staking summary of " + account.value);
                    console.log();
                    return [4 /*yield*/, summerizer_1.summarize(sdk, blockNumber)];
                case 1:
                    summaryAll = _j.sent();
                    summary = summaryAll.get(account);
                    balance = summary.balance;
                    totalCCS = summaryAll.totalCCS;
                    share = util_1.percent(balance, totalCCS);
                    console.log("CCS balance: " + balance.toLocaleString() + " of " + totalCCS.toLocaleString() + " (about " + share.toLocaleString() + "%)");
                    console.log("Undelegated CCS: " + summary.undelegated.toLocaleString());
                    console.group("Delegations to: Total " + summary.delegationsTo.sum.toLocaleString() + " CCS");
                    if (summary.delegationsTo.values.length > 0) {
                        table = util_1.createTable(["Delegatee", "Quantity"], ["left", "right"]);
                        try {
                            for (_c = __values(summary.delegationsTo.values), _d = _c.next(); !_d.done; _d = _c.next()) {
                                _e = _d.value, delegatee = _e.delegatee, quantity = _e.quantity;
                                table.push([delegatee.value, quantity.toLocaleString()]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        console.log(table.toString());
                    }
                    console.groupEnd();
                    console.group("Delegations from: Total " + summary.delegationsFrom.sum.toLocaleString() + " CCS");
                    if (summary.delegationsFrom.values.length > 0) {
                        table = util_1.createTable(["Delegator", "Quantity"], ["left", "right"]);
                        try {
                            for (_f = __values(summary.delegationsFrom.values), _g = _f.next(); !_g.done; _g = _f.next()) {
                                _h = _g.value, delegator = _h.delegator, quantity = _h.quantity;
                                table.push([delegator.value, quantity.toLocaleString()]);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        console.log(table.toString());
                    }
                    console.groupEnd();
                    return [2 /*return*/];
            }
        });
    });
}
function overview(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var e_3, _a, summary, table, _b, _c, account, _d, undelegated, delegationsTo, delegationsFrom, balance, share;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("Staking overview");
                    console.log();
                    return [4 /*yield*/, summerizer_1.summarize(sdk, blockNumber)];
                case 1:
                    summary = _e.sent();
                    console.log("Total CCS:", summary.totalCCS.toLocaleString());
                    table = util_1.createTable([
                        "Amount",
                        "%",
                        "CCS",
                        "Undelegated",
                        "Delegations\n(Out)",
                        "Delegations\n(In)"
                    ], ["left", "right", "right", "right", "right", "right", "right", "right"]);
                    try {
                        for (_b = __values(summary.ccsHolders), _c = _b.next(); !_c.done; _c = _b.next()) {
                            account = _c.value;
                            _d = summary.get(account), undelegated = _d.undelegated, delegationsTo = _d.delegationsTo, delegationsFrom = _d.delegationsFrom;
                            balance = undelegated.plus(delegationsTo.sum);
                            share = util_1.percent(balance, summary.totalCCS);
                            table.push([
                                account.value,
                                share.toString() + "%",
                                balance.toLocaleString(),
                                undelegated.toLocaleString(),
                                delegationsTo.sum.toLocaleString(),
                                delegationsFrom.sum.toLocaleString()
                            ]);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    console.log(table.toString());
                    return [2 /*return*/];
            }
        });
    });
}
