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
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("codechain-primitives/lib");
var RLP = require("rlp");
var HANDLER_ID = 2;
var TRANSFER_CCS_ACTION_ID = 1;
var DELEGATE_CCS_ACTION_ID = 2;
var REQUEST_REVOKE_ACTION_ID = 3;
function getCCSBalance(sdk, address, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(HANDLER_ID, [
                        "Account",
                        lib_1.PlatformAddress.ensure(address)
                            .getAccountId()
                            .toEncodeObject()
                    ], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, new lib_1.U64(0)];
                    }
                    return [2 /*return*/, decodeU64(RLP.decode(Buffer.from(data, "hex")))];
            }
        });
    });
}
exports.getCCSBalance = getCCSBalance;
function getCCSHolders(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(HANDLER_ID, ["StakeholderAddresses"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        throw Error("never");
                    }
                    list = RLP.decode(Buffer.from(data, "hex"));
                    return [2 /*return*/, list.map(function (buf) { return decodePlatformAddress(sdk, buf); })];
            }
        });
    });
}
exports.getCCSHolders = getCCSHolders;
function getDelegations(sdk, delegator, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(2, ["Delegation", delegator.accountId.toEncodeObject()], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    list = RLP.decode(Buffer.from(data, "hex"));
                    return [2 /*return*/, list.map(function (_a) {
                            var _b = __read(_a, 2), delegatee = _b[0], quantity = _b[1];
                            return {
                                delegatee: decodePlatformAddress(sdk, delegatee),
                                quantity: decodeU64(quantity)
                            };
                        })];
            }
        });
    });
}
exports.getDelegations = getDelegations;
function getPendingRevocations(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(2, ["Revocations"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    list = RLP.decode(Buffer.from(data, "hex"));
                    return [2 /*return*/, list.map(function (_a) {
                            var _b = __read(_a, 4), delegator = _b[0], delegatee = _b[1], endTime = _b[2], quantity = _b[3];
                            return {
                                delegator: decodePlatformAddress(sdk, delegator),
                                delegatee: decodePlatformAddress(sdk, delegatee),
                                endTime: decodeNumber(endTime),
                                quantity: decodeU64(quantity)
                            };
                        })];
            }
        });
    });
}
exports.getPendingRevocations = getPendingRevocations;
function decodeNumber(buffer) {
    var parsed = parseInt(buffer.toString("hex"), 16);
    if (isNaN(parsed)) {
        throw new Error("buffer is not a number");
    }
    return parsed;
}
function decodeU64(buffer) {
    return lib_1.U64.ensure("0x" + buffer.toString("hex"));
}
function decodePlatformAddress(sdk, buffer) {
    var accountId = buffer.toString("hex");
    return lib_1.PlatformAddress.fromAccountId(accountId, {
        networkId: sdk.networkId
    });
}
function createTransferCCSTransaction(sdk, recipient, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            TRANSFER_CCS_ACTION_ID,
            lib_1.PlatformAddress.ensure(recipient).accountId.toEncodeObject(),
            lib_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createTransferCCSTransaction = createTransferCCSTransaction;
function createDelegateCCSTransaction(sdk, delegator, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            DELEGATE_CCS_ACTION_ID,
            lib_1.PlatformAddress.ensure(delegator).accountId.toEncodeObject(),
            lib_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createDelegateCCSTransaction = createDelegateCCSTransaction;
function createRequestRevokeTransaction(sdk, delegator, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: HANDLER_ID,
        bytes: RLP.encode([
            REQUEST_REVOKE_ACTION_ID,
            lib_1.PlatformAddress.ensure(delegator).accountId.toEncodeObject(),
            lib_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createRequestRevokeTransaction = createRequestRevokeTransaction;
