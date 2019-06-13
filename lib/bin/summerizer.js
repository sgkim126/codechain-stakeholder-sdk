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
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("codechain-primitives/lib");
var src_1 = require("../src");
var QuantitySummerizableArray = /** @class */ (function () {
    function QuantitySummerizableArray() {
        this.values = [];
        this._sum = null;
    }
    Object.defineProperty(QuantitySummerizableArray.prototype, "sum", {
        get: function () {
            if (this._sum == null) {
                this._sum = sumU64(this.values.map(function (x) { return x.quantity; }));
            }
            return this._sum;
        },
        enumerable: true,
        configurable: true
    });
    return QuantitySummerizableArray;
}());
var AccountSummary = /** @class */ (function () {
    function AccountSummary() {
        this.undelegated = new lib_1.U64(0);
        this.delegationsTo = new QuantitySummerizableArray();
        this.delegationsFrom = new QuantitySummerizableArray();
    }
    Object.defineProperty(AccountSummary.prototype, "balance", {
        get: function () {
            return this.undelegated.plus(this.delegationsTo.sum);
        },
        enumerable: true,
        configurable: true
    });
    return AccountSummary;
}());
exports.AccountSummary = AccountSummary;
function summarize(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, ccsHolders, allUndelegateds, allDelegations, aggregate, i, delegator, delegations, delegatorSummary, delegations_1, delegations_1_1, _b, delegatee, quantity, delegateeSummary;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, src_1.getCCSHolders(sdk, blockNumber)];
                case 1:
                    ccsHolders = _c.sent();
                    return [4 /*yield*/, Promise.all(ccsHolders.map(function (ccsHolder) {
                            return src_1.getUndelegatedCCS(sdk, ccsHolder, blockNumber);
                        }))];
                case 2:
                    allUndelegateds = _c.sent();
                    return [4 /*yield*/, Promise.all(ccsHolders.map(function (ccsHolder) { return src_1.getDelegations(sdk, ccsHolder, blockNumber); }))];
                case 3:
                    allDelegations = _c.sent();
                    aggregate = {};
                    for (i = 0; i < ccsHolders.length; i++) {
                        delegator = ccsHolders[i];
                        delegations = allDelegations[i];
                        delegatorSummary = aggregate[delegator.value] || new AccountSummary();
                        delegatorSummary.undelegated = allUndelegateds[i];
                        delegatorSummary.delegationsTo.values = delegations;
                        aggregate[delegator.value] = delegatorSummary;
                        try {
                            for (delegations_1 = __values(delegations), delegations_1_1 = delegations_1.next(); !delegations_1_1.done; delegations_1_1 = delegations_1.next()) {
                                _b = delegations_1_1.value, delegatee = _b.delegatee, quantity = _b.quantity;
                                delegateeSummary = aggregate[delegatee.value] || new AccountSummary();
                                delegateeSummary.delegationsFrom.values.push({
                                    delegator: delegator,
                                    quantity: quantity
                                });
                                aggregate[delegatee.value] = delegateeSummary;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (delegations_1_1 && !delegations_1_1.done && (_a = delegations_1.return)) _a.call(delegations_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    return [2 /*return*/, {
                            totalCCS: getTotalCCS(allUndelegateds, allDelegations),
                            ccsHolders: ccsHolders,
                            get: function (account) {
                                return aggregate[account.value];
                            },
                            delegations: function (delegator, delegatee) {
                                var delegations = this.get(delegator).delegationsTo.values.filter(function (x) { return x.delegatee.value === delegatee.value; });
                                return sumU64(delegations.map(function (x) { return x.quantity; }));
                            }
                        }];
            }
        });
    });
}
exports.summarize = summarize;
function getTotalCCS(balances, allDelegations) {
    var e_2, _a;
    var totalBalance = sumU64(balances);
    var totalDelegations = new lib_1.U64(0);
    try {
        for (var allDelegations_1 = __values(allDelegations), allDelegations_1_1 = allDelegations_1.next(); !allDelegations_1_1.done; allDelegations_1_1 = allDelegations_1.next()) {
            var delegations = allDelegations_1_1.value;
            totalDelegations = totalDelegations.plus(sumU64(delegations.map(function (x) { return x.quantity; })));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (allDelegations_1_1 && !allDelegations_1_1.done && (_a = allDelegations_1.return)) _a.call(allDelegations_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return totalBalance.plus(totalDelegations);
}
function sumU64(values) {
    return values.reduce(function (a, b) { return a.plus(b); }, new lib_1.U64(0));
}
exports.sumU64 = sumU64;
