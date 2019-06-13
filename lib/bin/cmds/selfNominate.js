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
var util_1 = require("../util");
exports.module = {
    command: "self-nominate",
    describe: "Self nominate as a candidate",
    builder: function (args) {
        return args
            .option("account", {
            describe: "An account to self-nominate",
            coerce: util_1.coerce("account", lib_1.PlatformAddress.ensure),
            demand: true
        })
            .option("deposit", {
            describe: "Deposit in CCC to self-nominate",
            coerce: util_1.coerce("deposit", lib_1.U64.ensure),
            demand: true
        })
            .option("metadata", {
            describe: "A hex-string or a plain text metadata",
            coerce: util_1.coerce("metadata", function (x) {
                if (x === null || x === undefined) {
                    return "";
                }
                else {
                    return x;
                }
            }),
            demand: true
        })
            .option("metadata-type", {
            choices: ["hex", "text"],
            default: "text"
        })
            .option("fee", {
            number: true,
            demand: true
        });
    },
    handler: util_1.asyncHandler(function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var metadata, _a, sdk, blockNumber, passphrase, tx, signed, _b, _c, _d, _e, newBlockNumber;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    metadata = normalizeMetadata(argv.metadata, argv["metadata-type"]);
                    return [4 /*yield*/, util_1.prologue(argv)];
                case 1:
                    _a = _f.sent(), sdk = _a.sdk, blockNumber = _a.blockNumber;
                    console.log("=== Confirm your action ===");
                    console.log("Action:", "SelfNominate");
                    console.log("Candidate:", argv.account.value);
                    console.log("Deposit:", argv.deposit.toLocaleString());
                    console.group("Metadata:");
                    metadata.print();
                    console.groupEnd();
                    return [4 /*yield*/, printSummary(sdk, blockNumber, argv.account, argv.deposit.plus(argv.fee))];
                case 2:
                    _f.sent();
                    return [4 /*yield*/, util_1.askPasspharaseFor(argv.account)];
                case 3:
                    passphrase = _f.sent();
                    tx = src_1.createSelfNominateTransaction(sdk, argv.deposit, metadata.buffer);
                    _c = (_b = sdk.key).signTransaction;
                    _d = [tx];
                    _e = {
                        account: argv.account,
                        passphrase: passphrase,
                        fee: argv.fee
                    };
                    return [4 /*yield*/, sdk.rpc.chain.getSeq(argv.account)];
                case 4: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.seq = _f.sent(),
                            _e)]))];
                case 5:
                    signed = _f.sent();
                    console.log("Sending tx:", signed.hash().value);
                    return [4 /*yield*/, util_1.waitForTx(sdk, signed)];
                case 6:
                    newBlockNumber = _f.sent();
                    console.log("Tx is contained in block #", newBlockNumber);
                    return [4 /*yield*/, printSummary(sdk, newBlockNumber, argv.account)];
                case 7:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); })
};
function printSummary(sdk, blockNumber, account, cccChanges) {
    return __awaiter(this, void 0, void 0, function () {
        var ccc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.group("Account", account.value);
                    return [4 /*yield*/, sdk.rpc.chain.getBalance(account, blockNumber)];
                case 1:
                    ccc = _a.sent();
                    console.log.apply(console, __spread(["CCC Balance:"], util_1.minusChangeArgs(ccc, cccChanges || new lib_1.U64(0))));
                    console.groupEnd();
                    return [2 /*return*/];
            }
        });
    });
}
function normalizeMetadata(metadata, designatedType) {
    if (metadata.length === 0) {
        return {
            buffer: Buffer.from([]),
            print: function () {
                console.log("Payload:", "null");
                console.log("Length:", 0, "bytes");
            }
        };
    }
    if (designatedType === "text") {
        var buffer_1 = Buffer.from(metadata, "utf8");
        return {
            buffer: buffer_1,
            print: function () {
                console.log("Payload (text):", metadata);
                console.log("Length:", buffer_1.length, "bytes");
            }
        };
    }
    else if (designatedType === "hex") {
        metadata = metadata.trim();
        if (!/^(0x)?[0-9a-fA-F]*$/.test(metadata)) {
            throw new Error("A metadata contains hex characters");
        }
        if (metadata.length % 2 !== 0) {
            throw new Error("A length of a metadata is not even");
        }
        if (metadata.startsWith("0x")) {
            metadata = metadata.substr(2);
        }
        var buffer_2 = Buffer.from(metadata, "hex");
        return {
            buffer: buffer_2,
            print: function () {
                console.log("Payload (hex):", "0x" + metadata);
                console.log("Length:", buffer_2.length, "bytes");
            }
        };
    }
    else {
        throw new Error("Invalid metadataType");
    }
}
