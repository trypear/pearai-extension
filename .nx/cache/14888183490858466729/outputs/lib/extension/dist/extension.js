"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/nanoid/url-alphabet/index.js
var urlAlphabet;
var init_url_alphabet = __esm({
  "../../node_modules/nanoid/url-alphabet/index.js"() {
    urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  }
});

// ../../node_modules/nanoid/index.js
var import_crypto, POOL_SIZE_MULTIPLIER, pool, poolOffset, fillPool, nanoid;
var init_nanoid = __esm({
  "../../node_modules/nanoid/index.js"() {
    import_crypto = __toESM(require("crypto"), 1);
    init_url_alphabet();
    POOL_SIZE_MULTIPLIER = 128;
    fillPool = (bytes) => {
      if (!pool || pool.length < bytes) {
        pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
        import_crypto.default.randomFillSync(pool);
        poolOffset = 0;
      } else if (poolOffset + bytes > pool.length) {
        import_crypto.default.randomFillSync(pool);
        poolOffset = 0;
      }
      poolOffset += bytes;
    };
    nanoid = (size = 21) => {
      fillPool(size -= 0);
      let id = "";
      for (let i = poolOffset - size; i < poolOffset; i++) {
        id += urlAlphabet[pool[i] & 63];
      }
      return id;
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
var init_errorMessages = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/errorMessages.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/Options.js
var defaultOptions, getDefaultOptions;
var init_Options = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/Options.js"() {
    defaultOptions = {
      name: void 0,
      $refStrategy: "root",
      basePath: ["#"],
      effectStrategy: "input",
      pipeStrategy: "all",
      dateStrategy: "string",
      mapStrategy: "entries",
      definitionPath: "definitions",
      target: "jsonSchema7",
      strictUnions: false,
      definitions: {},
      errorMessages: false,
      markdownDescription: false,
      patternStrategy: "escape",
      emailStrategy: "format:email"
    };
    getDefaultOptions = (options) => typeof options === "string" ? {
      ...defaultOptions,
      name: options
    } : {
      ...defaultOptions,
      ...options
    };
  }
});

// ../../node_modules/zod/lib/index.mjs
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var util, objectUtil, ZodParsedType, getParsedType, ZodIssueCode, quotelessJson, ZodError, errorMap, overrideErrorMap, makeIssue, EMPTY_PATH, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, errorUtil, ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv6Regex, datetimeRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, ZodReadonly, custom, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce, NEVER, z;
var init_lib = __esm({
  "../../node_modules/zod/lib/index.mjs"() {
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = (obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    };
    ZodError = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
    errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    };
    overrideErrorMap = errorMap;
    makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    EMPTY_PATH = [];
    ParseStatus = class {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (this._key instanceof Array) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    ZodType = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this, this._def);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[a-z][a-z0-9]*$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
    ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    datetimeRegex = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    ZodString = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(
            ctx2,
            {
              code: ZodIssueCode.invalid_type,
              expected: ZodParsedType.string,
              received: ctx2.parsedType
            }
          );
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
      }
      datetime(options) {
        var _a;
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
          offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
          ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options === null || options === void 0 ? void 0 : options.position,
          ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
      }
      trim() {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      var _a;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodBigInt.create = (params) => {
      var _a;
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = class extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip")
            ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              syncPairs.push({
                key,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      extend(augmentation) {
        return new ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      merge(merging) {
        const merged = new ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      catchall(index) {
        return new ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key) => {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key) => {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else {
        return null;
      }
    };
    ZodDiscriminatedUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values) {
        return ZodEnum.create(values);
      }
      exclude(values) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.issues.length) {
            return {
              status: "dirty",
              value: ctx.data
            };
          }
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return base;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return base;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        if (isValid(result)) {
          result.value = Object.freeze(result.value);
        }
        return result;
      }
    };
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    custom = (check, params = {}, fatal) => {
      if (check)
        return ZodAny.create().superRefine((data, ctx) => {
          var _a, _b;
          if (!check(data)) {
            const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
            const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
            const p2 = typeof p === "string" ? { message: p } : p;
            ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
          }
        });
      return ZodAny.create();
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = () => stringType().optional();
    onumber = () => numberType().optional();
    oboolean = () => booleanType().optional();
    coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
    z = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      defaultErrorMap: errorMap,
      setErrorMap,
      getErrorMap,
      makeIssue,
      EMPTY_PATH,
      addIssueToContext,
      ParseStatus,
      INVALID,
      DIRTY,
      OK,
      isAborted,
      isDirty,
      isValid,
      isAsync,
      get util() {
        return util;
      },
      get objectUtil() {
        return objectUtil;
      },
      ZodParsedType,
      getParsedType,
      ZodType,
      ZodString,
      ZodNumber,
      ZodBigInt,
      ZodBoolean,
      ZodDate,
      ZodSymbol,
      ZodUndefined,
      ZodNull,
      ZodAny,
      ZodUnknown,
      ZodNever,
      ZodVoid,
      ZodArray,
      ZodObject,
      ZodUnion,
      ZodDiscriminatedUnion,
      ZodIntersection,
      ZodTuple,
      ZodRecord,
      ZodMap,
      ZodSet,
      ZodFunction,
      ZodLazy,
      ZodLiteral,
      ZodEnum,
      ZodNativeEnum,
      ZodPromise,
      ZodEffects,
      ZodTransformer: ZodEffects,
      ZodOptional,
      ZodNullable,
      ZodDefault,
      ZodCatch,
      ZodNaN,
      BRAND,
      ZodBranded,
      ZodPipeline,
      ZodReadonly,
      custom,
      Schema: ZodType,
      ZodSchema: ZodType,
      late,
      get ZodFirstPartyTypeKind() {
        return ZodFirstPartyTypeKind;
      },
      coerce,
      any: anyType,
      array: arrayType,
      bigint: bigIntType,
      boolean: booleanType,
      date: dateType,
      discriminatedUnion: discriminatedUnionType,
      effect: effectsType,
      "enum": enumType,
      "function": functionType,
      "instanceof": instanceOfType,
      intersection: intersectionType,
      lazy: lazyType,
      literal: literalType,
      map: mapType,
      nan: nanType,
      nativeEnum: nativeEnumType,
      never: neverType,
      "null": nullType,
      nullable: nullableType,
      number: numberType,
      object: objectType,
      oboolean,
      onumber,
      optional: optionalType,
      ostring,
      pipeline: pipelineType,
      preprocess: preprocessType,
      promise: promiseType,
      record: recordType,
      set: setType,
      strictObject: strictObjectType,
      string: stringType,
      symbol: symbolType,
      transformer: effectsType,
      tuple: tupleType,
      "undefined": undefinedType,
      union: unionType,
      unknown: unknownType,
      "void": voidType,
      NEVER,
      ZodIssueCode,
      quotelessJson,
      ZodError
    });
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}
var init_any = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/any.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}
var init_array = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/array.js"() {
    init_lib();
    init_errorMessages();
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
var init_bigint = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js"() {
    init_errorMessages();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}
var init_boolean = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
var init_branded = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/branded.js"() {
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef;
var init_catch = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/catch.js"() {
    init_parseDef();
    parseCatchDef = (def, refs) => {
      return parseDef(def.innerType._def, refs);
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs) {
  if (refs.dateStrategy == "integer") {
    return integerDateParser(def, refs);
  } else {
    return {
      type: "string",
      format: "date-time"
    };
  }
}
var integerDateParser;
var init_date = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/date.js"() {
    init_errorMessages();
    integerDateParser = (def, refs) => {
      const res = {
        type: "integer",
        format: "unix-time"
      };
      for (const check of def.checks) {
        switch (check.kind) {
          case "min":
            if (refs.target === "jsonSchema7") {
              setResponseValueAndErrors(
                res,
                "minimum",
                check.value,
                check.message,
                refs
              );
            }
            break;
          case "max":
            if (refs.target === "jsonSchema7") {
              setResponseValueAndErrors(
                res,
                "maximum",
                check.value,
                check.message,
                refs
              );
            }
            break;
        }
      }
      return res;
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
var init_default = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/default.js"() {
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}
var init_effects = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/effects.js"() {
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: def.values
  };
}
var init_enum = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/enum.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}
var isJsonSchema7AllOfType;
var init_intersection = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js"() {
    init_parseDef();
    isJsonSchema7AllOfType = (type) => {
      if ("type" in type && type.type === "string")
        return false;
      return "allOf" in type;
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
var init_literal = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/literal.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/string.js
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  function processPattern(value) {
    return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(value) : value;
  }
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex.source, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, "^" + processPattern(check.value), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, processPattern(check.value) + "$", check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, processPattern(check.value), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji, check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          ((_) => {
          })(check);
      }
    }
  }
  return res;
}
var zodPatterns, escapeNonAlphaNumeric, addFormat, addPattern;
var init_string = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/string.js"() {
    init_errorMessages();
    zodPatterns = {
      cuid: "^[cC][^\\s-]{8,}$",
      cuid2: "^[a-z][a-z0-9]*$",
      ulid: "^[0-9A-HJKMNP-TV-Z]{26}$",
      email: "^(?!\\.)(?!.*\\.\\.)([a-zA-Z0-9_+-\\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\\-]*\\.)+[a-zA-Z]{2,}$",
      emoji: "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
      uuid: "^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$",
      ipv4: "^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$",
      ipv6: "^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$"
    };
    escapeNonAlphaNumeric = (value) => Array.from(value).map((c) => /[a-zA-Z0-9]/.test(c) ? c : `\\${c}`).join("");
    addFormat = (schema, value, message, refs) => {
      if (schema.format || schema.anyOf?.some((x) => x.format)) {
        if (!schema.anyOf) {
          schema.anyOf = [];
        }
        if (schema.format) {
          schema.anyOf.push({
            format: schema.format,
            ...schema.errorMessage && refs.errorMessages && {
              errorMessage: { format: schema.errorMessage.format }
            }
          });
          delete schema.format;
          if (schema.errorMessage) {
            delete schema.errorMessage.format;
            if (Object.keys(schema.errorMessage).length === 0) {
              delete schema.errorMessage;
            }
          }
        }
        schema.anyOf.push({
          format: value,
          ...message && refs.errorMessages && { errorMessage: { format: message } }
        });
      } else {
        setResponseValueAndErrors(schema, "format", value, message, refs);
      }
    };
    addPattern = (schema, value, message, refs) => {
      if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
        if (!schema.allOf) {
          schema.allOf = [];
        }
        if (schema.pattern) {
          schema.allOf.push({
            pattern: schema.pattern,
            ...schema.errorMessage && refs.errorMessages && {
              errorMessage: { pattern: schema.errorMessage.pattern }
            }
          });
          delete schema.pattern;
          if (schema.errorMessage) {
            delete schema.errorMessage.pattern;
            if (Object.keys(schema.errorMessage).length === 0) {
              delete schema.errorMessage;
            }
          }
        }
        schema.allOf.push({
          pattern: value,
          ...message && refs.errorMessages && { errorMessage: { pattern: message } }
        });
      } else {
        setResponseValueAndErrors(schema, "pattern", value, message, refs);
      }
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: false
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const keyType = Object.entries(parseStringDef(def.keyType._def, refs)).reduce((acc, [key, value]) => key === "type" ? acc : { ...acc, [key]: value }, {});
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  }
  return schema;
}
var init_record = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/record.js"() {
    init_lib();
    init_parseDef();
    init_string();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
var init_map = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/map.js"() {
    init_parseDef();
    init_record();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
var init_nativeEnum = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}
var init_never = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/never.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}
var init_null = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/null.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/union.js
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var primitiveMappings, asAnyOf;
var init_union = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/union.js"() {
    init_parseDef();
    primitiveMappings = {
      ZodString: "string",
      ZodNumber: "number",
      ZodBigInt: "integer",
      ZodBoolean: "boolean",
      ZodNull: "null"
    };
    asAnyOf = (def, refs) => {
      const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", `${i}`]
      })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
      return anyOf.length ? { anyOf } : void 0;
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}
var init_nullable = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js"() {
    init_parseDef();
    init_union();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
var init_number = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/number.js"() {
    init_errorMessages();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const result = {
    type: "object",
    ...Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
      if (propDef === void 0 || propDef._def === void 0)
        return acc;
      const parsedDef = parseDef(propDef._def, {
        ...refs,
        currentPath: [...refs.currentPath, "properties", propName],
        propertyPath: [...refs.currentPath, "properties", propName]
      });
      if (parsedDef === void 0)
        return acc;
      return {
        properties: { ...acc.properties, [propName]: parsedDef },
        required: propDef.isOptional() ? acc.required : [...acc.required, propName]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true
  };
  if (!result.required.length)
    delete result.required;
  return result;
}
var init_object = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/object.js"() {
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef;
var init_optional = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/optional.js"() {
    init_parseDef();
    parseOptionalDef = (def, refs) => {
      if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
        return parseDef(def.innerType._def, refs);
      }
      const innerSchema = parseDef(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "1"]
      });
      return innerSchema ? {
        anyOf: [
          {
            not: {}
          },
          innerSchema
        ]
      } : {};
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef;
var init_pipeline = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js"() {
    init_parseDef();
    parsePipelineDef = (def, refs) => {
      if (refs.pipeStrategy === "input") {
        return parseDef(def.in._def, refs);
      } else if (refs.pipeStrategy === "output") {
        return parseDef(def.out._def, refs);
      }
      const a = parseDef(def.in._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", "0"]
      });
      const b = parseDef(def.out._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
      });
      return {
        allOf: [a, b].filter((x) => x !== void 0)
      };
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
var init_promise = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/promise.js"() {
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}
var init_set = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/set.js"() {
    init_errorMessages();
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}
var init_tuple = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js"() {
    init_parseDef();
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}
var init_undefined = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}
var init_unknown = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js"() {
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef;
var init_readonly = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js"() {
    init_parseDef();
    parseReadonlyDef = (def, refs) => {
      return parseDef(def.innerType._def, refs);
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchema = selectParser(def, def.typeName, refs);
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref, getRelativePath, selectParser, addMeta;
var init_parseDef = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/parseDef.js"() {
    init_lib();
    init_any();
    init_array();
    init_bigint();
    init_boolean();
    init_branded();
    init_catch();
    init_date();
    init_default();
    init_effects();
    init_enum();
    init_intersection();
    init_literal();
    init_map();
    init_nativeEnum();
    init_never();
    init_null();
    init_nullable();
    init_number();
    init_object();
    init_optional();
    init_pipeline();
    init_promise();
    init_record();
    init_set();
    init_string();
    init_tuple();
    init_undefined();
    init_union();
    init_unknown();
    init_readonly();
    get$ref = (item, refs) => {
      switch (refs.$refStrategy) {
        case "root":
          return { $ref: item.path.join("/") };
        case "relative":
          return { $ref: getRelativePath(refs.currentPath, item.path) };
        case "none":
        case "seen": {
          if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
            console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
            return {};
          }
          return refs.$refStrategy === "seen" ? {} : void 0;
        }
      }
    };
    getRelativePath = (pathA, pathB) => {
      let i = 0;
      for (; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] !== pathB[i])
          break;
      }
      return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
    };
    selectParser = (def, typeName, refs) => {
      switch (typeName) {
        case ZodFirstPartyTypeKind.ZodString:
          return parseStringDef(def, refs);
        case ZodFirstPartyTypeKind.ZodNumber:
          return parseNumberDef(def, refs);
        case ZodFirstPartyTypeKind.ZodObject:
          return parseObjectDef(def, refs);
        case ZodFirstPartyTypeKind.ZodBigInt:
          return parseBigintDef(def, refs);
        case ZodFirstPartyTypeKind.ZodBoolean:
          return parseBooleanDef();
        case ZodFirstPartyTypeKind.ZodDate:
          return parseDateDef(def, refs);
        case ZodFirstPartyTypeKind.ZodUndefined:
          return parseUndefinedDef();
        case ZodFirstPartyTypeKind.ZodNull:
          return parseNullDef(refs);
        case ZodFirstPartyTypeKind.ZodArray:
          return parseArrayDef(def, refs);
        case ZodFirstPartyTypeKind.ZodUnion:
        case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
          return parseUnionDef(def, refs);
        case ZodFirstPartyTypeKind.ZodIntersection:
          return parseIntersectionDef(def, refs);
        case ZodFirstPartyTypeKind.ZodTuple:
          return parseTupleDef(def, refs);
        case ZodFirstPartyTypeKind.ZodRecord:
          return parseRecordDef(def, refs);
        case ZodFirstPartyTypeKind.ZodLiteral:
          return parseLiteralDef(def, refs);
        case ZodFirstPartyTypeKind.ZodEnum:
          return parseEnumDef(def);
        case ZodFirstPartyTypeKind.ZodNativeEnum:
          return parseNativeEnumDef(def);
        case ZodFirstPartyTypeKind.ZodNullable:
          return parseNullableDef(def, refs);
        case ZodFirstPartyTypeKind.ZodOptional:
          return parseOptionalDef(def, refs);
        case ZodFirstPartyTypeKind.ZodMap:
          return parseMapDef(def, refs);
        case ZodFirstPartyTypeKind.ZodSet:
          return parseSetDef(def, refs);
        case ZodFirstPartyTypeKind.ZodLazy:
          return parseDef(def.getter()._def, refs);
        case ZodFirstPartyTypeKind.ZodPromise:
          return parsePromiseDef(def, refs);
        case ZodFirstPartyTypeKind.ZodNaN:
        case ZodFirstPartyTypeKind.ZodNever:
          return parseNeverDef();
        case ZodFirstPartyTypeKind.ZodEffects:
          return parseEffectsDef(def, refs);
        case ZodFirstPartyTypeKind.ZodAny:
          return parseAnyDef();
        case ZodFirstPartyTypeKind.ZodUnknown:
          return parseUnknownDef();
        case ZodFirstPartyTypeKind.ZodDefault:
          return parseDefaultDef(def, refs);
        case ZodFirstPartyTypeKind.ZodBranded:
          return parseBrandedDef(def, refs);
        case ZodFirstPartyTypeKind.ZodReadonly:
          return parseReadonlyDef(def, refs);
        case ZodFirstPartyTypeKind.ZodCatch:
          return parseCatchDef(def, refs);
        case ZodFirstPartyTypeKind.ZodPipeline:
          return parsePipelineDef(def, refs);
        case ZodFirstPartyTypeKind.ZodFunction:
        case ZodFirstPartyTypeKind.ZodVoid:
        case ZodFirstPartyTypeKind.ZodSymbol:
          return void 0;
        default:
          return ((_) => void 0)(typeName);
      }
    };
    addMeta = (def, refs, jsonSchema) => {
      if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
          jsonSchema.markdownDescription = def.description;
        }
      }
      return jsonSchema;
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs;
var init_Refs = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/Refs.js"() {
    init_Options();
    getRefs = (options) => {
      const _options = getDefaultOptions(options);
      const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
      return {
        ..._options,
        currentPath,
        propertyPath: void 0,
        seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
          def._def,
          {
            def: def._def,
            path: [..._options.basePath, _options.definitionPath, name],
            jsonSchema: void 0
          }
        ]))
      };
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema;
var init_zodToJsonSchema = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js"() {
    init_parseDef();
    init_Refs();
    zodToJsonSchema = (schema, options) => {
      const refs = getRefs(options);
      const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
        ...acc,
        [name2]: parseDef(schema2._def, {
          ...refs,
          currentPath: [...refs.basePath, refs.definitionPath, name2]
        }, true) ?? {}
      }), {}) : void 0;
      const name = typeof options === "string" ? options : options?.name;
      const main = parseDef(schema._def, name === void 0 ? refs : {
        ...refs,
        currentPath: [...refs.basePath, refs.definitionPath, name]
      }, false) ?? {};
      const combined = name === void 0 ? definitions ? {
        ...main,
        [refs.definitionPath]: definitions
      } : main : {
        $ref: [
          ...refs.$refStrategy === "relative" ? [] : refs.basePath,
          refs.definitionPath,
          name
        ].join("/"),
        [refs.definitionPath]: {
          ...definitions,
          [name]: main
        }
      };
      if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
      } else if (refs.target === "jsonSchema2019-09") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
      }
      return combined;
    };
  }
});

// ../../node_modules/zod-to-json-schema/dist/esm/index.js
var init_esm = __esm({
  "../../node_modules/zod-to-json-schema/dist/esm/index.js"() {
    init_errorMessages();
    init_Options();
    init_parseDef();
    init_any();
    init_array();
    init_bigint();
    init_boolean();
    init_branded();
    init_catch();
    init_date();
    init_default();
    init_effects();
    init_enum();
    init_intersection();
    init_literal();
    init_map();
    init_nativeEnum();
    init_never();
    init_null();
    init_nullable();
    init_number();
    init_object();
    init_optional();
    init_pipeline();
    init_promise();
    init_readonly();
    init_record();
    init_set();
    init_string();
    init_tuple();
    init_undefined();
    init_union();
    init_unknown();
    init_Refs();
    init_zodToJsonSchema();
    init_zodToJsonSchema();
  }
});

// ../../node_modules/secure-json-parse/index.js
var require_secure_json_parse = __commonJS({
  "../../node_modules/secure-json-parse/index.js"(exports2, module2) {
    "use strict";
    var hasBuffer = typeof Buffer !== "undefined";
    var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
    var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    function _parse(text13, reviver, options) {
      if (options == null) {
        if (reviver !== null && typeof reviver === "object") {
          options = reviver;
          reviver = void 0;
        }
      }
      if (hasBuffer && Buffer.isBuffer(text13)) {
        text13 = text13.toString();
      }
      if (text13 && text13.charCodeAt(0) === 65279) {
        text13 = text13.slice(1);
      }
      const obj = JSON.parse(text13, reviver);
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const protoAction = options && options.protoAction || "error";
      const constructorAction = options && options.constructorAction || "error";
      if (protoAction === "ignore" && constructorAction === "ignore") {
        return obj;
      }
      if (protoAction !== "ignore" && constructorAction !== "ignore") {
        if (suspectProtoRx.test(text13) === false && suspectConstructorRx.test(text13) === false) {
          return obj;
        }
      } else if (protoAction !== "ignore" && constructorAction === "ignore") {
        if (suspectProtoRx.test(text13) === false) {
          return obj;
        }
      } else {
        if (suspectConstructorRx.test(text13) === false) {
          return obj;
        }
      }
      return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
    }
    function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (safe === true) {
              return null;
            } else if (protoAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
            if (safe === true) {
              return null;
            } else if (constructorAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.constructor;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(value);
            }
          }
        }
      }
      return obj;
    }
    function parse(text13, reviver, options) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text13, reviver, options);
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    function safeParse(text13, reviver) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text13, reviver, { safe: true });
      } catch (_e) {
        return null;
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    module2.exports = parse;
    module2.exports.default = parse;
    module2.exports.parse = parse;
    module2.exports.safeParse = safeParse;
    module2.exports.scan = filter;
  }
});

// ../../node_modules/eventsource-parser/dist/index.js
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
        });
        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
function hasBom(buffer) {
  return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}
var BOM;
var init_dist = __esm({
  "../../node_modules/eventsource-parser/dist/index.js"() {
    BOM = [239, 187, 191];
  }
});

// ../../node_modules/js-tiktoken/dist/chunk-XXPGZHWZ.js
var __defProp2, __defNormalProp, __publicField;
var init_chunk_XXPGZHWZ = __esm({
  "../../node_modules/js-tiktoken/dist/chunk-XXPGZHWZ.js"() {
    __defProp2 = Object.defineProperty;
    __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
  }
});

// ../../node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "../../node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// ../../node_modules/js-tiktoken/dist/chunk-THGZSONF.js
function bytePairMerge(piece, ranks) {
  let parts = Array.from(
    { length: piece.length },
    (_, i) => ({ start: i, end: i + 1 })
  );
  while (parts.length > 1) {
    let minRank = null;
    for (let i = 0; i < parts.length - 1; i++) {
      const slice = piece.slice(parts[i].start, parts[i + 1].end);
      const rank = ranks.get(slice.join(","));
      if (rank == null)
        continue;
      if (minRank == null || rank < minRank[0]) {
        minRank = [rank, i];
      }
    }
    if (minRank != null) {
      const i = minRank[1];
      parts[i] = { start: parts[i].start, end: parts[i + 1].end };
      parts.splice(i + 1, 1);
    } else {
      break;
    }
  }
  return parts;
}
function bytePairEncode(piece, ranks) {
  if (piece.length === 1)
    return [ranks.get(piece.join(","))];
  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
}
function escapeRegex(str) {
  return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var import_base64_js, _Tiktoken, Tiktoken;
var init_chunk_THGZSONF = __esm({
  "../../node_modules/js-tiktoken/dist/chunk-THGZSONF.js"() {
    init_chunk_XXPGZHWZ();
    import_base64_js = __toESM(require_base64_js(), 1);
    _Tiktoken = class {
      specialTokens;
      inverseSpecialTokens;
      patStr;
      textEncoder = new TextEncoder();
      textDecoder = new TextDecoder("utf-8");
      rankMap = /* @__PURE__ */ new Map();
      textMap = /* @__PURE__ */ new Map();
      constructor(ranks, extendedSpecialTokens) {
        this.patStr = ranks.pat_str;
        const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
          const [_, offsetStr, ...tokens] = x.split(" ");
          const offset = Number.parseInt(offsetStr, 10);
          tokens.forEach((token, i) => memo[token] = offset + i);
          return memo;
        }, {});
        for (const [token, rank] of Object.entries(uncompressed)) {
          const bytes = import_base64_js.default.toByteArray(token);
          this.rankMap.set(bytes.join(","), rank);
          this.textMap.set(rank, bytes);
        }
        this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
        this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text13, rank]) => {
          memo[rank] = this.textEncoder.encode(text13);
          return memo;
        }, {});
      }
      encode(text13, allowedSpecial = [], disallowedSpecial = "all") {
        const regexes = new RegExp(this.patStr, "ug");
        const specialRegex = _Tiktoken.specialTokenRegex(
          Object.keys(this.specialTokens)
        );
        const ret = [];
        const allowedSpecialSet = new Set(
          allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
        );
        const disallowedSpecialSet = new Set(
          disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
            (x) => !allowedSpecialSet.has(x)
          ) : disallowedSpecial
        );
        if (disallowedSpecialSet.size > 0) {
          const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
            ...disallowedSpecialSet
          ]);
          const specialMatch = text13.match(disallowedSpecialRegex);
          if (specialMatch != null) {
            throw new Error(
              `The text contains a special token that is not allowed: ${specialMatch[0]}`
            );
          }
        }
        let start = 0;
        while (true) {
          let nextSpecial = null;
          let startFind = start;
          while (true) {
            specialRegex.lastIndex = startFind;
            nextSpecial = specialRegex.exec(text13);
            if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
              break;
            startFind = nextSpecial.index + 1;
          }
          const end = nextSpecial?.index ?? text13.length;
          for (const match of text13.substring(start, end).matchAll(regexes)) {
            const piece = this.textEncoder.encode(match[0]);
            const token2 = this.rankMap.get(piece.join(","));
            if (token2 != null) {
              ret.push(token2);
              continue;
            }
            ret.push(...bytePairEncode(piece, this.rankMap));
          }
          if (nextSpecial == null)
            break;
          let token = this.specialTokens[nextSpecial[0]];
          ret.push(token);
          start = nextSpecial.index + nextSpecial[0].length;
        }
        return ret;
      }
      decode(tokens) {
        const res = [];
        let length = 0;
        for (let i2 = 0; i2 < tokens.length; ++i2) {
          const token = tokens[i2];
          const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
          if (bytes != null) {
            res.push(bytes);
            length += bytes.length;
          }
        }
        const mergedArray = new Uint8Array(length);
        let i = 0;
        for (const bytes of res) {
          mergedArray.set(bytes, i);
          i += bytes.length;
        }
        return this.textDecoder.decode(mergedArray);
      }
    };
    Tiktoken = _Tiktoken;
    __publicField(Tiktoken, "specialTokenRegex", (tokens) => {
      return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
    });
  }
});

// ../../node_modules/js-tiktoken/dist/lite.js
var init_lite = __esm({
  "../../node_modules/js-tiktoken/dist/lite.js"() {
    init_chunk_THGZSONF();
    init_chunk_XXPGZHWZ();
  }
});

// ../../node_modules/js-tiktoken/dist/chunk-H4GMFLYA.js
var cl100k_base_default;
var init_chunk_H4GMFLYA = __esm({
  "../../node_modules/js-tiktoken/dist/chunk-H4GMFLYA.js"() {
  }
});

// ../../node_modules/js-tiktoken/dist/ranks/cl100k_base.js
var init_cl100k_base = __esm({
  "../../node_modules/js-tiktoken/dist/ranks/cl100k_base.js"() {
    init_chunk_H4GMFLYA();
    init_chunk_XXPGZHWZ();
  }
});

// ../../node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "../../node_modules/ws/lib/stream.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data))
          ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed)
          return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy)
          ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused)
          ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module2.exports = createWebSocketStream2;
  }
});

// ../../node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/ws/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
      kListener: Symbol("kListener"),
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// ../../node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "../../node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list2, totalLength) {
      if (list2.length === 0)
        return EMPTY_BUFFER;
      if (list2.length === 1)
        return list2[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list2.length; i++) {
        const buf = list2[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module2.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = require("bufferutil");
        module2.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bufferUtil.mask(source, mask, output, offset, length);
        };
        module2.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// ../../node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "../../node_modules/ws/lib/limiter.js"(exports2, module2) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module2.exports = Limiter;
  }
});

// ../../node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "../../node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// ../../node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "../../node_modules/ws/lib/validation.js"(exports2, module2) {
    "use strict";
    var { isUtf8 } = require("buffer");
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    module2.exports = {
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module2.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = require("utf-8-validate");
        module2.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// ../../node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "../../node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var promise = Promise.resolve();
    var queueTask = typeof queueMicrotask === "function" ? queueMicrotask : queueMicrotaskShim;
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var WAIT_MICROTASK = 6;
    var Receiver2 = class extends Writable {
      constructor(options = {}) {
        super();
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            case INFLATING:
              this._loop = false;
              return;
            default:
              this._loop = false;
              queueTask(() => {
                this._state = GET_INFO;
                this.startLoop(cb);
              });
              return;
          }
        } while (this._loop);
        cb(err);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (!this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
          }
          if (compressed) {
            this._loop = false;
            return error(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            this._loop = false;
            return error(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
          }
        } else {
          this._loop = false;
          return error(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
          }
        } else if (this._masked) {
          this._loop = false;
          return error(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(
                error(
                  RangeError,
                  "Max payload size exceeded",
                  false,
                  1009,
                  "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
                )
              );
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data, true);
          } else {
            const buf = concat(fragments, messageLength);
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              this._loop = false;
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("message", buf, false);
          }
        }
        this._state = WAIT_MICROTASK;
      }
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
            this._state = GET_INFO;
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              return error(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
            }
            this.emit("conclude", code, buf);
            this.end();
            this._state = GET_INFO;
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
          this._state = WAIT_MICROTASK;
        } else {
          this.emit("pong", data);
          this._state = WAIT_MICROTASK;
        }
      }
    };
    module2.exports = Receiver2;
    function error(ErrorCtor, message, prefix, statusCode, errorCode) {
      const err = new ErrorCtor(
        prefix ? `Invalid WebSocket frame: ${message}` : message
      );
      Error.captureStackTrace(err, error);
      err.code = errorCode;
      err[kStatusCode] = statusCode;
      return err;
    }
    function queueMicrotaskShim(cb) {
      promise.then(cb).catch(throwErrorNextTick);
    }
    function throwError(err) {
      throw err;
    }
    function throwErrorNextTick(err) {
      process.nextTick(throwError, err);
    }
  }
});

// ../../node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "../../node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";
    var { Duplex } = require("stream");
    var { randomFillSync } = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var Sender2 = class {
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            randomFillSync(mask, 0, 4);
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask)
          return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking)
          return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else {
            buf.set(data, 2);
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(Sender2.frame(buf, options), cb);
        }
      }
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender2.frame(data, options), cb);
        }
      }
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(Sender2.frame(data, options), cb);
        }
      }
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            [kByteLength]: byteLength,
            fin: options.fin,
            generateMask: this._generateMask,
            mask: options.mask,
            maskBuffer: this._maskBuffer,
            opcode,
            readOnly,
            rsv1
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, data, this._compress, opts, cb]);
          } else {
            this.dispatch(data, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(
            Sender2.frame(data, {
              [kByteLength]: byteLength,
              fin: options.fin,
              generateMask: this._generateMask,
              mask: options.mask,
              maskBuffer: this._maskBuffer,
              opcode,
              readOnly,
              rsv1: false
            }),
            cb
          );
        }
      }
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender2.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            if (typeof cb === "function")
              cb(err);
            for (let i = 0; i < this._queue.length; i++) {
              const params = this._queue[i];
              const callback = params[params.length - 1];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender2.frame(buf, options), cb);
          this.dequeue();
        });
      }
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      sendFrame(list2, cb) {
        if (list2.length === 2) {
          this._socket.cork();
          this._socket.write(list2[0]);
          this._socket.write(list2[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list2[0], cb);
        }
      }
    };
    module2.exports = Sender2;
  }
});

// ../../node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "../../node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = Symbol("kCode");
    var kData = Symbol("kData");
    var kError = Symbol("kError");
    var kMessage = Symbol("kMessage");
    var kReason = Symbol("kReason");
    var kTarget = Symbol("kTarget");
    var kType = Symbol("kType");
    var kWasClean = Symbol("kWasClean");
    var Event = class {
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      get target() {
        return this[kTarget];
      }
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      get code() {
        return this[kCode];
      }
      get reason() {
        return this[kReason];
      }
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      get error() {
        return this[kError];
      }
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      addEventListener(type, handler, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      removeEventListener(type, handler) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module2.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// ../../node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "../../node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1)
              start = i;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1)
              end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values))
                values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = { format, parse };
  }
});

// ../../node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "../../node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var https = require("https");
    var http = require("http");
    var net = require("net");
    var tls = require("tls");
    var { randomBytes, createHash } = require("crypto");
    var { Duplex, Readable } = require("stream");
    var { URL: URL2 } = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var closeTimeout = 30 * 1e3;
    var kAborted = Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket3 = class extends EventEmitter {
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = WebSocket3.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      get isPaused() {
        return this._paused;
      }
      get onclose() {
        return null;
      }
      get onerror() {
        return null;
      }
      get onopen() {
        return null;
      }
      get onmessage() {
        return null;
      }
      get protocol() {
        return this._protocol;
      }
      get readyState() {
        return this._readyState;
      }
      get url() {
        return this._url;
      }
      setSocket(socket, head, options) {
        const receiver = new Receiver2({
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        this._sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        if (socket.setTimeout)
          socket.setTimeout(0);
        if (socket.setNoDelay)
          socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = WebSocket3.OPEN;
        this.emit("open");
      }
      emitClose() {
        if (!this._socket) {
          this._readyState = WebSocket3.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = WebSocket3.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      close(code, data) {
        if (this.readyState === WebSocket3.CLOSED)
          return;
        if (this.readyState === WebSocket3.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === WebSocket3.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = WebSocket3.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(
          this._socket.destroy.bind(this._socket),
          closeTimeout
        );
      }
      pause() {
        if (this.readyState === WebSocket3.CONNECTING || this.readyState === WebSocket3.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      ping(data, mask, cb) {
        if (this.readyState === WebSocket3.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket3.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      pong(data, mask, cb) {
        if (this.readyState === WebSocket3.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket3.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      resume() {
        if (this.readyState === WebSocket3.CONNECTING || this.readyState === WebSocket3.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain)
          this._socket.resume();
      }
      send(data, options, cb) {
        if (this.readyState === WebSocket3.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket3.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      terminate() {
        if (this.readyState === WebSocket3.CLOSED)
          return;
        if (this.readyState === WebSocket3.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = WebSocket3.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket3, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket3, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket3, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket3, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket3.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket3.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket3.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute])
              return listener[kListener];
          }
          return null;
        },
        set(handler) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler !== "function")
            return;
          this.addEventListener(method, handler, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket3.prototype.addEventListener = addEventListener;
    WebSocket3.prototype.removeEventListener = removeEventListener;
    module2.exports = WebSocket3;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch (e) {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(
          opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
          false,
          opts.maxPayload
        );
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost)
              delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted])
          return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket3.CONNECTING)
          return;
        req = websocket._req = null;
        if (res.headers.upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket3.CLOSING;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket3.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0)
        return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused)
        websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      websocket.emit("error", err);
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket3.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket3.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket3.CLOSING;
        this.destroy();
      }
    }
  }
});

// ../../node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "../../node_modules/ws/lib/subprotocol.js"(exports2, module2) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module2.exports = { parse };
  }
});

// ../../node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "../../node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events");
    var http = require("http");
    var { Duplex } = require("stream");
    var { createHash } = require("crypto");
    var extension = require_extension();
    var PerMessageDeflate = require_permessage_deflate();
    var subprotocol = require_subprotocol();
    var WebSocket3 = require_websocket();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      constructor(options, callback) {
        super();
        options = {
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket3,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const version = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (req.headers.upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!key || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version !== 8 && version !== 13) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate(
            this.options.perMessageDeflate,
            true,
            this.options.maxPayload
          );
          try {
            const offers = extension.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = extension.format({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module2.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (const event of Object.keys(map))
        server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message);
      }
    }
  }
});

// ../../node_modules/ws/wrapper.mjs
var wrapper_exports = {};
__export(wrapper_exports, {
  Receiver: () => import_receiver.default,
  Sender: () => import_sender.default,
  WebSocket: () => import_websocket.default,
  WebSocketServer: () => import_websocket_server.default,
  createWebSocketStream: () => import_stream.default,
  default: () => wrapper_default
});
var import_stream, import_receiver, import_sender, import_websocket, import_websocket_server, wrapper_default;
var init_wrapper = __esm({
  "../../node_modules/ws/wrapper.mjs"() {
    import_stream = __toESM(require_stream(), 1);
    import_receiver = __toESM(require_receiver(), 1);
    import_sender = __toESM(require_sender(), 1);
    import_websocket = __toESM(require_websocket(), 1);
    import_websocket_server = __toESM(require_websocket_server(), 1);
    wrapper_default = import_websocket.default;
  }
});

// ../../node_modules/modelfusion/index.js
var modelfusion_exports = {};
__export(modelfusion_exports, {
  AbortError: () => AbortError,
  AbstractOpenAIChatModel: () => AbstractOpenAIChatModel,
  AbstractOpenAICompletionModel: () => AbstractOpenAICompletionModel,
  AbstractOpenAITextEmbeddingModel: () => AbstractOpenAITextEmbeddingModel,
  AlpacaPrompt: () => AlpacaPromptTemplate_exports,
  ApiCallError: () => ApiCallError,
  AsyncQueue: () => AsyncQueue,
  Automatic1111ApiConfiguration: () => Automatic1111ApiConfiguration,
  Automatic1111ImageGenerationModel: () => Automatic1111ImageGenerationModel,
  AzureOpenAIApiConfiguration: () => AzureOpenAIApiConfiguration,
  BaseUrlApiConfiguration: () => BaseUrlApiConfiguration,
  BaseUrlApiConfigurationWithDefaults: () => BaseUrlApiConfigurationWithDefaults,
  COHERE_TEXT_EMBEDDING_MODELS: () => COHERE_TEXT_EMBEDDING_MODELS,
  COHERE_TEXT_GENERATION_MODELS: () => COHERE_TEXT_GENERATION_MODELS,
  ChatMLPrompt: () => ChatMLPromptTemplate_exports,
  ChatMessage: () => ChatMessage,
  CohereApiConfiguration: () => CohereApiConfiguration,
  CohereTextEmbeddingModel: () => CohereTextEmbeddingModel,
  CohereTextGenerationModel: () => CohereTextGenerationModel,
  CohereTextGenerationResponseFormat: () => CohereTextGenerationResponseFormat,
  CohereTokenizer: () => CohereTokenizer,
  DefaultRun: () => DefaultRun,
  ElevenLabsApiConfiguration: () => ElevenLabsApiConfiguration,
  ElevenLabsSpeechModel: () => ElevenLabsSpeechModel,
  EmbeddingSimilarityClassifier: () => EmbeddingSimilarityClassifier,
  FireworksAIApiConfiguration: () => FireworksAIApiConfiguration,
  FunctionEventSource: () => FunctionEventSource,
  HeliconeOpenAIApiConfiguration: () => HeliconeOpenAIApiConfiguration,
  HuggingFaceApiConfiguration: () => HuggingFaceApiConfiguration,
  HuggingFaceTextEmbeddingModel: () => HuggingFaceTextEmbeddingModel,
  HuggingFaceTextGenerationModel: () => HuggingFaceTextGenerationModel,
  InvalidPromptError: () => InvalidPromptError,
  JSONParseError: () => JSONParseError,
  Llama2Prompt: () => Llama2PromptTemplate_exports,
  LlamaCppApiConfiguration: () => LlamaCppApiConfiguration,
  LlamaCppCompletionModel: () => LlamaCppCompletionModel,
  LlamaCppCompletionResponseFormat: () => LlamaCppCompletionResponseFormat,
  LlamaCppTextEmbeddingModel: () => LlamaCppTextEmbeddingModel,
  LlamaCppTokenizer: () => LlamaCppTokenizer,
  LmntApiConfiguration: () => LmntApiConfiguration,
  LmntSpeechModel: () => LmntSpeechModel,
  MemoryCache: () => MemoryCache,
  MemoryVectorIndex: () => MemoryVectorIndex,
  MistralApiConfiguration: () => MistralApiConfiguration,
  MistralChatModel: () => MistralChatModel,
  MistralChatResponseFormat: () => MistralChatResponseFormat,
  MistralInstructPrompt: () => MistralInstructPromptTemplate_exports,
  MistralTextEmbeddingModel: () => MistralTextEmbeddingModel,
  NeuralChatPrompt: () => NeuralChatPromptTemplate_exports,
  NoSuchToolDefinitionError: () => NoSuchToolDefinitionError,
  OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT: () => OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT,
  OPENAI_CHAT_MODELS: () => OPENAI_CHAT_MODELS,
  OPENAI_CHAT_PROMPT_BASE_TOKEN_COUNT: () => OPENAI_CHAT_PROMPT_BASE_TOKEN_COUNT,
  OPENAI_IMAGE_MODELS: () => OPENAI_IMAGE_MODELS,
  OPENAI_SPEECH_MODELS: () => OPENAI_SPEECH_MODELS,
  OPENAI_TEXT_EMBEDDING_MODELS: () => OPENAI_TEXT_EMBEDDING_MODELS,
  OPENAI_TEXT_GENERATION_MODELS: () => OPENAI_TEXT_GENERATION_MODELS,
  OPENAI_TRANSCRIPTION_MODELS: () => OPENAI_TRANSCRIPTION_MODELS,
  ObjectFromTextGenerationModel: () => ObjectFromTextGenerationModel,
  ObjectFromTextStreamingModel: () => ObjectFromTextStreamingModel,
  ObjectGeneratorTool: () => ObjectGeneratorTool,
  ObjectParseError: () => ObjectParseError,
  ObjectStreamFromResponse: () => ObjectStreamFromResponse,
  ObjectStreamResponse: () => ObjectStreamResponse,
  ObjectValidationError: () => ObjectValidationError,
  OllamaApiConfiguration: () => OllamaApiConfiguration,
  OllamaChatModel: () => OllamaChatModel,
  OllamaChatResponseFormat: () => OllamaChatResponseFormat,
  OllamaCompletionModel: () => OllamaCompletionModel,
  OllamaCompletionResponseFormat: () => OllamaCompletionResponseFormat,
  OllamaTextEmbeddingModel: () => OllamaTextEmbeddingModel,
  OpenAIApiConfiguration: () => OpenAIApiConfiguration,
  OpenAIChatMessage: () => OpenAIChatMessage,
  OpenAIChatModel: () => OpenAIChatModel,
  OpenAIChatResponseFormat: () => OpenAIChatResponseFormat,
  OpenAICompatibleChatModel: () => OpenAICompatibleChatModel,
  OpenAICompatibleCompletionModel: () => OpenAICompatibleCompletionModel,
  OpenAICompatibleTextEmbeddingModel: () => OpenAICompatibleTextEmbeddingModel,
  OpenAICompletionModel: () => OpenAICompletionModel,
  OpenAIImageGenerationModel: () => OpenAIImageGenerationModel,
  OpenAIImageGenerationResponseFormat: () => OpenAIImageGenerationResponseFormat,
  OpenAISpeechModel: () => OpenAISpeechModel,
  OpenAITextEmbeddingModel: () => OpenAITextEmbeddingModel,
  OpenAITextResponseFormat: () => OpenAITextResponseFormat,
  OpenAITranscriptionModel: () => OpenAITranscriptionModel,
  OpenAITranscriptionResponseFormat: () => OpenAITranscriptionResponseFormat,
  PerplexityApiConfiguration: () => PerplexityApiConfiguration,
  PromptTemplateFullTextModel: () => PromptTemplateFullTextModel,
  PromptTemplateImageGenerationModel: () => PromptTemplateImageGenerationModel,
  PromptTemplateTextGenerationModel: () => PromptTemplateTextGenerationModel,
  PromptTemplateTextStreamingModel: () => PromptTemplateTextStreamingModel,
  RetryError: () => RetryError,
  StabilityApiConfiguration: () => StabilityApiConfiguration,
  StabilityImageGenerationModel: () => StabilityImageGenerationModel,
  SynthiaPrompt: () => SynthiaPromptTemplate_exports,
  TextGenerationToolCallModel: () => TextGenerationToolCallModel,
  TextGenerationToolCallsModel: () => TextGenerationToolCallsModel,
  TextPrompt: () => TextPromptTemplate_exports,
  TikTokenTokenizer: () => TikTokenTokenizer,
  TogetherAIApiConfiguration: () => TogetherAIApiConfiguration,
  Tool: () => Tool,
  ToolCallArgumentsValidationError: () => ToolCallArgumentsValidationError,
  ToolCallError: () => ToolCallError,
  ToolCallGenerationError: () => ToolCallGenerationError,
  ToolCallParseError: () => ToolCallParseError,
  ToolCallsParseError: () => ToolCallsParseError,
  ToolExecutionError: () => ToolExecutionError,
  TypeValidationError: () => TypeValidationError,
  UncheckedSchema: () => UncheckedSchema,
  VectorIndexRetriever: () => VectorIndexRetriever,
  VicunaPrompt: () => VicunaPromptTemplate_exports,
  WebSearchTool: () => WebSearchTool,
  WhisperCppApiConfiguration: () => WhisperCppApiConfiguration,
  WhisperCppTranscriptionModel: () => WhisperCppTranscriptionModel,
  ZodSchema: () => ZodSchema,
  api: () => ApiFacade_exports,
  automatic1111: () => Automatic1111Facade_exports,
  calculateOpenAIChatCostInMillicents: () => calculateOpenAIChatCostInMillicents,
  calculateOpenAICompletionCostInMillicents: () => calculateOpenAICompletionCostInMillicents,
  calculateOpenAIEmbeddingCostInMillicents: () => calculateOpenAIEmbeddingCostInMillicents,
  calculateOpenAIImageGenerationCostInMillicents: () => calculateOpenAIImageGenerationCostInMillicents,
  calculateOpenAISpeechCostInMillicents: () => calculateOpenAISpeechCostInMillicents,
  calculateOpenAITranscriptionCostInMillicents: () => calculateOpenAITranscriptionCostInMillicents,
  classify: () => classify,
  cohere: () => CohereFacade_exports,
  convertDataContentToBase64String: () => convertDataContentToBase64String,
  convertDataContentToUint8Array: () => convertDataContentToUint8Array,
  cosineSimilarity: () => cosineSimilarity,
  countOpenAIChatMessageTokens: () => countOpenAIChatMessageTokens,
  countOpenAIChatPromptTokens: () => countOpenAIChatPromptTokens,
  countTokens: () => countTokens,
  createChatPrompt: () => createChatPrompt,
  createEventSourceStream: () => createEventSourceStream,
  createInstructionPrompt: () => createInstructionPrompt,
  createTextPrompt: () => createTextPrompt,
  delay: () => delay,
  elevenlabs: () => ElevenLabsFacade_exports,
  embed: () => embed,
  embedMany: () => embedMany,
  executeFunction: () => executeFunction,
  executeTool: () => executeTool,
  generateImage: () => generateImage,
  generateObject: () => generateObject,
  generateSpeech: () => generateSpeech,
  generateText: () => generateText,
  generateToolCall: () => generateToolCall,
  generateToolCalls: () => generateToolCalls,
  generateTranscription: () => generateTranscription,
  getAudioFileExtension: () => getAudioFileExtension,
  getOpenAIChatModelInformation: () => getOpenAIChatModelInformation,
  getOpenAICompletionModelInformation: () => getOpenAICompletionModelInformation,
  getRun: () => getRun,
  huggingface: () => HuggingFaceFacade_exports,
  isOpenAIChatModel: () => isOpenAIChatModel,
  isOpenAICompletionModel: () => isOpenAICompletionModel,
  isOpenAIEmbeddingModel: () => isOpenAIEmbeddingModel,
  isPromptFunction: () => isPromptFunction,
  jsonObjectPrompt: () => jsonObjectPrompt,
  jsonToolCallPrompt: () => jsonToolCallPrompt,
  llamacpp: () => LlamaCppFacade_exports,
  lmnt: () => LmntFacade_exports,
  mapBasicPromptToAutomatic1111Format: () => mapBasicPromptToAutomatic1111Format,
  mapBasicPromptToStabilityFormat: () => mapBasicPromptToStabilityFormat,
  markAsPromptFunction: () => markAsPromptFunction,
  mistral: () => MistralFacade_exports,
  modelfusion: () => ModelFusionConfiguration_exports,
  ollama: () => OllamaFacade_exports,
  openai: () => OpenAIFacade_exports,
  openaicompatible: () => OpenAICompatibleFacade_exports,
  parseJSON: () => parseJSON,
  retrieve: () => retrieve,
  retryNever: () => retryNever,
  retryWithExponentialBackoff: () => retryWithExponentialBackoff,
  runTool: () => runTool,
  runTools: () => runTools,
  safeParseJSON: () => safeParseJSON,
  safeValidateTypes: () => safeValidateTypes,
  splitAtCharacter: () => splitAtCharacter,
  splitAtToken: () => splitAtToken,
  splitOnSeparator: () => splitOnSeparator,
  splitTextChunk: () => splitTextChunk,
  splitTextChunks: () => splitTextChunks,
  stability: () => StabilityFacade_exports,
  streamObject: () => streamObject,
  streamSpeech: () => streamSpeech,
  streamText: () => streamText,
  textGenerationModelProperties: () => textGenerationModelProperties,
  throttleMaxConcurrency: () => throttleMaxConcurrency,
  throttleOff: () => throttleOff,
  trimChatPrompt: () => trimChatPrompt,
  uncheckedSchema: () => uncheckedSchema,
  upsertIntoVectorIndex: () => upsertIntoVectorIndex,
  validateContentIsString: () => validateContentIsString,
  validateTypes: () => validateTypes,
  whispercpp: () => WhisperCppFacade_exports,
  withRun: () => withRun,
  zodSchema: () => zodSchema
});
function setFunctionObservers(functionObservers) {
  globalFunctionObservers = functionObservers;
}
function getFunctionObservers() {
  return globalFunctionObservers;
}
function setLogFormat(format) {
  globalLogFormat = format;
}
function getLogFormat() {
  return globalLogFormat;
}
async function expandPrompt(prompt) {
  return isPromptFunction(prompt) ? await prompt() : { input: prompt, prompt };
}
function markAsPromptFunction(fn) {
  fn[promptFunctionMarker] = true;
  return fn;
}
function isPromptFunction(fn) {
  const hasMarker = fn[promptFunctionMarker] === true;
  const isFunction = typeof fn === "function";
  return hasMarker && isFunction;
}
async function delay(delayInMs) {
  return new Promise((resolve) => setTimeout(resolve, delayInMs));
}
function getErrorMessage(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
async function _retryWithExponentialBackoff(f, {
  maxTries,
  delayInMs,
  backoffFactor
}, errors = []) {
  try {
    return await f();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    const newErrors = [...errors, error];
    const tryNumber = newErrors.length;
    if (tryNumber >= maxTries) {
      throw new RetryError({
        message: `Failed after ${tryNumber} tries. Last error: ${errorMessage}`,
        reason: "maxTriesExceeded",
        errors: newErrors
      });
    }
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw error;
      }
      if (error instanceof ApiCallError && error.isRetryable && tryNumber < maxTries) {
        await delay(delayInMs);
        return _retryWithExponentialBackoff(
          f,
          { maxTries, delayInMs: backoffFactor * delayInMs, backoffFactor },
          newErrors
        );
      }
    }
    throw new RetryError({
      message: `Failed after ${tryNumber} attempt(s) with non-retryable error: '${errorMessage}'`,
      reason: "errorNotRetryable",
      errors: newErrors
    });
  }
}
function throttleMaxConcurrency({
  maxConcurrentCalls
}) {
  const throttler = new MaxConcurrencyThrottler({ maxConcurrentCalls });
  return (fn) => throttler.run(fn);
}
function parseBaseUrl(baseUrl) {
  const url = new URL(baseUrl);
  return {
    protocol: url.protocol.slice(0, -1),
    host: url.hostname,
    port: url.port,
    path: url.pathname
  };
}
function resolveBaseUrl(baseUrl = {}, baseUrlDefaults) {
  if (typeof baseUrl == "string") {
    return baseUrl;
  } else {
    return {
      protocol: baseUrl.protocol ?? baseUrlDefaults.protocol,
      host: baseUrl.host ?? baseUrlDefaults.host,
      port: baseUrl.port ?? baseUrlDefaults.port,
      path: baseUrl.path ?? baseUrlDefaults.path
    };
  }
}
function getFunctionCallLogger(logging) {
  switch (logging) {
    case "basic-text":
      return [basicTextObserver];
    case "detailed-object":
      return [detailedObjectObserver];
    case "detailed-json":
      return [detailedJsonObserver];
    case "off":
    default:
      return [];
  }
}
function detectRuntime() {
  const globalThisAny = globalThis;
  if (globalThisAny.EdgeRuntime) {
    return "vercel-edge";
  }
  if (globalThis.navigator?.userAgent === "Cloudflare-Workers") {
    return "cloudflare-workers";
  }
  if (globalThis.process?.release?.name === "node") {
    return "node";
  }
  if (globalThis.window) {
    return "browser";
  }
  return null;
}
async function ensureLoaded() {
  if (detectRuntime() === "node" && !runStorage) {
    let AsyncLocalStorage;
    try {
      AsyncLocalStorage = (await import("async_hooks")).AsyncLocalStorage;
    } catch (error) {
      try {
        AsyncLocalStorage = __require("async_hooks").AsyncLocalStorage;
      } catch (error2) {
        throw new Error(`Failed to load 'async_hooks' module dynamically.`);
      }
    }
    runStorage = new AsyncLocalStorage();
  }
  return Promise.resolve();
}
async function getRun(run) {
  await ensureLoaded();
  return run ?? runStorage?.getStore();
}
async function withRun(run, callback) {
  await ensureLoaded();
  if (runStorage != null) {
    await runStorage.run(run, () => callback(run));
  } else {
    await callback(run);
  }
}
function startDurationMeasurement() {
  return globalThis.performance != null ? new PerformanceNowDurationMeasurement() : new DateDurationMeasurement();
}
async function executeFunctionCall({
  options,
  input,
  functionType: functionType2,
  execute,
  inputPropertyName = "input",
  outputPropertyName = "value"
}) {
  const run = await getRun(options?.run);
  const eventSource = new FunctionEventSource({
    observers: [
      ...getFunctionCallLogger(options?.logging ?? getLogFormat()),
      ...getFunctionObservers(),
      ...run?.functionObserver != null ? [run.functionObserver] : [],
      ...options?.observers ?? []
    ],
    errorHandler: run?.errorHandler
  });
  const durationMeasurement = startDurationMeasurement();
  const startMetadata = {
    functionType: functionType2,
    callId: `call-${nanoid()}`,
    parentCallId: options?.callId,
    runId: run?.runId,
    sessionId: run?.sessionId,
    userId: run?.userId,
    functionId: options?.functionId,
    [inputPropertyName]: input,
    timestamp: durationMeasurement.startDate,
    startTimestamp: durationMeasurement.startDate
  };
  eventSource.notify({
    eventType: "started",
    ...startMetadata
  });
  const result = await runSafe(
    () => execute({
      functionType: functionType2,
      functionId: options?.functionId,
      callId: startMetadata.callId,
      logging: options?.logging,
      observers: options?.observers,
      run
    })
  );
  const finishMetadata = {
    eventType: "finished",
    ...startMetadata,
    finishTimestamp: /* @__PURE__ */ new Date(),
    durationInMs: durationMeasurement.durationInMs
  };
  if (!result.ok) {
    if (result.isAborted) {
      eventSource.notify({
        ...finishMetadata,
        eventType: "finished",
        result: {
          status: "abort"
        }
      });
      throw new AbortError();
    }
    eventSource.notify({
      ...finishMetadata,
      eventType: "finished",
      result: {
        status: "error",
        error: result.error
      }
    });
    throw result.error;
  }
  eventSource.notify({
    ...finishMetadata,
    eventType: "finished",
    result: {
      status: "success",
      [outputPropertyName]: result.value
    }
  });
  return result.value;
}
async function executeFunction(fn, input, options) {
  return executeFunctionCall({
    options,
    input,
    functionType: "execute-function",
    execute: async (options2) => fn(input, options2)
  });
}
function uncheckedSchema(jsonSchema) {
  return new UncheckedSchema(jsonSchema);
}
function zodSchema(zodSchema2) {
  return new ZodSchema(zodSchema2);
}
function validateTypes({
  value,
  schema
}) {
  try {
    const validationResult = schema.validate(value);
    if (!validationResult.success) {
      throw new TypeValidationError({
        value,
        cause: validationResult.error
      });
    }
    return validationResult.value;
  } catch (error) {
    if (error instanceof TypeValidationError) {
      throw error;
    }
    throw new TypeValidationError({ value, cause: error });
  }
}
function safeValidateTypes({
  value,
  schema
}) {
  try {
    const validationResult = schema.validate(value);
    if (validationResult.success) {
      return validationResult;
    }
    return {
      success: false,
      error: new TypeValidationError({
        value,
        cause: validationResult.error
      })
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof TypeValidationError ? error : new TypeValidationError({ value, cause: error })
    };
  }
}
function parseJSON({
  text: text13,
  schema
}) {
  try {
    const value = import_secure_json_parse.default.parse(text13);
    if (schema == null) {
      return value;
    }
    return validateTypes({ value, schema });
  } catch (error) {
    if (error instanceof JSONParseError || error instanceof TypeValidationError) {
      throw error;
    }
    throw new JSONParseError({ text: text13, cause: error });
  }
}
function safeParseJSON({
  text: text13,
  schema
}) {
  try {
    const value = import_secure_json_parse.default.parse(text13);
    if (schema == null) {
      return {
        success: true,
        value
      };
    }
    return safeValidateTypes({ value, schema });
  } catch (error) {
    return {
      success: false,
      error: error instanceof JSONParseError ? error : new JSONParseError({ text: text13, cause: error })
    };
  }
}
function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error(
      `Vectors must have the same length (a: ${a.length}, b: ${b.length})`
    );
  }
  return dotProduct(a, b) / (magnitude(a) * magnitude(b));
}
function dotProduct(a, b) {
  return a.reduce(
    (acc, val, i) => acc + val * b[i],
    0
  );
}
function magnitude(a) {
  return Math.sqrt(dotProduct(a, a));
}
async function executeStandardCall({
  model,
  options,
  input,
  functionType: functionType2,
  generateResponse
}) {
  const run = await getRun(options?.run);
  const settings = model.settings;
  const eventSource = new FunctionEventSource({
    observers: [
      ...getFunctionCallLogger(options?.logging ?? getLogFormat()),
      ...getFunctionObservers(),
      ...settings.observers ?? [],
      ...run?.functionObserver != null ? [run.functionObserver] : [],
      ...options?.observers ?? []
    ],
    errorHandler: run?.errorHandler
  });
  const durationMeasurement = startDurationMeasurement();
  const startMetadata = {
    functionType: functionType2,
    callId: `call-${nanoid()}`,
    parentCallId: options?.callId,
    runId: run?.runId,
    sessionId: run?.sessionId,
    userId: run?.userId,
    functionId: options?.functionId,
    model: model.modelInformation,
    settings: model.settingsForEvent,
    input,
    timestamp: durationMeasurement.startDate,
    startTimestamp: durationMeasurement.startDate
  };
  eventSource.notify({
    eventType: "started",
    ...startMetadata
  });
  const result = await runSafe(
    () => generateResponse({
      functionType: functionType2,
      functionId: options?.functionId,
      callId: startMetadata.callId,
      logging: options?.logging,
      observers: options?.observers,
      cache: options?.cache,
      run
    })
  );
  const finishMetadata = {
    eventType: "finished",
    ...startMetadata,
    finishTimestamp: /* @__PURE__ */ new Date(),
    durationInMs: durationMeasurement.durationInMs
  };
  if (!result.ok) {
    if (result.isAborted) {
      eventSource.notify({
        ...finishMetadata,
        eventType: "finished",
        result: {
          status: "abort"
        }
      });
      throw new AbortError();
    }
    eventSource.notify({
      ...finishMetadata,
      eventType: "finished",
      result: {
        status: "error",
        error: result.error
      }
    });
    throw result.error;
  }
  const rawResponse = result.value.rawResponse;
  const value = result.value.extractedValue;
  const usage = result.value.usage;
  eventSource.notify({
    ...finishMetadata,
    eventType: "finished",
    result: {
      status: "success",
      usage,
      rawResponse,
      value
    }
  });
  return {
    value,
    rawResponse,
    metadata: {
      model: model.modelInformation,
      callId: finishMetadata.callId,
      runId: finishMetadata.runId,
      sessionId: finishMetadata.sessionId,
      userId: finishMetadata.userId,
      functionId: finishMetadata.functionId,
      startTimestamp: startMetadata.startTimestamp,
      finishTimestamp: finishMetadata.finishTimestamp,
      durationInMs: finishMetadata.durationInMs,
      usage
    }
  };
}
async function embedMany({
  model,
  values,
  fullResponse,
  ...options
}) {
  const callResponse = await executeStandardCall({
    functionType: "embed",
    input: values,
    model,
    options,
    generateResponse: async (options2) => {
      const maxValuesPerCall = model.maxValuesPerCall;
      const valueGroups = [];
      if (maxValuesPerCall == null) {
        valueGroups.push(values);
      } else {
        for (let i = 0; i < values.length; i += maxValuesPerCall) {
          valueGroups.push(values.slice(i, i + maxValuesPerCall));
        }
      }
      let responses;
      if (model.isParallelizable) {
        responses = await Promise.all(
          valueGroups.map(
            (valueGroup) => model.doEmbedValues(valueGroup, options2)
          )
        );
      } else {
        responses = [];
        for (const valueGroup of valueGroups) {
          const response = await model.doEmbedValues(valueGroup, options2);
          responses.push(response);
        }
      }
      const rawResponses = responses.map((response) => response.rawResponse);
      const embeddings = [];
      for (const response of responses) {
        embeddings.push(...response.embeddings);
      }
      return {
        rawResponse: rawResponses,
        extractedValue: embeddings
      };
    }
  });
  return fullResponse ? {
    embeddings: callResponse.value,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : callResponse.value;
}
async function embed({
  model,
  value,
  fullResponse,
  ...options
}) {
  const callResponse = await executeStandardCall({
    functionType: "embed",
    input: value,
    model,
    options,
    generateResponse: async (options2) => {
      const result = await model.doEmbedValues([value], options2);
      return {
        rawResponse: result.rawResponse,
        extractedValue: result.embeddings[0]
      };
    }
  });
  return fullResponse ? {
    embedding: callResponse.value,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : callResponse.value;
}
async function classify({
  model,
  value,
  fullResponse,
  ...options
}) {
  const callResponse = await executeStandardCall({
    functionType: "classify",
    input: value,
    model,
    options,
    generateResponse: async (options2) => {
      const result = await model.doClassify(value, options2);
      return {
        rawResponse: result.rawResponse,
        extractedValue: result.class
      };
    }
  });
  return fullResponse ? {
    class: callResponse.value,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : callResponse.value;
}
function base64ToUint8Array(base64String) {
  return Uint8Array.from(
    globalThis.atob(base64UrlToBase64(base64String)),
    (x) => x.codePointAt(0)
  );
}
function uint8ArrayToBase64(array) {
  let base642;
  if (array.length < MAX_BLOCK_SIZE) {
    base642 = globalThis.btoa(String.fromCodePoint(...array));
  } else {
    base642 = "";
    for (const value of array) {
      base642 += String.fromCodePoint(value);
    }
    base642 = globalThis.btoa(base642);
  }
  return base642;
}
function base64UrlToBase64(base64url) {
  return base64url.replaceAll("-", "+").replaceAll("_", "/");
}
async function generateImage({
  model,
  prompt,
  fullResponse,
  ...options
}) {
  const callResponse = await executeStandardCall({
    functionType: "generate-image",
    input: prompt,
    model,
    options,
    generateResponse: async (options2) => {
      const result = await model.doGenerateImages(prompt, options2);
      return {
        rawResponse: result.rawResponse,
        extractedValue: result.base64Images
      };
    }
  });
  const imagesBase64 = callResponse.value;
  const images = imagesBase64.map(base64ToUint8Array);
  return fullResponse ? {
    image: images[0],
    imageBase64: imagesBase64[0],
    images,
    imagesBase64,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : images[0];
}
async function generateSpeech({
  model,
  text: text13,
  fullResponse,
  ...options
}) {
  const callResponse = await executeStandardCall({
    functionType: "generate-speech",
    input: text13,
    model,
    options,
    generateResponse: async (options2) => {
      const response = await model.doGenerateSpeechStandard(text13, options2);
      return {
        rawResponse: response,
        extractedValue: response
      };
    }
  });
  return fullResponse ? {
    speech: callResponse.value,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : callResponse.value;
}
async function executeStreamCall({
  model,
  options,
  input,
  functionType: functionType2,
  startStream,
  processDelta,
  processFinished,
  onDone
}) {
  const run = await getRun(options?.run);
  const settings = model.settings;
  const eventSource = new FunctionEventSource({
    observers: [
      ...getFunctionCallLogger(options?.logging ?? getLogFormat()),
      ...getFunctionObservers(),
      ...settings.observers ?? [],
      ...run?.functionObserver != null ? [run.functionObserver] : [],
      ...options?.observers ?? []
    ],
    errorHandler: run?.errorHandler
  });
  const durationMeasurement = startDurationMeasurement();
  const startMetadata = {
    functionType: functionType2,
    callId: `call-${nanoid()}`,
    parentCallId: options?.callId,
    runId: run?.runId,
    sessionId: run?.sessionId,
    userId: run?.userId,
    functionId: options?.functionId,
    model: model.modelInformation,
    settings: model.settingsForEvent,
    input,
    timestamp: durationMeasurement.startDate,
    startTimestamp: durationMeasurement.startDate
  };
  eventSource.notify({
    eventType: "started",
    ...startMetadata
  });
  const result = await runSafe(async () => {
    const deltaIterable = await startStream({
      functionType: functionType2,
      functionId: options?.functionId,
      callId: startMetadata.callId,
      logging: options?.logging,
      observers: options?.observers,
      run
    });
    const responseQueue = new AsyncQueue();
    (async function() {
      try {
        const loopResult = await runSafe(async () => {
          for await (const event of deltaIterable) {
            if (event?.type === "error") {
              const error = event.error;
              const finishMetadata2 = {
                eventType: "finished",
                ...startMetadata,
                finishTimestamp: /* @__PURE__ */ new Date(),
                durationInMs: durationMeasurement.durationInMs
              };
              eventSource.notify(
                error instanceof AbortError ? {
                  ...finishMetadata2,
                  result: { status: "abort" }
                } : {
                  ...finishMetadata2,
                  result: { status: "error", error }
                }
              );
              throw error;
            }
            if (event?.type === "delta") {
              const value = processDelta(event);
              if (value !== void 0) {
                responseQueue.push(value);
              }
            }
          }
          if (processFinished != null) {
            const value = processFinished();
            if (value !== void 0) {
              responseQueue.push(value);
            }
          }
        });
        if (!loopResult.ok) {
          const finishMetadata2 = {
            eventType: "finished",
            ...startMetadata,
            finishTimestamp: /* @__PURE__ */ new Date(),
            durationInMs: durationMeasurement.durationInMs
          };
          if (loopResult.isAborted) {
            eventSource.notify({
              ...finishMetadata2,
              eventType: "finished",
              result: {
                status: "abort"
              }
            });
            responseQueue.error(new AbortError());
            return;
          }
          eventSource.notify({
            ...finishMetadata2,
            eventType: "finished",
            result: {
              status: "error",
              error: loopResult.error
            }
          });
          responseQueue.error(loopResult.error);
          return;
        }
        onDone?.();
        const finishMetadata = {
          eventType: "finished",
          ...startMetadata,
          finishTimestamp: /* @__PURE__ */ new Date(),
          durationInMs: durationMeasurement.durationInMs
        };
        eventSource.notify({
          ...finishMetadata,
          result: {
            status: "success"
          }
        });
      } finally {
        responseQueue.close();
      }
    })();
    return {
      stream: responseQueue
    };
  });
  if (!result.ok) {
    const finishMetadata = {
      eventType: "finished",
      ...startMetadata,
      finishTimestamp: /* @__PURE__ */ new Date(),
      durationInMs: durationMeasurement.durationInMs
    };
    if (result.isAborted) {
      eventSource.notify({
        ...finishMetadata,
        eventType: "finished",
        result: {
          status: "abort"
        }
      });
      throw new AbortError();
    }
    eventSource.notify({
      ...finishMetadata,
      eventType: "finished",
      result: {
        status: "error",
        error: result.error
      }
    });
    throw result.error;
  }
  return {
    value: result.value.stream,
    metadata: startMetadata
  };
}
async function streamSpeech({
  model,
  text: text13,
  fullResponse,
  ...options
}) {
  let textStream;
  if (typeof text13 === "string") {
    const queue = new AsyncQueue();
    queue.push(text13);
    queue.close();
    textStream = queue;
  } else {
    textStream = text13;
  }
  const callResponse = await executeStreamCall({
    functionType: "stream-speech",
    input: text13,
    model,
    options,
    startStream: async (options2) => model.doGenerateSpeechStreamDuplex(textStream, options2),
    processDelta: (delta) => delta.deltaValue
  });
  return fullResponse ? {
    speechStream: callResponse.value,
    metadata: callResponse.metadata
  } : callResponse.value;
}
async function generateText({
  model,
  prompt,
  fullResponse,
  ...options
}) {
  const expandedPrompt = await expandPrompt(prompt);
  const callResponse = await executeStandardCall({
    functionType: "generate-text",
    input: expandedPrompt,
    model,
    options,
    generateResponse: async (options2) => {
      async function getGeneratedTexts() {
        if (options2?.cache == null) {
          return {
            ...await model.doGenerateTexts(expandedPrompt.prompt, options2),
            cache: void 0
          };
        }
        let cacheErrors = void 0;
        const cacheKey = {
          functionType: "generate-text",
          functionId: options2?.functionId,
          input: {
            model,
            settings: model.settingsForEvent,
            prompt: expandedPrompt.prompt
          }
        };
        try {
          const cachedRawResponse = await options2.cache.lookupValue(cacheKey);
          if (cachedRawResponse != null) {
            return {
              ...model.restoreGeneratedTexts(cachedRawResponse),
              cache: { status: "hit" }
            };
          }
        } catch (err) {
          cacheErrors = [err];
        }
        const result2 = await model.doGenerateTexts(
          expandedPrompt.prompt,
          options2
        );
        try {
          await options2.cache.storeValue(cacheKey, result2.rawResponse);
        } catch (err) {
          cacheErrors = [...cacheErrors ?? [], err];
        }
        return {
          ...result2,
          cache: { status: "miss", errors: cacheErrors }
        };
      }
      const result = await getGeneratedTexts();
      const shouldTrimWhitespace = model.settings.trimWhitespace ?? true;
      const textGenerationResults2 = shouldTrimWhitespace ? result.textGenerationResults.map((textGeneration) => ({
        text: textGeneration.text.trim(),
        finishReason: textGeneration.finishReason
      })) : result.textGenerationResults;
      return {
        rawResponse: result.rawResponse,
        extractedValue: textGenerationResults2,
        usage: result.usage
      };
    }
  });
  const textGenerationResults = callResponse.value;
  const firstResult = textGenerationResults[0];
  return fullResponse ? {
    text: firstResult.text,
    finishReason: firstResult.finishReason,
    texts: textGenerationResults.map(
      (textGeneration) => textGeneration.text
    ),
    textGenerationResults,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : firstResult.text;
}
async function streamText({
  model,
  prompt,
  fullResponse,
  ...options
}) {
  const shouldTrimWhitespace = model.settings.trimWhitespace ?? true;
  let accumulatedText = "";
  let isFirstDelta = true;
  let trailingWhitespace = "";
  let resolveText;
  const textPromise = new Promise((resolve) => {
    resolveText = resolve;
  });
  const expandedPrompt = await expandPrompt(prompt);
  const callResponse = await executeStreamCall({
    functionType: "stream-text",
    input: expandedPrompt,
    model,
    options,
    startStream: async (options2) => model.doStreamText(expandedPrompt.prompt, options2),
    processDelta: (delta) => {
      let textDelta = model.extractTextDelta(delta.deltaValue);
      if (textDelta == null || textDelta.length === 0) {
        return void 0;
      }
      if (shouldTrimWhitespace) {
        textDelta = isFirstDelta ? textDelta.trimStart() : trailingWhitespace + textDelta;
        const trailingWhitespaceMatch = textDelta.match(/\s+$/);
        trailingWhitespace = trailingWhitespaceMatch ? trailingWhitespaceMatch[0] : "";
        textDelta = textDelta.trimEnd();
      }
      isFirstDelta = false;
      accumulatedText += textDelta;
      return textDelta;
    },
    onDone: () => {
      resolveText(accumulatedText);
    }
  });
  return fullResponse ? {
    textStream: callResponse.value,
    textPromise,
    metadata: callResponse.metadata
  } : callResponse.value;
}
function fixJson(input) {
  const stack = ["ROOT"];
  let lastValidIndex = -1;
  let literalStart = null;
  function processValueStart(char, i, swapState) {
    {
      switch (char) {
        case '"': {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_STRING");
          break;
        }
        case "f":
        case "t":
        case "n": {
          lastValidIndex = i;
          literalStart = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_LITERAL");
          break;
        }
        case "-": {
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_NUMBER");
          break;
        }
        case "{": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_OBJECT_START");
          break;
        }
        case "[": {
          lastValidIndex = i;
          stack.pop();
          stack.push(swapState);
          stack.push("INSIDE_ARRAY_START");
          break;
        }
      }
    }
  }
  function processAfterObjectValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  function processAfterArrayValue(char, i) {
    switch (char) {
      case ",": {
        stack.pop();
        stack.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        lastValidIndex = i;
        stack.pop();
        break;
      }
    }
  }
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const currentState = stack[stack.length - 1];
    switch (currentState) {
      case "ROOT":
        processValueStart(char, i, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (char) {
          case '"': {
            stack.pop();
            stack.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (char) {
          case ":": {
            stack.pop();
            stack.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        processAfterObjectValue(char, i);
        break;
      }
      case "INSIDE_STRING": {
        switch (char) {
          case '"': {
            stack.pop();
            lastValidIndex = i;
            break;
          }
          case "\\": {
            stack.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default: {
            lastValidIndex = i;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (char) {
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (char) {
          case ",": {
            stack.pop();
            stack.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            lastValidIndex = i;
            stack.pop();
            break;
          }
          default: {
            lastValidIndex = i;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        stack.pop();
        lastValidIndex = i;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (char) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            lastValidIndex = i;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".": {
            break;
          }
          case ",": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "}": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            }
            break;
          }
          case "]": {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
            break;
          }
          default: {
            stack.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, i + 1);
        if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
          stack.pop();
          if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
            processAfterObjectValue(char, i);
          } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
            processAfterArrayValue(char, i);
          }
        } else {
          lastValidIndex = i;
        }
        break;
      }
    }
  }
  let result = input.slice(0, lastValidIndex + 1);
  for (let i = stack.length - 1; i >= 0; i--) {
    const state = stack[i];
    switch (state) {
      case "INSIDE_STRING": {
        result += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        result += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        result += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const partialLiteral = input.substring(literalStart, input.length);
        if ("true".startsWith(partialLiteral)) {
          result += "true".slice(partialLiteral.length);
        } else if ("false".startsWith(partialLiteral)) {
          result += "false".slice(partialLiteral.length);
        } else if ("null".startsWith(partialLiteral)) {
          result += "null".slice(partialLiteral.length);
        }
      }
    }
  }
  return result;
}
function parsePartialJson(jsonText) {
  if (jsonText == null) {
    return void 0;
  }
  try {
    return import_secure_json_parse2.default.parse(jsonText);
  } catch (ignored) {
    try {
      const fixedJsonText = fixJson(jsonText);
      return import_secure_json_parse2.default.parse(fixedJsonText);
    } catch (ignored2) {
    }
  }
  return void 0;
}
async function* ObjectStreamFromResponse({
  response
}) {
  let text13 = "";
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done)
      break;
    text13 += new TextDecoder().decode(value);
    const partialObject = parsePartialJson(text13);
    yield { partialObject };
  }
}
function ObjectStreamToTextStream(stream) {
  const textEncoder2 = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const { textDelta } of stream) {
          controller.enqueue(textEncoder2.encode(textDelta));
        }
      } finally {
        controller.close();
      }
    }
  });
}
async function generateObject({
  model,
  schema,
  prompt,
  fullResponse,
  ...options
}) {
  const resolvedPrompt = typeof prompt === "function" && !isPromptFunction(prompt) ? prompt(schema) : prompt;
  const expandedPrompt = await expandPrompt(resolvedPrompt);
  const callResponse = await executeStandardCall({
    functionType: "generate-object",
    input: {
      schema,
      ...expandedPrompt
    },
    model,
    options,
    generateResponse: async (options2) => {
      const result = await model.doGenerateObject(
        schema,
        expandedPrompt.prompt,
        options2
      );
      const parseResult = schema.validate(result.value);
      if (!parseResult.success) {
        throw new ObjectValidationError({
          valueText: result.valueText,
          value: result.value,
          cause: parseResult.error
        });
      }
      const value = parseResult.value;
      return {
        rawResponse: result.rawResponse,
        extractedValue: value,
        usage: result.usage
      };
    }
  });
  return fullResponse ? {
    value: callResponse.value,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : callResponse.value;
}
function createSystemPrompt({
  originalSystemPrompt,
  schema,
  schemaPrefix = DEFAULT_SCHEMA_PREFIX,
  schemaSuffix = DEFAULT_SCHEMA_SUFFIX
}) {
  return [
    originalSystemPrompt,
    originalSystemPrompt != null ? "" : null,
    schemaPrefix,
    JSON.stringify(schema.getJsonSchema()),
    schemaSuffix
  ].filter(Boolean).join("\n");
}
function extractObject(response) {
  return parseJSON({ text: response });
}
function isDeepEqualData(obj1, obj2) {
  if (obj1 === obj2)
    return true;
  if (obj1 == null || obj2 == null)
    return false;
  if (typeof obj1 !== "object" && typeof obj2 !== "object")
    return obj1 === obj2;
  if (obj1.constructor !== obj2.constructor)
    return false;
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length)
      return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!isDeepEqualData(obj1[i], obj2[i]))
        return false;
    }
    return true;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length)
    return false;
  for (const key of keys1) {
    if (!keys2.includes(key))
      return false;
    if (!isDeepEqualData(obj1[key], obj2[key]))
      return false;
  }
  return true;
}
async function streamObject({
  model,
  schema,
  prompt,
  fullResponse,
  ...options
}) {
  const resolvedPrompt = typeof prompt === "function" && !isPromptFunction(prompt) ? prompt(schema) : prompt;
  const expandedPrompt = await expandPrompt(resolvedPrompt);
  let accumulatedText = "";
  let accumulatedTextDelta = "";
  let latestObject;
  let resolveObject;
  let rejectObject;
  const objectPromise = new Promise((resolve, reject) => {
    resolveObject = resolve;
    rejectObject = reject;
  });
  const callResponse = await executeStreamCall({
    functionType: "stream-object",
    input: {
      schema,
      ...expandedPrompt
    },
    model,
    options,
    startStream: async (options2) => model.doStreamObject(schema, expandedPrompt.prompt, options2),
    processDelta(delta) {
      const textDelta = model.extractObjectTextDelta(delta.deltaValue);
      if (textDelta == null) {
        return void 0;
      }
      accumulatedText += textDelta;
      accumulatedTextDelta += textDelta;
      const currentObject = model.parseAccumulatedObjectText(accumulatedText);
      if (!isDeepEqualData(latestObject, currentObject)) {
        latestObject = currentObject;
        const currentAccumulatedTextDelta = accumulatedTextDelta;
        accumulatedTextDelta = "";
        return {
          partialObject: latestObject,
          partialText: accumulatedText,
          textDelta: currentAccumulatedTextDelta
        };
      }
      return void 0;
    },
    processFinished() {
      return {
        partialObject: latestObject,
        partialText: accumulatedText,
        textDelta: accumulatedTextDelta
      };
    },
    onDone() {
      const parseResult = schema.validate(latestObject);
      if (parseResult.success) {
        resolveObject(parseResult.value);
      } else {
        rejectObject(parseResult.error);
      }
    }
  });
  return fullResponse ? {
    objectStream: callResponse.value,
    objectPromise,
    metadata: callResponse.metadata
  } : callResponse.value;
}
function validateContentIsString(content, prompt) {
  if (typeof content !== "string") {
    throw new InvalidPromptError(
      "Only text prompts are are supported by this prompt template.",
      prompt
    );
  }
  return content;
}
function text() {
  return {
    stopSequences: [],
    format(prompt) {
      let text13 = DEFAULT_SYSTEM_PROMPT_NO_INPUT;
      text13 += "\n\n### Instruction:\n";
      text13 += prompt;
      text13 += "\n\n### Response:\n";
      return text13;
    }
  };
}
function instruction() {
  return {
    stopSequences: [],
    format(prompt) {
      let text13 = prompt.system ?? (prompt.input != null ? DEFAULT_SYSTEM_PROMPT_INPUT : DEFAULT_SYSTEM_PROMPT_NO_INPUT);
      text13 += "\n\n### Instruction:\n";
      if (prompt.system != null) {
        text13 += `${prompt.system}
`;
      }
      text13 += validateContentIsString(prompt.instruction, prompt);
      if (prompt.input != null) {
        text13 += `

### Input:
${prompt.input}`;
      }
      text13 += "\n\n### Response:\n";
      if (prompt.responsePrefix != null) {
        text13 += `${prompt.responsePrefix}
`;
      }
      return text13;
    }
  };
}
function chat() {
  throw new Error("Chat prompts are not supported by the Alpaca format.");
}
function segmentStart(role) {
  return `${START_SEGMENT}${role}
`;
}
function segment(role, text13) {
  return text13 == null ? "" : `${segmentStart(role)}${text13}${END_SEGMENT}
`;
}
function text2() {
  return {
    stopSequences: [END_SEGMENT],
    format(prompt) {
      return segment("user", prompt) + segmentStart("assistant");
    }
  };
}
function instruction2() {
  return {
    stopSequences: [END_SEGMENT],
    format(prompt) {
      const instruction13 = validateContentIsString(prompt.instruction, prompt);
      return segment("system", prompt.system) + segment("user", instruction13) + segmentStart("assistant") + (prompt.responsePrefix ?? "");
    }
  };
}
function chat2() {
  return {
    format(prompt) {
      let text13 = prompt.system != null ? segment("system", prompt.system) : "";
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            text13 += segment("user", validateContentIsString(content, prompt));
            break;
          }
          case "assistant": {
            text13 += segment(
              "assistant",
              validateContentIsString(content, prompt)
            );
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      text13 += segmentStart("assistant");
      return text13;
    },
    stopSequences: [END_SEGMENT]
  };
}
function createToolContent({
  toolResults
}) {
  const toolContent = [];
  for (const { result, toolCall } of toolResults ?? []) {
    toolContent.push({
      type: "tool-response",
      id: toolCall.id,
      response: result
    });
  }
  return toolContent;
}
function createAssistantContent({
  text: text13,
  toolResults
}) {
  const content = [];
  if (text13 != null) {
    content.push({ type: "text", text: text13 });
  }
  for (const { toolCall } of toolResults ?? []) {
    content.push({ type: "tool-call", ...toolCall });
  }
  return content;
}
function createChatPrompt(promptFunction) {
  return (input) => markAsPromptFunction(async () => ({
    input,
    prompt: await promptFunction(input)
  }));
}
function createInstructionPrompt(promptFunction) {
  return (input) => markAsPromptFunction(async () => ({
    input,
    prompt: await promptFunction(input)
  }));
}
function text3() {
  return {
    stopSequences: [END_SEGMENT2],
    format(prompt) {
      return `${BEGIN_SEGMENT}${BEGIN_INSTRUCTION}${prompt}${END_INSTRUCTION}`;
    }
  };
}
function instruction3() {
  return {
    stopSequences: [END_SEGMENT2],
    format(prompt) {
      const instruction13 = validateContentIsString(prompt.instruction, prompt);
      return `${BEGIN_SEGMENT}${BEGIN_INSTRUCTION}${prompt.system != null ? `${BEGIN_SYSTEM}${prompt.system}${END_SYSTEM}` : ""}${instruction13}${END_INSTRUCTION}${prompt.responsePrefix ?? ""}`;
    }
  };
}
function chat3() {
  return {
    format(prompt) {
      validateLlama2Prompt(prompt);
      const content = prompt.messages[0].content;
      let text13 = `${BEGIN_SEGMENT}${BEGIN_INSTRUCTION}${prompt.system != null ? `${BEGIN_SYSTEM}${prompt.system}${END_SYSTEM}` : ""}${content}${END_INSTRUCTION}`;
      for (let i = 1; i < prompt.messages.length; i++) {
        const { role, content: content2 } = prompt.messages[i];
        switch (role) {
          case "user": {
            const textContent = validateContentIsString(content2, prompt);
            text13 += `${BEGIN_SEGMENT}${BEGIN_INSTRUCTION}${textContent}${END_INSTRUCTION}`;
            break;
          }
          case "assistant": {
            text13 += `${validateContentIsString(content2, prompt)}${END_SEGMENT2}`;
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      return text13;
    },
    stopSequences: [END_SEGMENT2]
  };
}
function validateLlama2Prompt(chatPrompt) {
  const messages = chatPrompt.messages;
  if (messages.length < 1) {
    throw new InvalidPromptError(
      "ChatPrompt should have at least one message.",
      chatPrompt
    );
  }
  for (let i = 0; i < messages.length; i++) {
    const expectedRole = i % 2 === 0 ? "user" : "assistant";
    const role = messages[i].role;
    if (role !== expectedRole) {
      throw new InvalidPromptError(
        `Message at index ${i} should have role '${expectedRole}', but has role '${role}'.`,
        chatPrompt
      );
    }
  }
  if (messages.length % 2 === 0) {
    throw new InvalidPromptError(
      "The last message must be a user message.",
      chatPrompt
    );
  }
}
function text4() {
  return {
    stopSequences: [END_SEGMENT3],
    format(prompt) {
      return `${BEGIN_SEGMENT2}${BEGIN_INSTRUCTION2}${prompt}${END_INSTRUCTION2}`;
    }
  };
}
function instruction4() {
  return {
    stopSequences: [END_SEGMENT3],
    format(prompt) {
      const instruction13 = validateContentIsString(prompt.instruction, prompt);
      if (prompt.system != null) {
        return `${BEGIN_SEGMENT2}${BEGIN_INSTRUCTION2}${prompt.system}${END_INSTRUCTION2}${END_SEGMENT3}${BEGIN_INSTRUCTION2}${instruction13}${END_INSTRUCTION2}${prompt.responsePrefix ?? ""}`;
      }
      return `${BEGIN_SEGMENT2}${BEGIN_INSTRUCTION2}${instruction13}${END_INSTRUCTION2}${prompt.responsePrefix ?? ""}`;
    }
  };
}
function chat4() {
  return {
    format(prompt) {
      validateMistralPrompt(prompt);
      let text13 = "";
      let i = 0;
      if (prompt.system != null) {
        text13 += `${BEGIN_SEGMENT2}${BEGIN_INSTRUCTION2}${prompt.system}${END_INSTRUCTION2}${END_SEGMENT3}`;
      } else {
        text13 = `${BEGIN_SEGMENT2}${BEGIN_INSTRUCTION2}${prompt.messages[0].content}${END_INSTRUCTION2}`;
        if (prompt.messages.length > 1) {
          text13 += `${prompt.messages[1].content}${END_SEGMENT3}`;
        }
        i = 2;
      }
      for (; i < prompt.messages.length; i++) {
        const { role, content } = prompt.messages[i];
        switch (role) {
          case "user": {
            const textContent = validateContentIsString(content, prompt);
            text13 += `${BEGIN_INSTRUCTION2}${textContent}${END_INSTRUCTION2}`;
            break;
          }
          case "assistant": {
            text13 += validateContentIsString(content, prompt);
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      return text13;
    },
    stopSequences: [END_SEGMENT3]
  };
}
function validateMistralPrompt(chatPrompt) {
  const messages = chatPrompt.messages;
  if (messages.length < 1) {
    throw new InvalidPromptError(
      "ChatPrompt should have at least one message.",
      chatPrompt
    );
  }
  for (let i = 0; i < messages.length; i++) {
    const expectedRole = i % 2 === 0 ? "user" : "assistant";
    const role = messages[i].role;
    if (role !== expectedRole) {
      throw new InvalidPromptError(
        `Message at index ${i} should have role '${expectedRole}', but has role '${role}'.`,
        chatPrompt
      );
    }
  }
  if (messages.length % 2 === 0) {
    throw new InvalidPromptError(
      "The last message must be a user message.",
      chatPrompt
    );
  }
}
function segmentStart2(role) {
  return `### ${roleNames[role]}:
`;
}
function segment2(role, text13) {
  return text13 == null ? "" : `${segmentStart2(role)}${text13}
`;
}
function text5() {
  return {
    stopSequences: [],
    format(prompt) {
      return segment2("user", prompt) + segmentStart2("assistant");
    }
  };
}
function chat5() {
  return {
    format(prompt) {
      let text13 = prompt.system != null ? segment2("system", prompt.system) : "";
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            const textContent = validateContentIsString(content, prompt);
            text13 += segment2("user", textContent);
            break;
          }
          case "assistant": {
            text13 += segment2(
              "assistant",
              validateContentIsString(content, prompt)
            );
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      text13 += segmentStart2("assistant");
      return text13;
    },
    stopSequences: [`
${roleNames.user}:`]
  };
}
function createTextPrompt(promptFunction) {
  return (input) => markAsPromptFunction(async () => ({
    input,
    prompt: await promptFunction(input)
  }));
}
function text8() {
  return {
    stopSequences: [],
    format(prompt) {
      let text13 = DEFAULT_SYSTEM_MESSAGE;
      text13 += "\n\nUSER: ";
      text13 += prompt;
      text13 += "\n\nASSISTANT: ";
      return text13;
    }
  };
}
function chat8() {
  return {
    format(prompt) {
      let text13 = prompt.system != null ? `${prompt.system}

` : `${DEFAULT_SYSTEM_MESSAGE}

`;
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            const textContent = validateContentIsString(content, prompt);
            text13 += `USER: ${textContent}
`;
            break;
          }
          case "assistant": {
            text13 += `ASSISTANT: ${validateContentIsString(content, prompt)}
`;
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      text13 += `ASSISTANT: `;
      return text13;
    },
    stopSequences: [`
USER:`]
  };
}
async function trimChatPrompt({
  prompt,
  model,
  tokenLimit = model.contextWindowSize - (model.settings.maxGenerationTokens ?? model.contextWindowSize / 4)
}) {
  let minimalPrompt = {
    system: prompt.system,
    messages: [prompt.messages[prompt.messages.length - 1]]
  };
  const promptTokenCount = await model.countPromptTokens(minimalPrompt);
  if (promptTokenCount > tokenLimit) {
    return minimalPrompt;
  }
  const innerMessages = prompt.messages.slice(0, -1);
  for (let i = innerMessages.length - 1; i >= 0; i -= 2) {
    const assistantMessage = innerMessages[i];
    const userMessage = innerMessages[i - 1];
    const attemptedPrompt = {
      system: prompt.system,
      messages: [userMessage, assistantMessage, ...minimalPrompt.messages]
    };
    const tokenCount = await model.countPromptTokens(attemptedPrompt);
    if (tokenCount > tokenLimit) {
      break;
    }
    minimalPrompt = attemptedPrompt;
  }
  return minimalPrompt;
}
async function generateTranscription({
  model,
  audioData,
  mimeType,
  fullResponse,
  ...options
}) {
  const input = { mimeType, audioData };
  const callResponse = await executeStandardCall({
    functionType: "generate-transcription",
    input,
    model,
    options,
    generateResponse: async (options2) => {
      const result = await model.doTranscribe(input, options2);
      return {
        rawResponse: result.rawResponse,
        extractedValue: result.transcription
      };
    }
  });
  return fullResponse ? callResponse : callResponse.value;
}
async function countTokens(tokenizer, text13) {
  return (await tokenizer.tokenize(text13)).length;
}
function convertDataContentToBase64String(content) {
  if (typeof content === "string") {
    return content;
  }
  if (content instanceof ArrayBuffer) {
    return uint8ArrayToBase64(new Uint8Array(content));
  }
  return uint8ArrayToBase64(content);
}
function convertDataContentToUint8Array(content) {
  if (content instanceof Uint8Array) {
    return content;
  }
  if (typeof content === "string") {
    return base64ToUint8Array(content);
  }
  if (content instanceof ArrayBuffer) {
    return new Uint8Array(content);
  }
  throw new Error(
    `Invalid data content. Expected a string, Uint8Array, ArrayBuffer, or Buffer, but got ${typeof content}.`
  );
}
function mapBasicPromptToAutomatic1111Format() {
  return {
    format: (description) => ({ prompt: description })
  };
}
function Api(settings) {
  return new Automatic1111ApiConfiguration(settings);
}
function ImageGenerator(settings) {
  return new Automatic1111ImageGenerationModel(settings);
}
function loadApiKey({
  apiKey,
  environmentVariableName,
  apiKeyParameterName = "apiKey",
  description
}) {
  if (apiKey != null) {
    return apiKey;
  }
  if (typeof process === "undefined") {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter into the API configuration. Environment variables is not supported in this environment.`
    });
  }
  apiKey = process.env[environmentVariableName];
  if (apiKey == null) {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter into the API configuration or set it as an environment variable named ${environmentVariableName}.`
    });
  }
  return apiKey;
}
function parseJsonStream({
  schema,
  stream,
  process: process2,
  onDone
}) {
  function processLine(line) {
    process2(parseJSON({ text: line, schema }));
  }
  return (async () => {
    try {
      const reader = new ReadableStreamDefaultReader(stream);
      const utf8Decoder = new TextDecoder("utf-8");
      let unprocessedText = "";
      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) {
          break;
        }
        unprocessedText += utf8Decoder.decode(chunk, { stream: true });
        const processableLines = unprocessedText.split("\n");
        unprocessedText = processableLines.pop() ?? "";
        processableLines.forEach(processLine);
      }
      if (unprocessedText) {
        processLine(unprocessedText);
      }
    } finally {
      onDone?.();
    }
  })();
}
async function parseJsonStreamAsAsyncIterable({
  stream,
  schema
}) {
  const queue = new AsyncQueue();
  parseJsonStream({
    stream,
    schema,
    process(event) {
      queue.push({ type: "delta", deltaValue: event });
    },
    onDone() {
      queue.close();
    }
  });
  return queue;
}
function Api2(settings) {
  return new CohereApiConfiguration(settings);
}
function TextGenerator(settings) {
  return new CohereTextGenerationModel(settings);
}
function TextEmbedder(settings) {
  return new CohereTextEmbeddingModel(settings);
}
function Tokenizer(settings) {
  return new CohereTokenizer(settings);
}
async function createSimpleWebSocket(url) {
  switch (detectRuntime()) {
    case "vercel-edge":
    case "cloudflare-workers":
    case "browser": {
      return new WebSocket(url);
    }
    case "node": {
      let WebSocket22;
      try {
        WebSocket22 = (await Promise.resolve().then(() => (init_wrapper(), wrapper_exports))).default;
      } catch (error) {
        try {
          WebSocket22 = __require("ws");
        } catch (error2) {
          throw new Error(`Failed to load 'ws' module dynamically.`);
        }
      }
      return new WebSocket22(url);
    }
    default: {
      throw new Error("Unknown runtime");
    }
  }
}
function assembleQuery(parameters) {
  let query = "";
  let hasQuestionMark = false;
  for (const [key, value] of Object.entries(parameters)) {
    if (value == null) {
      continue;
    }
    if (!hasQuestionMark) {
      query += "?";
      hasQuestionMark = true;
    } else {
      query += "&";
    }
    query += `${key}=${value}`;
  }
  return query;
}
function toApiVoiceSettings(voiceSettings) {
  return voiceSettings != null ? {
    stability: voiceSettings.stability,
    similarity_boost: voiceSettings.similarityBoost,
    style: voiceSettings.style,
    use_speaker_boost: voiceSettings.useSpeakerBoost
  } : void 0;
}
function toGenerationConfig(generationConfig) {
  return generationConfig != null ? { chunk_length_schedule: generationConfig.chunkLengthSchedule } : void 0;
}
function Api3(settings) {
  return new ElevenLabsApiConfiguration(settings);
}
function SpeechGenerator(settings) {
  return new ElevenLabsSpeechModel(settings);
}
function Api4(settings) {
  return new HuggingFaceApiConfiguration(settings);
}
function TextGenerator2(settings) {
  return new HuggingFaceTextGenerationModel(settings);
}
function TextEmbedder2(settings) {
  return new HuggingFaceTextEmbeddingModel(settings);
}
async function* convertReadableStreamToAsyncIterable(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
async function parseEventSourceStream({
  stream
}) {
  const eventStream = stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream());
  return convertReadableStreamToAsyncIterable(eventStream);
}
function text9() {
  const delegate = text7();
  return {
    stopSequences: [],
    format(prompt) {
      return { text: delegate.format(prompt) };
    }
  };
}
function instruction9() {
  return {
    format(prompt) {
      let text13 = "";
      text13 += `${prompt.system ?? DEFAULT_SYSTEM_MESSAGE2}

`;
      text13 += `USER: `;
      const images = {};
      if (typeof prompt.instruction === "string") {
        text13 += `${prompt.instruction}
`;
      } else {
        let imageCounter = 1;
        for (const content of prompt.instruction) {
          switch (content.type) {
            case "text": {
              text13 += content.text;
              break;
            }
            case "image": {
              text13 += `[img-${imageCounter}]`;
              images[imageCounter.toString()] = convertDataContentToBase64String(content.image);
              imageCounter++;
              break;
            }
          }
          text13 += `${content}
`;
        }
      }
      text13 += `
ASSISTANT: `;
      return { text: text13, images };
    },
    stopSequences: [`
USER:`]
  };
}
function chat9() {
  return {
    format(prompt) {
      let text13 = "";
      text13 += `${prompt.system ?? DEFAULT_SYSTEM_MESSAGE2}

`;
      let imageCounter = 1;
      const images = {};
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            text13 += `USER: `;
            if (typeof content === "string") {
              text13 += content;
              break;
            }
            for (const part of content) {
              switch (part.type) {
                case "text": {
                  text13 += part.text;
                  break;
                }
                case "image": {
                  text13 += `[img-${imageCounter}]`;
                  images[imageCounter.toString()] = convertDataContentToBase64String(part.image);
                  imageCounter++;
                  break;
                }
              }
            }
            break;
          }
          case "assistant": {
            text13 += `ASSISTANT: ${validateContentIsString(content, prompt)}`;
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
        text13 += `

`;
      }
      text13 += `ASSISTANT: `;
      return { text: text13, images };
    },
    stopSequences: [`
USER:`]
  };
}
function asLlamaCppPromptTemplate(promptTemplate) {
  return {
    format: (prompt) => ({
      text: promptTemplate.format(prompt)
    }),
    stopSequences: promptTemplate.stopSequences
  };
}
function asLlamaCppTextPromptTemplateProvider(promptTemplateProvider) {
  return {
    text: () => asLlamaCppPromptTemplate(promptTemplateProvider.text()),
    instruction: () => asLlamaCppPromptTemplate(promptTemplateProvider.instruction()),
    chat: () => asLlamaCppPromptTemplate(promptTemplateProvider.chat())
  };
}
function convertJsonSchemaToGBNF(schema) {
  const rules = new RuleMap();
  rules.add("space", SPACE_RULE);
  visit(schema, void 0, rules);
  return rules.toGBNF();
}
function formatLiteral(literal) {
  const escaped = JSON.stringify(literal).replace(
    /[\n\r"]/g,
    (m) => GRAMMAR_LITERAL_ESCAPES[m]
  );
  return `"${escaped}"`;
}
function visit(schema, name, rules) {
  const schemaType = schema.type;
  const ruleName = name || "root";
  if (schema.oneOf || schema.anyOf) {
    const rule = (schema.oneOf || schema.anyOf).map(
      (altSchema, i) => visit(altSchema, `${name}${name ? "-" : ""}${i}`, rules)
    ).join(" | ");
    return rules.add(ruleName, rule);
  } else if ("const" in schema) {
    return rules.add(ruleName, formatLiteral(schema.const));
  } else if ("enum" in schema) {
    const rule = schema.enum.map(formatLiteral).join(" | ");
    return rules.add(ruleName, rule);
  } else if (schemaType === "object" && "properties" in schema) {
    const propPairs = Object.entries(schema.properties);
    let rule = '"{" space';
    propPairs.forEach(([propName, propSchema], i) => {
      const propRuleName = visit(
        propSchema,
        `${name ?? ""}${name ? "-" : ""}${propName}`,
        rules
      );
      if (i > 0) {
        rule += ' "," space';
      }
      rule += ` ${formatLiteral(propName)} space ":" space ${propRuleName}`;
    });
    rule += ' "}" space';
    return rules.add(ruleName, rule);
  } else if (schemaType === "array" && "items" in schema) {
    const itemRuleName = visit(
      schema.items,
      `${name ?? ""}${name ? "-" : ""}item`,
      rules
    );
    const rule = `"[" space (${itemRuleName} ("," space ${itemRuleName})*)? "]" space`;
    return rules.add(ruleName, rule);
  } else {
    if (!PRIMITIVE_RULES[schemaType]) {
      throw new Error(`Unrecognized schema: ${JSON.stringify(schema)}`);
    }
    return rules.add(
      ruleName === "root" ? "root" : schemaType,
      PRIMITIVE_RULES[schemaType]
    );
  }
}
async function createLlamaCppFullDeltaIterableQueue(stream) {
  const queue = new AsyncQueue();
  parseEventSourceStream({ stream }).then(async (events) => {
    try {
      for await (const event of events) {
        const data = event.data;
        const eventData = parseJSON({
          text: data,
          schema: zodSchema(llamaCppTextStreamChunkSchema)
        });
        queue.push({ type: "delta", deltaValue: eventData });
        if (eventData.stop) {
          queue.close();
        }
      }
    } catch (error) {
      queue.push({ type: "error", error });
      queue.close();
    }
  }).catch((error) => {
    queue.push({ type: "error", error });
    queue.close();
  });
  return queue;
}
function Api5(settings) {
  return new LlamaCppApiConfiguration(settings);
}
function CompletionTextGenerator(settings = {}) {
  return new LlamaCppCompletionModel(settings);
}
function TextEmbedder3(settings = {}) {
  return new LlamaCppTextEmbeddingModel(settings);
}
function Tokenizer2(api = new LlamaCppApiConfiguration()) {
  return new LlamaCppTokenizer(api);
}
function Api6(settings) {
  return new LmntApiConfiguration(settings);
}
function SpeechGenerator2(settings) {
  return new LmntSpeechModel(settings);
}
async function parseEventSourceStreamAsAsyncIterable({
  stream,
  schema
}) {
  const queue = new AsyncQueue();
  parseEventSourceStream({ stream }).then(async (events) => {
    try {
      for await (const event of events) {
        const data = event.data;
        if (data === "[DONE]") {
          queue.close();
          return;
        }
        const parseResult = safeParseJSON({
          text: data,
          schema
        });
        if (!parseResult.success) {
          queue.push({
            type: "error",
            error: parseResult.error
          });
          continue;
        }
        const completionChunk = parseResult.value;
        queue.push({
          type: "delta",
          deltaValue: completionChunk
        });
      }
    } catch (error) {
      queue.push({ type: "error", error });
      queue.close();
      return;
    }
  }).catch((error) => {
    queue.push({ type: "error", error });
    queue.close();
    return;
  });
  return queue;
}
function text10() {
  return {
    format: (prompt) => [{ role: "user", content: prompt }],
    stopSequences: []
  };
}
function instruction10() {
  return {
    format(prompt) {
      const messages = [];
      if (prompt.system != null) {
        messages.push({ role: "system", content: prompt.system });
      }
      const instruction13 = validateContentIsString(prompt.instruction, prompt);
      messages.push({ role: "user", content: instruction13 });
      return messages;
    },
    stopSequences: []
  };
}
function chat10() {
  return {
    format(prompt) {
      const messages = [];
      if (prompt.system != null) {
        messages.push({ role: "system", content: prompt.system });
      }
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            const textContent = validateContentIsString(content, prompt);
            messages.push({ role: "user", content: textContent });
            break;
          }
          case "assistant": {
            messages.push({
              role: "assistant",
              content: validateContentIsString(content, prompt)
            });
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      return messages;
    },
    stopSequences: []
  };
}
function Api7(settings) {
  return new MistralApiConfiguration(settings);
}
function ChatTextGenerator(settings) {
  return new MistralChatModel(settings);
}
function TextEmbedder4(settings) {
  return new MistralTextEmbeddingModel(settings);
}
function text11() {
  return {
    format: (prompt) => [{ role: "user", content: prompt }],
    stopSequences: []
  };
}
function instruction11() {
  return {
    format(prompt) {
      const messages = [];
      if (prompt.system != null) {
        messages.push({
          role: "system",
          content: prompt.system
        });
      }
      messages.push({
        role: "user",
        ...extractUserContent(prompt.instruction)
      });
      return messages;
    },
    stopSequences: []
  };
}
function chat11() {
  return {
    format(prompt) {
      const messages = [];
      if (prompt.system != null) {
        messages.push({ role: "system", content: prompt.system });
      }
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            messages.push({
              role: "user",
              ...extractUserContent(content)
            });
            break;
          }
          case "assistant": {
            messages.push({
              role: "assistant",
              content: validateContentIsString(content, prompt)
            });
            break;
          }
          case "tool": {
            throw new InvalidPromptError(
              "Tool messages are not supported.",
              prompt
            );
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      return messages;
    },
    stopSequences: []
  };
}
function extractUserContent(input) {
  if (typeof input === "string") {
    return { content: input, images: void 0 };
  }
  const images = [];
  let content = "";
  for (const part of input) {
    if (part.type === "text") {
      content += part.text;
    } else {
      images.push(convertDataContentToBase64String(part.image));
    }
  }
  return { content, images };
}
function asOllamaCompletionPromptTemplate(promptTemplate) {
  return {
    format: (prompt) => ({
      prompt: promptTemplate.format(prompt)
    }),
    stopSequences: promptTemplate.stopSequences
  };
}
function asOllamaCompletionTextPromptTemplateProvider(promptTemplateProvider) {
  return {
    text: () => asOllamaCompletionPromptTemplate(promptTemplateProvider.text()),
    instruction: () => asOllamaCompletionPromptTemplate(promptTemplateProvider.instruction()),
    chat: () => asOllamaCompletionPromptTemplate(promptTemplateProvider.chat())
  };
}
function Api8(settings) {
  return new OllamaApiConfiguration(settings);
}
function CompletionTextGenerator2(settings) {
  return new OllamaCompletionModel(settings);
}
function ChatTextGenerator2(settings) {
  return new OllamaChatModel(settings);
}
function TextEmbedder5(settings) {
  return new OllamaTextEmbeddingModel(settings);
}
function identity() {
  return { format: (prompt) => prompt, stopSequences: [] };
}
function text12() {
  return {
    format: (prompt) => [OpenAIChatMessage.user(prompt)],
    stopSequences: []
  };
}
function instruction12() {
  return {
    format(prompt) {
      const messages = [];
      if (prompt.system != null) {
        messages.push(OpenAIChatMessage.system(prompt.system));
      }
      messages.push(OpenAIChatMessage.user(prompt.instruction));
      return messages;
    },
    stopSequences: []
  };
}
function chat12() {
  return {
    format(prompt) {
      const messages = [];
      if (prompt.system != null) {
        messages.push(OpenAIChatMessage.system(prompt.system));
      }
      for (const { role, content } of prompt.messages) {
        switch (role) {
          case "user": {
            messages.push(OpenAIChatMessage.user(content));
            break;
          }
          case "assistant": {
            if (typeof content === "string") {
              messages.push(OpenAIChatMessage.assistant(content));
            } else {
              let text13 = "";
              const toolCalls = [];
              for (const part of content) {
                switch (part.type) {
                  case "text": {
                    text13 += part.text;
                    break;
                  }
                  case "tool-call": {
                    toolCalls.push({
                      id: part.id,
                      type: "function",
                      function: {
                        name: part.name,
                        arguments: JSON.stringify(part.args)
                      }
                    });
                    break;
                  }
                  default: {
                    const _exhaustiveCheck = part;
                    throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
                  }
                }
              }
              messages.push({
                role: "assistant",
                content: text13,
                tool_calls: toolCalls
              });
            }
            break;
          }
          case "tool": {
            for (const toolResponse of content) {
              messages.push({
                role: "tool",
                tool_call_id: toolResponse.id,
                content: JSON.stringify(toolResponse.response)
              });
            }
            break;
          }
          default: {
            const _exhaustiveCheck = role;
            throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
          }
        }
      }
      return messages;
    },
    stopSequences: []
  };
}
function never(_) {
}
function getTiktokenBPE(model) {
  switch (model) {
    case "gpt-3.5-turbo":
    case "gpt-3.5-turbo-0301":
    case "gpt-3.5-turbo-0613":
    case "gpt-3.5-turbo-1106":
    case "gpt-3.5-turbo-0125":
    case "gpt-3.5-turbo-16k":
    case "gpt-3.5-turbo-16k-0613":
    case "gpt-3.5-turbo-instruct":
    case "gpt-4":
    case "gpt-4-0314":
    case "gpt-4-0613":
    case "gpt-4-turbo-preview":
    case "gpt-4-1106-preview":
    case "gpt-4-0125-preview":
    case "gpt-4-vision-preview":
    case "gpt-4-32k":
    case "gpt-4-32k-0314":
    case "gpt-4-32k-0613":
    case "text-embedding-3-small":
    case "text-embedding-3-large":
    case "text-embedding-ada-002": {
      return cl100k_base_default;
    }
    default: {
      never(model);
      throw new Error(`Unknown model: ${model}`);
    }
  }
}
async function countOpenAIChatMessageTokens({
  message,
  model
}) {
  const tokenizer = new TikTokenTokenizer({
    model: getOpenAIChatModelInformation(model).baseModel
  });
  if (message.content == null) {
    return OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT;
  }
  if (typeof message.content === "string") {
    return OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT + await countTokens(tokenizer, message.content);
  }
  let contentTokenCount = OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT;
  for (const content of message.content) {
    if (content.type === "text") {
      contentTokenCount += await countTokens(tokenizer, content.text);
    }
  }
  return contentTokenCount;
}
async function countOpenAIChatPromptTokens({
  messages,
  model
}) {
  let tokens = OPENAI_CHAT_PROMPT_BASE_TOKEN_COUNT;
  for (const message of messages) {
    tokens += await countOpenAIChatMessageTokens({ message, model });
  }
  return tokens;
}
function getOpenAIChatModelInformation(model) {
  if (model in OPENAI_CHAT_MODELS) {
    const baseModelInformation = OPENAI_CHAT_MODELS[model];
    return {
      baseModel: model,
      isFineTuned: false,
      contextWindowSize: baseModelInformation.contextWindowSize,
      promptTokenCostInMillicents: baseModelInformation.promptTokenCostInMillicents,
      completionTokenCostInMillicents: baseModelInformation.completionTokenCostInMillicents
    };
  }
  const [_, baseModel, ___, ____, _____] = model.split(":");
  if (["gpt-3.5-turbo", "gpt-3.5-turbo-0613", "gpt-4-0613"].includes(baseModel)) {
    const baseModelInformation = OPENAI_CHAT_MODELS[baseModel];
    return {
      baseModel,
      isFineTuned: true,
      contextWindowSize: baseModelInformation.contextWindowSize,
      promptTokenCostInMillicents: baseModelInformation.fineTunedPromptTokenCostInMillicents,
      completionTokenCostInMillicents: baseModelInformation.fineTunedCompletionTokenCostInMillicents
    };
  }
  throw new Error(`Unknown OpenAI chat base model ${baseModel}.`);
}
function getOpenAICompletionModelInformation(model) {
  return OPENAI_TEXT_GENERATION_MODELS[model];
}
function getAudioFileExtension(mimeType) {
  const normalizedMimeType = mimeType.split(";")[0].toLowerCase();
  switch (normalizedMimeType) {
    case "audio/webm":
      return "webm";
    case "audio/mp3":
      return "mp3";
    case "audio/wav":
      return "wav";
    case "audio/mp4":
      return "mp4";
    case "audio/mpeg":
    case "audio/mpga":
      return "mpeg";
    case "audio/ogg":
    case "audio/oga":
      return "ogg";
    case "audio/flac":
      return "flac";
    case "audio/m4a":
      return "m4a";
    default:
      throw new Error(`Unsupported audio format: ${mimeType}`);
  }
}
function Api9(settings) {
  return new OpenAIApiConfiguration(settings);
}
function AzureApi(settings) {
  return new AzureOpenAIApiConfiguration(settings);
}
function CompletionTextGenerator3(settings) {
  return new OpenAICompletionModel(settings);
}
function ChatTextGenerator3(settings) {
  return new OpenAIChatModel(settings);
}
function TextEmbedder6(settings) {
  return new OpenAITextEmbeddingModel(settings);
}
function SpeechGenerator3(settings) {
  return new OpenAISpeechModel(settings);
}
function Transcriber(settings) {
  return new OpenAITranscriptionModel(settings);
}
function ImageGenerator2(settings) {
  return new OpenAIImageGenerationModel(settings);
}
function Tokenizer3(settings) {
  return new TikTokenTokenizer(settings);
}
function FireworksAIApi(settings = {}) {
  return new FireworksAIApiConfiguration(settings);
}
function PerplexityApi(settings = {}) {
  return new PerplexityApiConfiguration(settings);
}
function TogetherAIApi(settings = {}) {
  return new TogetherAIApiConfiguration(settings);
}
function CompletionTextGenerator4(settings) {
  return new OpenAICompatibleCompletionModel(settings);
}
function ChatTextGenerator4(settings) {
  return new OpenAICompatibleChatModel(settings);
}
function TextEmbedder7(settings) {
  return new OpenAICompatibleTextEmbeddingModel(settings);
}
function mapBasicPromptToStabilityFormat() {
  return {
    format: (description) => [{ text: description }]
  };
}
function Api10(settings) {
  return new StabilityApiConfiguration(settings);
}
function ImageGenerator3(settings) {
  return new StabilityImageGenerationModel(settings);
}
function Api11(settings) {
  return new WhisperCppApiConfiguration(settings);
}
function Transcriber2(settings = {}) {
  return new WhisperCppTranscriptionModel(settings);
}
async function retrieve(retriever, query, options) {
  return executeFunctionCall({
    options,
    input: query,
    functionType: "retrieve",
    execute: (options2) => retriever.retrieve(query, options2),
    inputPropertyName: "query",
    outputPropertyName: "results"
  });
}
function splitOnSeparator({
  separator
}) {
  return async ({ text: text13 }) => text13.split(separator);
}
function splitRecursively({
  maxChunkSize,
  segments
}) {
  if (segments.length < maxChunkSize) {
    return Array.isArray(segments) ? [segments.join("")] : [segments];
  }
  const half = Math.ceil(segments.length / 2);
  const left = segments.slice(0, half);
  const right = segments.slice(half);
  return [
    ...splitRecursively({
      segments: left,
      maxChunkSize
    }),
    ...splitRecursively({
      segments: right,
      maxChunkSize
    })
  ];
}
async function splitTextChunks(splitFunction, inputs) {
  const pageChunks = await Promise.all(
    inputs.map((input) => splitTextChunk(splitFunction, input))
  );
  return pageChunks.flat();
}
async function splitTextChunk(splitFunction, input) {
  const parts = await splitFunction(input);
  return parts.map((text13) => ({
    ...input,
    text: text13
  }));
}
async function executeTool({
  tool,
  args,
  fullResponse,
  ...options
}) {
  const callResponse = await doExecuteTool({ tool, args, ...options });
  return fullResponse ? callResponse : callResponse.output;
}
async function doExecuteTool({
  tool,
  args,
  ...options
}) {
  const run = await getRun(options?.run);
  const eventSource = new FunctionEventSource({
    observers: [
      ...getFunctionCallLogger(options?.logging ?? getLogFormat()),
      ...getFunctionObservers(),
      ...run?.functionObserver != null ? [run.functionObserver] : [],
      ...options?.observers ?? []
    ],
    errorHandler: run?.errorHandler
  });
  const durationMeasurement = startDurationMeasurement();
  const metadata = {
    functionType: "execute-tool",
    callId: `call-${nanoid()}`,
    parentCallId: options?.callId,
    runId: run?.runId,
    sessionId: run?.sessionId,
    userId: run?.userId,
    functionId: options?.functionId,
    toolName: tool.name,
    input: args
  };
  eventSource.notify({
    ...metadata,
    eventType: "started",
    timestamp: durationMeasurement.startDate,
    startTimestamp: durationMeasurement.startDate
  });
  const result = await runSafe(
    () => tool.execute(args, {
      functionType: metadata.functionType,
      callId: metadata.callId,
      functionId: options?.functionId,
      logging: options?.logging,
      observers: options?.observers,
      run
    })
  );
  const finishMetadata = {
    ...metadata,
    eventType: "finished",
    timestamp: /* @__PURE__ */ new Date(),
    startTimestamp: durationMeasurement.startDate,
    finishTimestamp: /* @__PURE__ */ new Date(),
    durationInMs: durationMeasurement.durationInMs
  };
  if (!result.ok) {
    if (result.isAborted) {
      eventSource.notify({
        ...finishMetadata,
        result: {
          status: "abort"
        }
      });
      throw new AbortError();
    }
    eventSource.notify({
      ...finishMetadata,
      result: {
        status: "error",
        error: result.error
      }
    });
    throw new ToolExecutionError({
      toolName: tool.name,
      input: args,
      cause: result.error,
      message: result.error?.message
    });
  }
  const output = result.value;
  eventSource.notify({
    ...finishMetadata,
    result: {
      status: "success",
      value: output
    }
  });
  return {
    output,
    metadata: finishMetadata
  };
}
async function generateToolCall({
  model,
  tool,
  prompt,
  fullResponse,
  ...options
}) {
  const expandedPrompt = typeof prompt === "function" ? prompt(tool) : prompt;
  const callResponse = await executeStandardCall({
    functionType: "generate-tool-call",
    input: expandedPrompt,
    model,
    options,
    generateResponse: async (options2) => {
      try {
        const result = await model.doGenerateToolCall(
          tool,
          expandedPrompt,
          options2
        );
        const toolCall = result.toolCall;
        if (toolCall === null) {
          throw new ToolCallGenerationError({
            toolName: tool.name,
            cause: "No tool call generated."
          });
        }
        const parseResult = tool.parameters.validate(toolCall.args);
        if (!parseResult.success) {
          throw new ToolCallArgumentsValidationError({
            toolName: tool.name,
            args: toolCall.args,
            cause: parseResult.error
          });
        }
        return {
          rawResponse: result.rawResponse,
          extractedValue: {
            id: toolCall.id,
            name: tool.name,
            args: parseResult.value
          },
          usage: result.usage
        };
      } catch (error) {
        if (error instanceof ToolCallArgumentsValidationError || error instanceof ToolCallGenerationError) {
          throw error;
        }
        throw new ToolCallGenerationError({
          toolName: tool.name,
          cause: error
        });
      }
    }
  });
  return fullResponse ? {
    toolCall: callResponse.value,
    rawResponse: callResponse.rawResponse,
    metadata: callResponse.metadata
  } : callResponse.value;
}
function createSystemPrompt2({
  originalSystemPrompt,
  toolPrompt = DEFAULT_TOOL_PROMPT,
  tool
}) {
  return [
    originalSystemPrompt,
    originalSystemPrompt != null ? "" : null,
    toolPrompt(tool)
  ].filter(Boolean).join("\n");
}
function extractToolCall(response) {
  return { id: nanoid(), args: parseJSON({ text: response }) };
}
async function generateToolCalls({
  model,
  tools,
  prompt,
  fullResponse,
  ...options
}) {
  const expandedPrompt = typeof prompt === "function" ? prompt(tools) : prompt;
  const callResponse = await executeStandardCall({
    functionType: "generate-tool-calls",
    input: expandedPrompt,
    model,
    options,
    generateResponse: async (options2) => {
      const result = await model.doGenerateToolCalls(
        tools,
        expandedPrompt,
        options2
      );
      const { text: text13, toolCalls: rawToolCalls } = result;
      if (rawToolCalls == null) {
        return {
          rawResponse: result.rawResponse,
          extractedValue: { text: text13, toolCalls: null },
          usage: result.usage
        };
      }
      const toolCalls = rawToolCalls.map((rawToolCall) => {
        const tool = tools.find((tool2) => tool2.name === rawToolCall.name);
        if (tool == void 0) {
          throw new NoSuchToolDefinitionError({
            toolName: rawToolCall.name,
            parameters: rawToolCall.args
          });
        }
        const parseResult = tool.parameters.validate(rawToolCall.args);
        if (!parseResult.success) {
          throw new ToolCallArgumentsValidationError({
            toolName: tool.name,
            args: rawToolCall.args,
            cause: parseResult.error
          });
        }
        return {
          id: rawToolCall.id,
          name: tool.name,
          args: parseResult.value
        };
      });
      return {
        rawResponse: result.rawResponse,
        extractedValue: {
          text: text13,
          toolCalls
        },
        usage: result.usage
      };
    }
  });
  return fullResponse ? callResponse : callResponse.value;
}
async function safeExecuteToolCall(tool, toolCall, options) {
  try {
    return {
      tool: toolCall.name,
      toolCall,
      args: toolCall.args,
      ok: true,
      result: await executeTool({ tool, args: toolCall.args, ...options })
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }
    return {
      tool: toolCall.name,
      toolCall,
      args: toolCall.args,
      ok: false,
      result: new ToolCallError({
        toolCall,
        cause: error instanceof ToolExecutionError ? error.cause : error
      })
    };
  }
}
async function runTool({
  model,
  tool,
  prompt,
  ...options
}) {
  const expandedPrompt = typeof prompt === "function" ? prompt(tool) : prompt;
  return executeFunctionCall({
    options,
    input: expandedPrompt,
    functionType: "run-tool",
    execute: async (options2) => safeExecuteToolCall(
      tool,
      await generateToolCall({ model, tool, prompt: expandedPrompt, ...options2 }),
      options2
    )
  });
}
async function runTools({
  model,
  tools,
  prompt,
  ...options
}) {
  const expandedPrompt = typeof prompt === "function" ? prompt(tools) : prompt;
  return executeFunctionCall({
    options,
    input: expandedPrompt,
    functionType: "run-tools",
    execute: async (options2) => {
      const modelResponse = await generateToolCalls({
        model,
        tools,
        prompt: expandedPrompt,
        fullResponse: false,
        ...options2
      });
      const { toolCalls, text: text13 } = modelResponse;
      if (toolCalls == null) {
        return { text: text13, toolResults: null };
      }
      const toolResults = await Promise.all(
        toolCalls.map(async (toolCall) => {
          const tool = tools.find((tool2) => tool2.name === toolCall.name);
          if (tool == null) {
            return {
              tool: toolCall.name,
              toolCall,
              args: toolCall.args,
              ok: false,
              result: new ToolCallError({
                message: `No tool with name '${toolCall.name}' found.`,
                toolCall
              })
            };
          }
          return await safeExecuteToolCall(
            tool,
            toolCall,
            options2
          );
        })
      );
      return {
        text: text13,
        toolResults
      };
    }
  });
}
function createEventSourceStream(events) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const event of events) {
          controller.enqueue(
            textEncoder.encode(`data: ${JSON.stringify(event)}

`)
          );
        }
      } finally {
        controller.close();
      }
    }
  });
}
async function upsertIntoVectorIndex({
  vectorIndex,
  embeddingModel,
  generateId = nanoid,
  objects,
  getValueToEmbed,
  getId
}, options) {
  return executeFunctionCall({
    options,
    input: objects,
    functionType: "upsert-into-vector-index",
    inputPropertyName: "objects",
    execute: async (options2) => {
      const embeddings = await embedMany({
        model: embeddingModel,
        values: objects.map(getValueToEmbed),
        ...options2
      });
      await vectorIndex.upsertMany(
        objects.map((object, i) => ({
          id: getId?.(object, i) ?? generateId(),
          vector: embeddings[i],
          data: object
        }))
      );
    }
  });
}
var import_secure_json_parse, import_secure_json_parse2, import_secure_json_parse3, __defProp3, __require, __export2, FunctionEventSource, DefaultRun, ModelFusionConfiguration_exports, globalLogFormat, globalFunctionObservers, promptFunctionMarker, AbortError, ApiCallError, ApiFacade_exports, retryNever, RetryError, retryWithExponentialBackoff, MaxConcurrencyThrottler, throttleOff, AbstractApiConfiguration, BaseUrlApiConfiguration, BaseUrlApiConfigurationWithDefaults, MemoryCache, basicTextObserver, detailedObjectObserver, detailedJsonObserver, runStorage, PerformanceNowDurationMeasurement, DateDurationMeasurement, runSafe, JSONParseError, TypeValidationError, UncheckedSchema, ZodSchema, EmbeddingSimilarityClassifier, PromptTemplateImageGenerationModel, MAX_BLOCK_SIZE, AsyncQueue, ObjectParseError, ObjectFromTextGenerationModel, ObjectFromTextStreamingModel, ObjectStreamResponse, ObjectValidationError, DEFAULT_SCHEMA_PREFIX, DEFAULT_SCHEMA_SUFFIX, jsonObjectPrompt, ToolCallParseError, TextGenerationToolCallModel, ToolCallsParseError, TextGenerationToolCallsModel, PromptTemplateTextGenerationModel, PromptTemplateTextStreamingModel, PromptTemplateFullTextModel, textGenerationModelProperties, AlpacaPromptTemplate_exports, InvalidPromptError, DEFAULT_SYSTEM_PROMPT_INPUT, DEFAULT_SYSTEM_PROMPT_NO_INPUT, ChatMLPromptTemplate_exports, START_SEGMENT, END_SEGMENT, ChatMessage, Llama2PromptTemplate_exports, BEGIN_SEGMENT, END_SEGMENT2, BEGIN_INSTRUCTION, END_INSTRUCTION, BEGIN_SYSTEM, END_SYSTEM, MistralInstructPromptTemplate_exports, BEGIN_SEGMENT2, END_SEGMENT3, BEGIN_INSTRUCTION2, END_INSTRUCTION2, NeuralChatPromptTemplate_exports, roleNames, instruction5, SynthiaPromptTemplate_exports, text6, instruction6, chat6, TextPromptTemplate_exports, text7, instruction7, chat7, VicunaPromptTemplate_exports, DEFAULT_SYSTEM_MESSAGE, instruction8, Automatic1111ApiConfiguration, createJsonErrorResponseHandler, createTextErrorResponseHandler, createJsonResponseHandler, createTextResponseHandler, createAudioMpegResponseHandler, postJsonToApi, postToApi, automatic1111ErrorDataSchema, failedAutomatic1111CallResponseHandler, Automatic1111Facade_exports, callWithRetryAndThrottle, AbstractModel, Automatic1111ImageGenerationModel, Automatic1111ImageGenerationResponseSchema, LoadAPIKeyError, CohereApiConfiguration, cohereErrorDataSchema, failedCohereCallResponseHandler, CohereFacade_exports, CohereTokenizer, cohereDetokenizationResponseSchema, cohereTokenizationResponseSchema, COHERE_TEXT_EMBEDDING_MODELS, CohereTextEmbeddingModel, cohereTextEmbeddingResponseSchema, createJsonStreamResponseHandler, COHERE_TEXT_GENERATION_MODELS, CohereTextGenerationModel, cohereTextGenerationResponseSchema, cohereTextStreamChunkSchema, CohereTextGenerationResponseFormat, ElevenLabsApiConfiguration, ElevenLabsFacade_exports, defaultModel, ElevenLabsSpeechModel, streamingResponseSchema, HuggingFaceApiConfiguration, huggingFaceErrorDataSchema, failedHuggingFaceCallResponseHandler, HuggingFaceFacade_exports, HuggingFaceTextEmbeddingModel, huggingFaceTextEmbeddingResponseSchema, HuggingFaceTextGenerationModel, huggingFaceTextGenerationResponseSchema, LlamaCppApiConfiguration, EventSourceParserStream, llamaCppErrorDataSchema, failedLlamaCppCallResponseHandler, LlamaCppPrompt_exports, LlamaCppBakLLaVA1PromptTemplate_exports, DEFAULT_SYSTEM_MESSAGE2, Text, Mistral, ChatML, Llama2, NeuralChat, Alpaca, Synthia, Vicuna, BakLLaVA1, LlamaCppTokenizer, llamaCppTokenizationResponseSchema, SPACE_RULE, PRIMITIVE_RULES, RuleMap, GRAMMAR_LITERAL_ESCAPES, LlamaCppCompletionModel, llamaCppTextGenerationResponseSchema, llamaCppTextStreamChunkSchema, LlamaCppCompletionResponseFormat, LlamaCppFacade_exports, LlamaCppTextEmbeddingModel, llamaCppTextEmbeddingResponseSchema, LlamaCppGrammars_exports, json, jsonArray, list, LmntApiConfiguration, LmntFacade_exports, LmntSpeechModel, lmntSpeechResponseSchema, MistralApiConfiguration, createEventSourceResponseHandler, mistralErrorDataSchema, failedMistralCallResponseHandler, MistralChatModel, mistralChatResponseSchema, mistralChatStreamChunkSchema, MistralChatResponseFormat, MistralFacade_exports, MistralTextEmbeddingModel, MistralTextEmbeddingResponseSchema, OllamaApiConfiguration, ollamaErrorDataSchema, failedOllamaCallResponseHandler, OllamaChatModel, ollamaChatResponseSchema, ollamaChatStreamChunkSchema, OllamaChatResponseFormat, OllamaCompletionPrompt_exports, Text2, Mistral2, ChatML2, Llama22, NeuralChat2, Alpaca2, Synthia2, Vicuna2, OllamaCompletionModel, ollamaCompletionResponseSchema, ollamaCompletionStreamChunkSchema, OllamaCompletionResponseFormat, OllamaFacade_exports, OllamaTextEmbeddingModel, ollamaTextEmbeddingResponseSchema, OpenAIApiConfiguration, openAIErrorDataSchema, failedOpenAICallResponseHandler, AbstractOpenAIChatModel, openAIChatResponseSchema, openaiChatChunkSchema, OpenAIChatResponseFormat, AbstractOpenAICompletionModel, OpenAICompletionResponseSchema, openaiCompletionStreamChunkSchema, OpenAITextResponseFormat, AbstractOpenAITextEmbeddingModel, openAITextEmbeddingResponseSchema, AzureOpenAIApiConfiguration, OpenAIChatMessage, OpenAIChatFunctionCallObjectGenerationModel, TikTokenTokenizer, OPENAI_CHAT_PROMPT_BASE_TOKEN_COUNT, OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT, OPENAI_CHAT_MODELS, isOpenAIChatModel, calculateOpenAIChatCostInMillicents, OpenAIChatModel, OPENAI_TEXT_GENERATION_MODELS, isOpenAICompletionModel, calculateOpenAICompletionCostInMillicents, OpenAICompletionModel, OpenAIFacade_exports, OPENAI_IMAGE_MODELS, calculateOpenAIImageGenerationCostInMillicents, OpenAIImageGenerationModel, openAIImageGenerationUrlSchema, openAIImageGenerationBase64JsonSchema, OpenAIImageGenerationResponseFormat, OPENAI_SPEECH_MODELS, calculateOpenAISpeechCostInMillicents, OpenAISpeechModel, OPENAI_TEXT_EMBEDDING_MODELS, isOpenAIEmbeddingModel, calculateOpenAIEmbeddingCostInMillicents, OpenAITextEmbeddingModel, OPENAI_TRANSCRIPTION_MODELS, calculateOpenAITranscriptionCostInMillicents, OpenAITranscriptionModel, openAITranscriptionJsonSchema, openAITranscriptionVerboseJsonSchema, OpenAITranscriptionResponseFormat, FireworksAIApiConfiguration, OpenAICompatibleChatModel, OpenAICompatibleCompletionModel, OpenAICompatibleFacade_exports, OpenAICompatibleTextEmbeddingModel, PerplexityApiConfiguration, TogetherAIApiConfiguration, StabilityApiConfiguration, stabilityErrorDataSchema, failedStabilityCallResponseHandler, StabilityFacade_exports, StabilityImageGenerationModel, stabilityImageGenerationResponseSchema, WhisperCppApiConfiguration, WhisperCppFacade_exports, WhisperCppTranscriptionModel, whisperCppTranscriptionJsonSchema, successfulResponseHandler, failedResponseHandler, HeliconeOpenAIApiConfiguration, splitAtCharacter, splitAtToken, NoSuchToolDefinitionError, Tool, ObjectGeneratorTool, ToolCallArgumentsValidationError, ToolCallError, ToolCallGenerationError, ToolExecutionError, RETURN_TYPE_SCHEMA, createParameters, WebSearchTool, DEFAULT_TOOL_PROMPT, jsonToolCallPrompt, textEncoder, VectorIndexRetriever, jsonDataSchema, MemoryVectorIndex;
var init_modelfusion = __esm({
  "../../node_modules/modelfusion/index.js"() {
    init_nanoid();
    init_nanoid();
    init_esm();
    import_secure_json_parse = __toESM(require_secure_json_parse(), 1);
    init_nanoid();
    init_nanoid();
    import_secure_json_parse2 = __toESM(require_secure_json_parse(), 1);
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_dist();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    import_secure_json_parse3 = __toESM(require_secure_json_parse(), 1);
    init_lite();
    init_cl100k_base();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_lib();
    init_nanoid();
    init_nanoid();
    init_lib();
    init_nanoid();
    __defProp3 = Object.defineProperty;
    __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
      get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
    }) : x)(function(x) {
      if (typeof require !== "undefined")
        return require.apply(this, arguments);
      throw Error('Dynamic require of "' + x + '" is not supported');
    });
    __export2 = (target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    };
    FunctionEventSource = class {
      observers;
      errorHandler;
      constructor({
        observers,
        errorHandler
      }) {
        this.observers = observers;
        this.errorHandler = errorHandler ?? ((error) => console.error(error));
      }
      notify(event) {
        for (const observer of this.observers) {
          try {
            observer.onFunctionEvent(event);
          } catch (error) {
            this.errorHandler(error);
          }
        }
      }
    };
    DefaultRun = class {
      runId;
      sessionId;
      userId;
      abortSignal;
      errorHandler;
      events = [];
      functionEventSource;
      constructor({
        runId = `run-${nanoid()}`,
        sessionId,
        userId,
        abortSignal,
        observers,
        errorHandler
      } = {}) {
        this.runId = runId;
        this.sessionId = sessionId;
        this.userId = userId;
        this.abortSignal = abortSignal;
        this.errorHandler = errorHandler ?? ((error) => console.error(error));
        this.functionEventSource = new FunctionEventSource({
          observers: observers ?? [],
          errorHandler: this.errorHandler.bind(this)
        });
      }
      functionObserver = {
        onFunctionEvent: (event) => {
          this.events.push(event);
          this.functionEventSource.notify(event);
        }
      };
    };
    ModelFusionConfiguration_exports = {};
    __export2(ModelFusionConfiguration_exports, {
      getFunctionObservers: () => getFunctionObservers,
      getLogFormat: () => getLogFormat,
      setFunctionObservers: () => setFunctionObservers,
      setLogFormat: () => setLogFormat
    });
    globalLogFormat = void 0;
    globalFunctionObservers = [];
    promptFunctionMarker = Symbol("promptFunction");
    AbortError = class extends Error {
      constructor(message = "Aborted") {
        super(message);
      }
    };
    ApiCallError = class extends Error {
      url;
      requestBodyValues;
      statusCode;
      responseBody;
      cause;
      isRetryable;
      data;
      constructor({
        message,
        url,
        requestBodyValues,
        statusCode,
        responseBody,
        cause,
        isRetryable = statusCode != null && (statusCode === 429 || statusCode >= 500),
        data
      }) {
        super(message);
        this.name = "ApiCallError";
        this.url = url;
        this.requestBodyValues = requestBodyValues;
        this.statusCode = statusCode;
        this.responseBody = responseBody;
        this.cause = cause;
        this.isRetryable = isRetryable;
        this.data = data;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          url: this.url,
          requestBodyValues: this.requestBodyValues,
          statusCode: this.statusCode,
          responseBody: this.responseBody,
          cause: this.cause,
          isRetryable: this.isRetryable,
          data: this.data
        };
      }
    };
    ApiFacade_exports = {};
    __export2(ApiFacade_exports, {
      retryNever: () => retryNever,
      retryWithExponentialBackoff: () => retryWithExponentialBackoff,
      throttleMaxConcurrency: () => throttleMaxConcurrency,
      throttleOff: () => throttleOff
    });
    retryNever = () => async (f) => f();
    RetryError = class extends Error {
      reason;
      lastError;
      errors;
      constructor({
        message,
        reason,
        errors
      }) {
        super(message);
        this.name = "RetryError";
        this.reason = reason;
        this.errors = errors;
        this.lastError = errors[errors.length - 1];
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          reason: this.reason,
          lastError: this.lastError,
          errors: this.errors
        };
      }
    };
    retryWithExponentialBackoff = ({
      maxTries = 3,
      initialDelayInMs = 2e3,
      backoffFactor = 2
    } = {}) => async (f) => _retryWithExponentialBackoff(f, {
      maxTries,
      delayInMs: initialDelayInMs,
      backoffFactor
    });
    MaxConcurrencyThrottler = class {
      maxConcurrentCalls;
      activeCallCount;
      callQueue;
      constructor({ maxConcurrentCalls }) {
        this.maxConcurrentCalls = maxConcurrentCalls;
        this.activeCallCount = 0;
        this.callQueue = [];
      }
      async run(fn) {
        return new Promise((resolve, reject) => {
          const tryExecute = async () => {
            if (this.activeCallCount >= this.maxConcurrentCalls)
              return;
            this.activeCallCount++;
            const idx = this.callQueue.indexOf(tryExecute);
            if (idx !== -1)
              this.callQueue.splice(idx, 1);
            try {
              resolve(await fn());
            } catch (error) {
              reject(error);
            } finally {
              this.activeCallCount--;
              if (this.callQueue.length > 0) {
                this.callQueue[0]();
              }
            }
          };
          this.callQueue.push(tryExecute);
          if (this.activeCallCount < this.maxConcurrentCalls) {
            tryExecute();
          }
        });
      }
    };
    throttleOff = () => (fn) => fn();
    AbstractApiConfiguration = class {
      retry;
      throttle;
      customCallHeaders;
      constructor({
        retry,
        throttle,
        customCallHeaders = () => ({})
      }) {
        this.retry = retry;
        this.throttle = throttle;
        this.customCallHeaders = customCallHeaders;
      }
      headers(params) {
        return Object.fromEntries(
          [
            ...Object.entries(this.fixedHeaders(params)),
            ...Object.entries(this.customCallHeaders(params))
          ].filter(
            (entry) => typeof entry[1] === "string"
          )
        );
      }
    };
    BaseUrlApiConfiguration = class extends AbstractApiConfiguration {
      baseUrl;
      fixedHeadersValue;
      constructor({
        baseUrl,
        headers,
        retry,
        throttle,
        customCallHeaders
      }) {
        super({ retry, throttle, customCallHeaders });
        this.baseUrl = typeof baseUrl == "string" ? parseBaseUrl(baseUrl) : baseUrl;
        this.fixedHeadersValue = headers ?? {};
      }
      fixedHeaders() {
        return this.fixedHeadersValue;
      }
      assembleUrl(path) {
        let basePath = this.baseUrl.path;
        if (basePath.endsWith("/")) {
          basePath = basePath.slice(0, -1);
        }
        if (!path.startsWith("/")) {
          path = `/${path}`;
        }
        return `${this.baseUrl.protocol}://${this.baseUrl.host}:${this.baseUrl.port}${basePath}${path}`;
      }
    };
    BaseUrlApiConfigurationWithDefaults = class extends BaseUrlApiConfiguration {
      constructor({
        baseUrlDefaults,
        baseUrl,
        headers,
        retry,
        throttle,
        customCallHeaders
      }) {
        super({
          baseUrl: resolveBaseUrl(baseUrl, baseUrlDefaults),
          headers,
          retry,
          throttle,
          customCallHeaders
        });
      }
    };
    MemoryCache = class {
      cache = /* @__PURE__ */ new Map();
      hashKey(key) {
        return JSON.stringify(key);
      }
      async lookupValue(key) {
        return this.cache.get(this.hashKey(key)) ?? null;
      }
      async storeValue(key, value) {
        this.cache.set(this.hashKey(key), value);
      }
    };
    basicTextObserver = {
      onFunctionEvent(event) {
        const text13 = `[${event.timestamp.toISOString()}] ${event.callId}${event.functionId != null ? ` (${event.functionId})` : ""} - ${event.functionType} ${event.eventType}`;
        switch (event.eventType) {
          case "started": {
            console.log(text13);
            break;
          }
          case "finished": {
            console.log(`${text13} in ${event.durationInMs}ms`);
            break;
          }
        }
      }
    };
    detailedObjectObserver = {
      onFunctionEvent(event) {
        if (event.eventType === "finished" && event.result != null && "rawResponse" in event.result && event.result?.rawResponse != null) {
          event = {
            ...event,
            result: Object.fromEntries(
              Object.entries(event.result).filter(([k]) => k !== "rawResponse")
            )
          };
        }
        function cleanObject(obj) {
          if (obj instanceof Date || typeof obj === "string") {
            return obj;
          }
          if (Array.isArray(obj)) {
            return obj.map((item) => cleanObject(item));
          }
          if (obj !== null && typeof obj === "object") {
            return Object.fromEntries(
              Object.entries(obj).map(([k, v]) => {
                if (v === void 0) {
                  return [k, void 0];
                } else if (v instanceof Uint8Array) {
                  return [k, "omitted<Uint8Array>"];
                } else if (Array.isArray(v) && v.length > 20 && v.every((v2) => typeof v2 === "number")) {
                  return [k, "omitted<Array<number>>"];
                } else {
                  return [k, cleanObject(v)];
                }
              }).filter(([_, v]) => v !== void 0)
            );
          }
          return obj;
        }
        const cleanedEvent = cleanObject(event);
        console.log(cleanedEvent);
      }
    };
    detailedJsonObserver = {
      onFunctionEvent(event) {
        if (event.eventType === "finished" && event.result != null && "rawResponse" in event.result && event.result?.rawResponse != null) {
          event = {
            ...event,
            result: Object.fromEntries(
              Object.entries(event.result).filter(([k]) => k !== "rawResponse")
            )
          };
        }
        event = Object.fromEntries(
          Object.entries(event).filter(([_, v]) => v !== void 0)
        );
        console.log(JSON.stringify(event));
      }
    };
    PerformanceNowDurationMeasurement = class {
      startTime = globalThis.performance.now();
      get startEpochSeconds() {
        return Math.floor(
          (globalThis.performance.timeOrigin + this.startTime) / 1e3
        );
      }
      get startDate() {
        return new Date(this.startEpochSeconds * 1e3);
      }
      get durationInMs() {
        return Math.ceil(globalThis.performance.now() - this.startTime);
      }
    };
    DateDurationMeasurement = class {
      startTime = Date.now();
      get startEpochSeconds() {
        return Math.floor(this.startTime / 1e3);
      }
      get startDate() {
        return new Date(this.startTime);
      }
      get durationInMs() {
        return Date.now() - this.startTime;
      }
    };
    runSafe = async (f) => {
      try {
        return { ok: true, value: await f() };
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return { ok: false, isAborted: true };
        }
        return { ok: false, error };
      }
    };
    JSONParseError = class extends Error {
      text;
      cause;
      constructor({ text: text13, cause }) {
        super(
          `JSON parsing failed: Text: ${text13}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "JSONParseError";
        this.cause = cause;
        this.text = text13;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          cause: this.cause,
          stack: this.stack,
          valueText: this.text
        };
      }
    };
    TypeValidationError = class extends Error {
      value;
      cause;
      constructor({ value, cause }) {
        super(
          `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "TypeValidationError";
        this.cause = cause;
        this.value = value;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          cause: this.cause,
          stack: this.stack,
          value: this.value
        };
      }
    };
    UncheckedSchema = class {
      constructor(jsonSchema) {
        this.jsonSchema = jsonSchema;
      }
      validate(value) {
        return { success: true, value };
      }
      getJsonSchema() {
        return this.jsonSchema;
      }
      _type;
    };
    ZodSchema = class {
      zodSchema;
      constructor(zodSchema2) {
        this.zodSchema = zodSchema2;
      }
      validate(value) {
        const result = this.zodSchema.safeParse(value);
        return result.success ? { success: true, value: result.data } : { success: false, error: result.error };
      }
      getJsonSchema() {
        return zodToJsonSchema(this.zodSchema);
      }
      _type;
      _partialType;
    };
    EmbeddingSimilarityClassifier = class _EmbeddingSimilarityClassifier {
      settings;
      modelInformation = {
        provider: "modelfusion",
        modelName: "EmbeddingSimilarityClassifier"
      };
      embeddings;
      constructor(settings) {
        this.settings = settings;
      }
      async getEmbeddings(options) {
        if (this.embeddings != null) {
          return this.embeddings;
        }
        const embeddings = [];
        for (const cluster of this.settings.clusters) {
          const clusterEmbeddings = await embedMany({
            model: this.settings.embeddingModel,
            values: cluster.values,
            ...options
          });
          for (let i = 0; i < clusterEmbeddings.length; i++) {
            embeddings.push({
              embedding: clusterEmbeddings[i],
              clusterValue: cluster.values[i],
              clusterName: cluster.name
            });
          }
        }
        this.embeddings = embeddings;
        return embeddings;
      }
      async doClassify(value, options) {
        const valueEmbedding = await embed({
          model: this.settings.embeddingModel,
          value,
          ...options
        });
        const clusterEmbeddings = await this.getEmbeddings(options);
        const allMatches = [];
        for (const embedding of clusterEmbeddings) {
          const similarity = cosineSimilarity(valueEmbedding, embedding.embedding);
          if (similarity >= this.settings.similarityThreshold) {
            allMatches.push({
              similarity,
              clusterValue: embedding.clusterValue,
              clusterName: embedding.clusterName
            });
          }
        }
        allMatches.sort((a, b) => b.similarity - a.similarity);
        return {
          class: allMatches.length > 0 ? allMatches[0].clusterName : null,
          rawResponse: void 0
        };
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          "clusters",
          "embeddingModel",
          "similarityThreshold"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      withSettings(additionalSettings) {
        return new _EmbeddingSimilarityClassifier(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    PromptTemplateImageGenerationModel = class _PromptTemplateImageGenerationModel {
      model;
      promptTemplate;
      constructor({
        model,
        promptTemplate
      }) {
        this.model = model;
        this.promptTemplate = promptTemplate;
      }
      get modelInformation() {
        return this.model.modelInformation;
      }
      get settings() {
        return this.model.settings;
      }
      doGenerateImages(prompt, options) {
        const mappedPrompt = this.promptTemplate.format(prompt);
        return this.model.doGenerateImages(mappedPrompt, options);
      }
      get settingsForEvent() {
        return this.model.settingsForEvent;
      }
      withPromptTemplate(promptTemplate) {
        return new _PromptTemplateImageGenerationModel({ model: this, promptTemplate });
      }
      withSettings(additionalSettings) {
        return new _PromptTemplateImageGenerationModel({
          model: this.model.withSettings(additionalSettings),
          promptTemplate: this.promptTemplate
        });
      }
    };
    MAX_BLOCK_SIZE = 65535;
    AsyncQueue = class {
      values = Array();
      pendingResolvers = [];
      closed = false;
      processPendingResolvers() {
        while (this.pendingResolvers.length > 0) {
          this.pendingResolvers.shift()?.();
        }
      }
      push(value) {
        if (this.closed) {
          throw new Error("Cannot push value to closed queue.");
        }
        this.values.push({ type: "value", value });
        this.processPendingResolvers();
      }
      error(error) {
        if (this.closed) {
          throw new Error("Cannot push error to closed queue.");
        }
        this.values.push({ type: "error", error });
        this.processPendingResolvers();
      }
      close() {
        this.closed = true;
        this.processPendingResolvers();
      }
      [Symbol.asyncIterator]() {
        let position = 0;
        return {
          next: () => new Promise((resolve, reject) => {
            const attemptResolve = () => {
              if (position < this.values.length) {
                const entry = this.values[position++];
                switch (entry.type) {
                  case "value":
                    resolve({ value: entry.value, done: false });
                    break;
                  case "error":
                    reject(entry.error);
                    break;
                }
              } else if (this.closed) {
                resolve({ value: void 0, done: true });
              } else {
                this.pendingResolvers.push(attemptResolve);
              }
            };
            attemptResolve();
          })
        };
      }
    };
    ObjectParseError = class extends Error {
      cause;
      valueText;
      constructor({ valueText, cause }) {
        super(
          `Object parsing failed. Value: ${valueText}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "ObjectParseError";
        this.cause = cause;
        this.valueText = valueText;
      }
      toJSON() {
        return {
          name: this.name,
          cause: this.cause,
          message: this.message,
          stack: this.stack,
          valueText: this.valueText
        };
      }
    };
    ObjectFromTextGenerationModel = class _ObjectFromTextGenerationModel {
      model;
      template;
      constructor({
        model,
        template
      }) {
        this.model = model;
        this.template = template;
      }
      get modelInformation() {
        return this.model.modelInformation;
      }
      get settings() {
        return this.model.settings;
      }
      get settingsForEvent() {
        return this.model.settingsForEvent;
      }
      getModelWithJsonOutput(schema) {
        if (this.template.withJsonOutput != null) {
          return this.template.withJsonOutput({
            model: this.model,
            schema
          });
        }
        return this.model;
      }
      async doGenerateObject(schema, prompt, options) {
        const { rawResponse, text: text13 } = await generateText({
          model: this.getModelWithJsonOutput(schema),
          prompt: this.template.createPrompt(prompt, schema),
          fullResponse: true,
          ...options
        });
        try {
          return {
            rawResponse,
            value: this.template.extractObject(text13),
            valueText: text13
          };
        } catch (error) {
          throw new ObjectParseError({
            valueText: text13,
            cause: error
          });
        }
      }
      withSettings(additionalSettings) {
        return new _ObjectFromTextGenerationModel({
          model: this.model.withSettings(additionalSettings),
          template: this.template
        });
      }
    };
    ObjectFromTextStreamingModel = class _ObjectFromTextStreamingModel extends ObjectFromTextGenerationModel {
      constructor(options) {
        super(options);
      }
      async doStreamObject(schema, prompt, options) {
        const textStream = await streamText({
          model: this.getModelWithJsonOutput(schema),
          prompt: this.template.createPrompt(prompt, schema),
          ...options
        });
        const queue = new AsyncQueue();
        (async () => {
          try {
            for await (const deltaText of textStream) {
              queue.push({ type: "delta", deltaValue: deltaText });
            }
          } catch (error) {
            queue.push({ type: "error", error });
          } finally {
            queue.close();
          }
        })();
        return queue;
      }
      extractObjectTextDelta(delta) {
        return delta;
      }
      parseAccumulatedObjectText(accumulatedText) {
        return parsePartialJson(accumulatedText);
      }
      withSettings(additionalSettings) {
        return new _ObjectFromTextStreamingModel({
          model: this.model.withSettings(additionalSettings),
          template: this.template
        });
      }
    };
    ObjectStreamResponse = class extends Response {
      constructor(stream, init) {
        super(ObjectStreamToTextStream(stream), {
          ...init,
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
    };
    ObjectValidationError = class extends Error {
      cause;
      valueText;
      value;
      constructor({
        value,
        valueText,
        cause
      }) {
        super(
          `Object validation failed. Value: ${valueText}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "ObjectValidationError";
        this.cause = cause;
        this.value = value;
        this.valueText = valueText;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          cause: this.cause,
          stack: this.stack,
          value: this.value,
          valueText: this.valueText
        };
      }
    };
    DEFAULT_SCHEMA_PREFIX = "JSON schema:";
    DEFAULT_SCHEMA_SUFFIX = "\nYou MUST answer with a JSON object that matches the JSON schema above.";
    jsonObjectPrompt = {
      custom(createPrompt) {
        return { createPrompt, extractObject };
      },
      text({
        schemaPrefix,
        schemaSuffix
      } = {}) {
        return {
          createPrompt: (prompt, schema) => ({
            system: createSystemPrompt({ schema, schemaPrefix, schemaSuffix }),
            instruction: prompt
          }),
          extractObject,
          adaptModel: (model) => model.withInstructionPrompt(),
          withJsonOutput: ({ model, schema }) => model.withJsonOutput(schema)
        };
      },
      instruction({
        schemaPrefix,
        schemaSuffix
      } = {}) {
        return {
          createPrompt: (prompt, schema) => ({
            system: createSystemPrompt({
              originalSystemPrompt: prompt.system,
              schema,
              schemaPrefix,
              schemaSuffix
            }),
            instruction: prompt.instruction
          }),
          extractObject,
          adaptModel: (model) => model.withInstructionPrompt(),
          withJsonOutput: ({ model, schema }) => model.withJsonOutput(schema)
        };
      }
    };
    ToolCallParseError = class extends Error {
      toolName;
      valueText;
      cause;
      constructor({
        toolName,
        valueText,
        cause
      }) {
        super(
          `Tool call parsing failed for '${toolName}'. Value: ${valueText}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "ToolCallParseError";
        this.toolName = toolName;
        this.cause = cause;
        this.valueText = valueText;
      }
      toJSON() {
        return {
          name: this.name,
          cause: this.cause,
          message: this.message,
          stack: this.stack,
          toolName: this.toolName,
          valueText: this.valueText
        };
      }
    };
    TextGenerationToolCallModel = class _TextGenerationToolCallModel {
      model;
      template;
      constructor({
        model,
        template
      }) {
        this.model = model;
        this.template = template;
      }
      get modelInformation() {
        return this.model.modelInformation;
      }
      get settings() {
        return this.model.settings;
      }
      get settingsForEvent() {
        return this.model.settingsForEvent;
      }
      getModelWithJsonOutput(schema) {
        if (this.template.withJsonOutput != null) {
          return this.template.withJsonOutput({
            model: this.model,
            schema
          });
        }
        return this.model;
      }
      async doGenerateToolCall(tool, prompt, options) {
        const { rawResponse, text: text13, metadata } = await generateText({
          model: this.getModelWithJsonOutput(tool.parameters),
          prompt: this.template.createPrompt(prompt, tool),
          fullResponse: true,
          ...options
        });
        try {
          return {
            rawResponse,
            toolCall: this.template.extractToolCall(text13, tool),
            usage: metadata?.usage
          };
        } catch (error) {
          throw new ToolCallParseError({
            toolName: tool.name,
            valueText: text13,
            cause: error
          });
        }
      }
      withSettings(additionalSettings) {
        return new _TextGenerationToolCallModel({
          model: this.model.withSettings(additionalSettings),
          template: this.template
        });
      }
    };
    ToolCallsParseError = class extends Error {
      valueText;
      cause;
      constructor({ valueText, cause }) {
        super(
          `Tool calls parsing failed. Value: ${valueText}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "ToolCallsParseError";
        this.cause = cause;
        this.valueText = valueText;
      }
      toJSON() {
        return {
          name: this.name,
          cause: this.cause,
          message: this.message,
          stack: this.stack,
          valueText: this.valueText
        };
      }
    };
    TextGenerationToolCallsModel = class _TextGenerationToolCallsModel {
      model;
      template;
      constructor({
        model,
        template
      }) {
        this.model = model;
        this.template = template;
      }
      get modelInformation() {
        return this.model.modelInformation;
      }
      get settings() {
        return this.model.settings;
      }
      get settingsForEvent() {
        return this.model.settingsForEvent;
      }
      async doGenerateToolCalls(tools, prompt, options) {
        const {
          rawResponse,
          text: generatedText,
          metadata
        } = await generateText({
          model: this.model,
          prompt: this.template.createPrompt(prompt, tools),
          fullResponse: true,
          ...options
        });
        try {
          const { text: text13, toolCalls } = this.template.extractToolCallsAndText(generatedText);
          return {
            rawResponse,
            text: text13,
            toolCalls,
            usage: metadata?.usage
          };
        } catch (error) {
          throw new ToolCallsParseError({
            valueText: generatedText,
            cause: error
          });
        }
      }
      withSettings(additionalSettings) {
        return new _TextGenerationToolCallsModel({
          model: this.model.withSettings(additionalSettings),
          template: this.template
        });
      }
    };
    PromptTemplateTextGenerationModel = class _PromptTemplateTextGenerationModel {
      model;
      promptTemplate;
      constructor({
        model,
        promptTemplate
      }) {
        this.model = model;
        this.promptTemplate = promptTemplate;
      }
      get modelInformation() {
        return this.model.modelInformation;
      }
      get settings() {
        return this.model.settings;
      }
      get tokenizer() {
        return this.model.tokenizer;
      }
      get contextWindowSize() {
        return this.model.contextWindowSize;
      }
      get countPromptTokens() {
        const originalCountPromptTokens = this.model.countPromptTokens?.bind(
          this.model
        );
        if (originalCountPromptTokens === void 0) {
          return void 0;
        }
        return (prompt) => originalCountPromptTokens(
          this.promptTemplate.format(prompt)
        );
      }
      doGenerateTexts(prompt, options) {
        const mappedPrompt = this.promptTemplate.format(prompt);
        return this.model.doGenerateTexts(mappedPrompt, options);
      }
      restoreGeneratedTexts(rawResponse) {
        return this.model.restoreGeneratedTexts(rawResponse);
      }
      get settingsForEvent() {
        return this.model.settingsForEvent;
      }
      asToolCallGenerationModel(promptTemplate) {
        return new TextGenerationToolCallModel({
          model: this,
          template: promptTemplate
        });
      }
      asToolCallsOrTextGenerationModel(promptTemplate) {
        return new TextGenerationToolCallsModel({
          model: this,
          template: promptTemplate
        });
      }
      asObjectGenerationModel(promptTemplate) {
        return new ObjectFromTextGenerationModel({
          model: this,
          template: promptTemplate
        });
      }
      withJsonOutput(schema) {
        return new _PromptTemplateTextGenerationModel({
          model: this.model.withJsonOutput(schema),
          promptTemplate: this.promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _PromptTemplateTextGenerationModel({
          model: this.model.withSettings(additionalSettings),
          promptTemplate: this.promptTemplate
        });
      }
    };
    PromptTemplateTextStreamingModel = class _PromptTemplateTextStreamingModel extends PromptTemplateTextGenerationModel {
      constructor(options) {
        super(options);
      }
      doStreamText(prompt, options) {
        const mappedPrompt = this.promptTemplate.format(prompt);
        return this.model.doStreamText(mappedPrompt, options);
      }
      extractTextDelta(delta) {
        return this.model.extractTextDelta(delta);
      }
      asObjectGenerationModel(promptTemplate) {
        return new ObjectFromTextStreamingModel({
          model: this,
          template: promptTemplate
        });
      }
      withJsonOutput(schema) {
        return new _PromptTemplateTextStreamingModel({
          model: this.model.withJsonOutput(schema),
          promptTemplate: this.promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _PromptTemplateTextStreamingModel({
          model: this.model.withSettings(additionalSettings),
          promptTemplate: this.promptTemplate
        });
      }
    };
    PromptTemplateFullTextModel = class _PromptTemplateFullTextModel extends PromptTemplateTextStreamingModel {
      constructor(options) {
        super(options);
      }
      doGenerateToolCall(tool, prompt, options) {
        const mappedPrompt = this.promptTemplate.format(prompt);
        return this.model.doGenerateToolCall(tool, mappedPrompt, options);
      }
      doGenerateToolCalls(tools, prompt, options) {
        const mappedPrompt = this.promptTemplate.format(prompt);
        return this.model.doGenerateToolCalls(tools, mappedPrompt, options);
      }
      withSettings(additionalSettings) {
        return new _PromptTemplateFullTextModel({
          model: this.model.withSettings(additionalSettings),
          promptTemplate: this.promptTemplate
        });
      }
    };
    textGenerationModelProperties = [
      "maxGenerationTokens",
      "stopSequences",
      "numberOfGenerations",
      "trimWhitespace"
    ];
    AlpacaPromptTemplate_exports = {};
    __export2(AlpacaPromptTemplate_exports, {
      chat: () => chat,
      instruction: () => instruction,
      text: () => text
    });
    InvalidPromptError = class extends Error {
      prompt;
      constructor(message, prompt) {
        super(message);
        this.name = "InvalidPromptError";
        this.prompt = prompt;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          stack: this.stack,
          prompt: this.prompt
        };
      }
    };
    DEFAULT_SYSTEM_PROMPT_INPUT = "Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.";
    DEFAULT_SYSTEM_PROMPT_NO_INPUT = "Below is an instruction that describes a task. Write a response that appropriately completes the request.";
    ChatMLPromptTemplate_exports = {};
    __export2(ChatMLPromptTemplate_exports, {
      chat: () => chat2,
      instruction: () => instruction2,
      text: () => text2
    });
    START_SEGMENT = "<|im_start|>";
    END_SEGMENT = "<|im_end|>";
    ChatMessage = {
      user({ text: text13 }) {
        return {
          role: "user",
          content: text13
        };
      },
      tool({
        toolResults
      }) {
        return {
          role: "tool",
          content: createToolContent({ toolResults })
        };
      },
      assistant({
        text: text13,
        toolResults
      }) {
        return {
          role: "assistant",
          content: createAssistantContent({ text: text13, toolResults })
        };
      }
    };
    Llama2PromptTemplate_exports = {};
    __export2(Llama2PromptTemplate_exports, {
      chat: () => chat3,
      instruction: () => instruction3,
      text: () => text3,
      validateLlama2Prompt: () => validateLlama2Prompt
    });
    BEGIN_SEGMENT = "<s>";
    END_SEGMENT2 = " </s>";
    BEGIN_INSTRUCTION = "[INST] ";
    END_INSTRUCTION = " [/INST] ";
    BEGIN_SYSTEM = "<<SYS>>\n";
    END_SYSTEM = "\n<</SYS>>\n\n";
    MistralInstructPromptTemplate_exports = {};
    __export2(MistralInstructPromptTemplate_exports, {
      chat: () => chat4,
      instruction: () => instruction4,
      text: () => text4,
      validateMistralPrompt: () => validateMistralPrompt
    });
    BEGIN_SEGMENT2 = "<s>";
    END_SEGMENT3 = "</s>";
    BEGIN_INSTRUCTION2 = "[INST] ";
    END_INSTRUCTION2 = " [/INST] ";
    NeuralChatPromptTemplate_exports = {};
    __export2(NeuralChatPromptTemplate_exports, {
      chat: () => chat5,
      instruction: () => instruction5,
      text: () => text5
    });
    roleNames = {
      system: "System",
      user: "User",
      assistant: "Assistant"
    };
    instruction5 = () => ({
      stopSequences: [],
      format(prompt) {
        const instruction13 = validateContentIsString(prompt.instruction, prompt);
        return segment2("system", prompt.system) + segment2("user", instruction13) + segmentStart2("assistant") + (prompt.responsePrefix ?? "");
      }
    });
    SynthiaPromptTemplate_exports = {};
    __export2(SynthiaPromptTemplate_exports, {
      chat: () => chat6,
      instruction: () => instruction6,
      text: () => text6
    });
    text6 = () => ({
      stopSequences: [],
      format: (prompt) => `USER: ${prompt}
ASSISTANT: `
    });
    instruction6 = () => ({
      stopSequences: [`
USER:`],
      format(prompt) {
        let text13 = prompt.system != null ? `SYSTEM: ${prompt.system}
` : "";
        text13 += `USER: ${validateContentIsString(prompt.instruction, prompt)}
`;
        text13 += `ASSISTANT: ${prompt.responsePrefix ?? ""}`;
        return text13;
      }
    });
    chat6 = () => ({
      format(prompt) {
        let text13 = prompt.system != null ? `SYSTEM: ${prompt.system}
` : "";
        for (const { role, content } of prompt.messages) {
          switch (role) {
            case "user": {
              text13 += `USER: ${validateContentIsString(content, prompt)}
`;
              break;
            }
            case "assistant": {
              text13 += `ASSISTANT: ${validateContentIsString(content, prompt)}
`;
              break;
            }
            case "tool": {
              throw new InvalidPromptError(
                "Tool messages are not supported.",
                prompt
              );
            }
            default: {
              const _exhaustiveCheck = role;
              throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
            }
          }
        }
        text13 += `ASSISTANT: `;
        return text13;
      },
      stopSequences: [`
USER:`]
    });
    TextPromptTemplate_exports = {};
    __export2(TextPromptTemplate_exports, {
      chat: () => chat7,
      instruction: () => instruction7,
      text: () => text7
    });
    text7 = () => ({
      stopSequences: [],
      format: (prompt) => prompt
    });
    instruction7 = () => ({
      stopSequences: [],
      format(prompt) {
        let text13 = "";
        if (prompt.system != null) {
          text13 += `${prompt.system}

`;
        }
        text13 += `${validateContentIsString(prompt.instruction, prompt)}

`;
        if (prompt.responsePrefix != null) {
          text13 += prompt.responsePrefix;
        }
        return text13;
      }
    });
    chat7 = ({
      user = "user",
      assistant = "assistant",
      system
    } = {}) => ({
      format(prompt) {
        let text13 = prompt.system != null ? `${system != null ? `${system}:` : ""}${prompt.system}

` : "";
        for (const { role, content } of prompt.messages) {
          switch (role) {
            case "user": {
              text13 += `${user}:
${validateContentIsString(content, prompt)}

`;
              break;
            }
            case "assistant": {
              text13 += `${assistant}:
${validateContentIsString(
                content,
                prompt
              )}

`;
              break;
            }
            case "tool": {
              throw new InvalidPromptError(
                "Tool messages are not supported.",
                prompt
              );
            }
            default: {
              const _exhaustiveCheck = role;
              throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
            }
          }
        }
        text13 += `${assistant}:
`;
        return text13;
      },
      stopSequences: [`
${user}:`]
    });
    VicunaPromptTemplate_exports = {};
    __export2(VicunaPromptTemplate_exports, {
      chat: () => chat8,
      instruction: () => instruction8,
      text: () => text8
    });
    DEFAULT_SYSTEM_MESSAGE = "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.";
    instruction8 = () => ({
      stopSequences: [`
USER:`],
      format(prompt) {
        let text13 = prompt.system != null ? `${prompt.system}

` : `${DEFAULT_SYSTEM_MESSAGE}

`;
        text13 += `USER: ${validateContentIsString(prompt.instruction, prompt)}
`;
        text13 += `ASSISTANT: `;
        return text13;
      }
    });
    Automatic1111ApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          baseUrlDefaults: {
            protocol: "http",
            host: "127.0.0.1",
            port: "7860",
            path: "/sdapi/v1"
          }
        });
      }
    };
    createJsonErrorResponseHandler = ({
      errorSchema,
      errorToMessage,
      isRetryable
    }) => async ({ response, url, requestBodyValues }) => {
      const responseBody = await response.text();
      if (responseBody.trim() === "") {
        return new ApiCallError({
          message: response.statusText,
          url,
          requestBodyValues,
          statusCode: response.status,
          responseBody,
          isRetryable: isRetryable?.(response)
        });
      }
      try {
        const parsedError = parseJSON({
          text: responseBody,
          schema: errorSchema
        });
        return new ApiCallError({
          message: errorToMessage(parsedError),
          url,
          requestBodyValues,
          statusCode: response.status,
          responseBody,
          data: parsedError,
          isRetryable: isRetryable?.(response, parsedError)
        });
      } catch (parseError) {
        return new ApiCallError({
          message: response.statusText,
          url,
          requestBodyValues,
          statusCode: response.status,
          responseBody,
          isRetryable: isRetryable?.(response)
        });
      }
    };
    createTextErrorResponseHandler = ({
      isRetryable
    } = {}) => async ({ response, url, requestBodyValues }) => {
      const responseBody = await response.text();
      return new ApiCallError({
        message: responseBody.trim() !== "" ? responseBody : response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseBody,
        isRetryable: isRetryable?.(response)
      });
    };
    createJsonResponseHandler = (responseSchema) => async ({ response, url, requestBodyValues }) => {
      const responseBody = await response.text();
      const parsedResult = safeParseJSON({
        text: responseBody,
        schema: responseSchema
      });
      if (!parsedResult.success) {
        throw new ApiCallError({
          message: "Invalid JSON response",
          cause: parsedResult.error,
          statusCode: response.status,
          responseBody,
          url,
          requestBodyValues
        });
      }
      return parsedResult.value;
    };
    createTextResponseHandler = () => async ({ response }) => response.text();
    createAudioMpegResponseHandler = () => async ({ response, url, requestBodyValues }) => {
      if (response.headers.get("Content-Type") !== "audio/mpeg") {
        throw new ApiCallError({
          message: "Invalid Content-Type (must be audio/mpeg)",
          statusCode: response.status,
          url,
          requestBodyValues
        });
      }
      return convertDataContentToUint8Array(await response.arrayBuffer());
    };
    postJsonToApi = async ({
      url,
      headers,
      body,
      failedResponseHandler: failedResponseHandler2,
      successfulResponseHandler: successfulResponseHandler2,
      abortSignal
    }) => postToApi({
      url,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: {
        content: JSON.stringify(body),
        values: body
      },
      failedResponseHandler: failedResponseHandler2,
      successfulResponseHandler: successfulResponseHandler2,
      abortSignal
    });
    postToApi = async ({
      url,
      headers = {},
      body,
      successfulResponseHandler: successfulResponseHandler2,
      failedResponseHandler: failedResponseHandler2,
      abortSignal
    }) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: body.content,
          signal: abortSignal
        });
        if (!response.ok) {
          try {
            throw await failedResponseHandler2({
              response,
              url,
              requestBodyValues: body.values
            });
          } catch (error) {
            if (error instanceof Error) {
              if (error.name === "AbortError" || error instanceof ApiCallError) {
                throw error;
              }
            }
            throw new ApiCallError({
              message: "Failed to process error response",
              cause: error,
              statusCode: response.status,
              url,
              requestBodyValues: body.values
            });
          }
        }
        try {
          return await successfulResponseHandler2({
            response,
            url,
            requestBodyValues: body.values
          });
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === "AbortError" || error instanceof ApiCallError) {
              throw error;
            }
          }
          throw new ApiCallError({
            message: "Failed to process successful response",
            cause: error,
            statusCode: response.status,
            url,
            requestBodyValues: body.values
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            throw error;
          }
        }
        if (error instanceof TypeError && error.message === "fetch failed") {
          const cause = error.cause;
          if (cause != null) {
            throw new ApiCallError({
              message: `Cannot connect to API: ${cause.message}`,
              cause,
              url,
              requestBodyValues: body.values,
              isRetryable: true
            });
          }
        }
        throw error;
      }
    };
    automatic1111ErrorDataSchema = z.object({
      error: z.string(),
      detail: z.string(),
      body: z.string(),
      errors: z.string()
    });
    failedAutomatic1111CallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(automatic1111ErrorDataSchema),
      errorToMessage: (error) => error.detail
    });
    Automatic1111Facade_exports = {};
    __export2(Automatic1111Facade_exports, {
      Api: () => Api,
      ImageGenerator: () => ImageGenerator
    });
    callWithRetryAndThrottle = async ({
      retry = retryNever(),
      throttle = throttleOff(),
      call
    }) => retry(async () => throttle(call));
    AbstractModel = class {
      settings;
      constructor({ settings }) {
        this.settings = settings;
      }
      get modelInformation() {
        return {
          provider: this.provider,
          modelName: this.modelName
        };
      }
    };
    Automatic1111ImageGenerationModel = class _Automatic1111ImageGenerationModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "Automatic1111";
      get modelName() {
        return this.settings.model;
      }
      async callAPI(input, callOptions) {
        const api = this.settings.api ?? new Automatic1111ApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/txt2img`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              prompt: input.prompt,
              negative_prompt: input.negativePrompt,
              seed: this.settings.seed,
              batch_size: this.settings.numberOfGenerations,
              height: this.settings.height,
              width: this.settings.width,
              cfg_scale: this.settings.cfgScale,
              sampler_index: this.settings.sampler,
              steps: this.settings.steps,
              override_settings: {
                sd_model_checkpoint: this.settings.model
              }
            },
            failedResponseHandler: failedAutomatic1111CallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(Automatic1111ImageGenerationResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          "height",
          "width",
          "sampler",
          "steps",
          "cfgScale",
          "seed"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateImages(prompt, options) {
        const rawResponse = await this.callAPI(prompt, options);
        return {
          rawResponse,
          base64Images: rawResponse.images
        };
      }
      withTextPrompt() {
        return this.withPromptTemplate(mapBasicPromptToAutomatic1111Format());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateImageGenerationModel({
          model: this,
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _Automatic1111ImageGenerationModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    Automatic1111ImageGenerationResponseSchema = z.object({
      images: z.array(z.string()),
      parameters: z.object({}),
      info: z.string()
    });
    LoadAPIKeyError = class extends Error {
      constructor({ message }) {
        super(message);
        this.name = "LoadAPIKeyError";
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message
        };
      }
    };
    CohereApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "COHERE_API_KEY",
              description: "Cohere"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.cohere.ai",
            port: "443",
            path: "/v1"
          }
        });
      }
    };
    cohereErrorDataSchema = z.object({
      message: z.string()
    });
    failedCohereCallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(cohereErrorDataSchema),
      errorToMessage: (error) => error.message
    });
    CohereFacade_exports = {};
    __export2(CohereFacade_exports, {
      Api: () => Api2,
      TextEmbedder: () => TextEmbedder,
      TextGenerator: () => TextGenerator,
      Tokenizer: () => Tokenizer
    });
    CohereTokenizer = class {
      settings;
      constructor(settings) {
        this.settings = settings;
      }
      async callTokenizeAPI(text13, callOptions) {
        const api = this.settings.api ?? new CohereApiConfiguration();
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/tokenize`),
            headers: api.headers({
              functionType: "tokenize",
              functionId: callOptions?.functionId,
              run: callOptions?.run,
              callId: ""
            }),
            body: {
              model: this.settings.model,
              text: text13
            },
            failedResponseHandler: failedCohereCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(cohereTokenizationResponseSchema)
            ),
            abortSignal
          })
        });
      }
      async callDeTokenizeAPI(tokens, callOptions) {
        const api = this.settings.api ?? new CohereApiConfiguration();
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/detokenize`),
            headers: api.headers({
              functionType: "detokenize",
              functionId: callOptions?.functionId,
              run: callOptions?.run,
              callId: ""
            }),
            body: {
              model: this.settings.model,
              tokens
            },
            failedResponseHandler: failedCohereCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(cohereDetokenizationResponseSchema)
            ),
            abortSignal
          })
        });
      }
      async tokenize(text13) {
        return (await this.tokenizeWithTexts(text13)).tokens;
      }
      async tokenizeWithTexts(text13) {
        const response = await this.callTokenizeAPI(text13);
        return {
          tokens: response.tokens,
          tokenTexts: response.token_strings
        };
      }
      async detokenize(tokens) {
        const response = await this.callDeTokenizeAPI(tokens);
        return response.text;
      }
    };
    cohereDetokenizationResponseSchema = z.object({
      text: z.string(),
      meta: z.object({
        api_version: z.object({
          version: z.string()
        })
      })
    });
    cohereTokenizationResponseSchema = z.object({
      tokens: z.array(z.number()),
      token_strings: z.array(z.string()),
      meta: z.object({
        api_version: z.object({
          version: z.string()
        })
      })
    });
    COHERE_TEXT_EMBEDDING_MODELS = {
      "embed-english-light-v2.0": {
        contextWindowSize: 512,
        dimensions: 1024
      },
      "embed-english-v2.0": {
        contextWindowSize: 512,
        dimensions: 4096
      },
      "embed-multilingual-v2.0": {
        contextWindowSize: 256,
        dimensions: 768
      },
      "embed-english-v3.0": {
        contextWindowSize: 512,
        dimensions: 1024
      },
      "embed-english-light-v3.0": {
        contextWindowSize: 512,
        dimensions: 384
      },
      "embed-multilingual-v3.0": {
        contextWindowSize: 512,
        dimensions: 1024
      },
      "embed-multilingual-light-v3.0": {
        contextWindowSize: 512,
        dimensions: 384
      }
    };
    CohereTextEmbeddingModel = class _CohereTextEmbeddingModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
        this.contextWindowSize = COHERE_TEXT_EMBEDDING_MODELS[this.modelName].contextWindowSize;
        this.tokenizer = new CohereTokenizer({
          api: this.settings.api,
          model: this.settings.model
        });
        this.dimensions = COHERE_TEXT_EMBEDDING_MODELS[this.modelName].dimensions;
      }
      provider = "cohere";
      get modelName() {
        return this.settings.model;
      }
      maxValuesPerCall = 96;
      isParallelizable = true;
      dimensions;
      contextWindowSize;
      tokenizer;
      async tokenize(text13) {
        return this.tokenizer.tokenize(text13);
      }
      async tokenizeWithTexts(text13) {
        return this.tokenizer.tokenizeWithTexts(text13);
      }
      async detokenize(tokens) {
        return this.tokenizer.detokenize(tokens);
      }
      async callAPI(texts, callOptions) {
        if (texts.length > this.maxValuesPerCall) {
          throw new Error(
            `The Cohere embedding API only supports ${this.maxValuesPerCall} texts per API call.`
          );
        }
        const api = this.settings.api ?? new CohereApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/embed`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              model: this.settings.model,
              texts,
              input_type: this.settings.inputType,
              truncate: this.settings.truncate
            },
            failedResponseHandler: failedCohereCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(cohereTextEmbeddingResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          truncate: this.settings.truncate
        };
      }
      async doEmbedValues(texts, options) {
        const rawResponse = await this.callAPI(texts, options);
        return {
          rawResponse,
          embeddings: rawResponse.embeddings
        };
      }
      withSettings(additionalSettings) {
        return new _CohereTextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    cohereTextEmbeddingResponseSchema = z.object({
      id: z.string(),
      texts: z.array(z.string()),
      embeddings: z.array(z.array(z.number())),
      meta: z.object({
        api_version: z.object({
          version: z.string()
        })
      })
    });
    createJsonStreamResponseHandler = (schema) => ({ response }) => parseJsonStreamAsAsyncIterable({
      stream: response.body,
      schema
    });
    COHERE_TEXT_GENERATION_MODELS = {
      command: {
        contextWindowSize: 4096
      },
      "command-light": {
        contextWindowSize: 4096
      }
    };
    CohereTextGenerationModel = class _CohereTextGenerationModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
        this.contextWindowSize = COHERE_TEXT_GENERATION_MODELS[this.settings.model].contextWindowSize;
        this.tokenizer = new CohereTokenizer({
          api: this.settings.api,
          model: this.settings.model
        });
      }
      provider = "cohere";
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize;
      tokenizer;
      async countPromptTokens(input) {
        return countTokens(this.tokenizer, input);
      }
      async callAPI(prompt, callOptions, options) {
        const api = this.settings.api ?? new CohereApiConfiguration();
        const responseFormat = options.responseFormat;
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/generate`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              stream: responseFormat.stream,
              model: this.settings.model,
              prompt,
              num_generations: this.settings.numberOfGenerations,
              max_tokens: this.settings.maxGenerationTokens,
              temperature: this.settings.temperature,
              k: this.settings.k,
              p: this.settings.p,
              frequency_penalty: this.settings.frequencyPenalty,
              presence_penalty: this.settings.presencePenalty,
              end_sequences: this.settings.stopSequences,
              stop_sequences: this.settings.cohereStopSequences,
              return_likelihoods: this.settings.returnLikelihoods,
              logit_bias: this.settings.logitBias,
              truncate: this.settings.truncate
            },
            failedResponseHandler: failedCohereCallResponseHandler,
            successfulResponseHandler: responseFormat.handler,
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "temperature",
          "k",
          "p",
          "frequencyPenalty",
          "presencePenalty",
          "returnLikelihoods",
          "logitBias",
          "truncate",
          "cohereStopSequences"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: CohereTextGenerationResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(cohereTextGenerationResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: rawResponse.generations.map((generation) => ({
            text: generation.text,
            finishReason: this.translateFinishReason(generation.finish_reason)
          }))
        };
      }
      translateFinishReason(finishReason) {
        switch (finishReason) {
          case "COMPLETE":
            return "stop";
          case "MAX_TOKENS":
            return "length";
          case "ERROR_TOXIC":
            return "content-filter";
          case "ERROR":
            return "error";
          default:
            return "unknown";
        }
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          responseFormat: CohereTextGenerationResponseFormat.deltaIterable
        });
      }
      extractTextDelta(delta) {
        const chunk = delta;
        return chunk.is_finished === true ? "" : chunk.text;
      }
      withJsonOutput() {
        return this;
      }
      withTextPrompt() {
        return this.withPromptTemplate(text7());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction7());
      }
      withChatPrompt(options) {
        return this.withPromptTemplate(chat7(options));
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _CohereTextGenerationModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    cohereTextGenerationResponseSchema = z.object({
      id: z.string(),
      generations: z.array(
        z.object({
          id: z.string(),
          text: z.string(),
          finish_reason: z.string().optional()
        })
      ),
      prompt: z.string(),
      meta: z.object({
        api_version: z.object({
          version: z.string()
        })
      }).optional()
    });
    cohereTextStreamChunkSchema = z.discriminatedUnion("is_finished", [
      z.object({
        text: z.string(),
        is_finished: z.literal(false)
      }),
      z.object({
        is_finished: z.literal(true),
        finish_reason: z.string(),
        response: cohereTextGenerationResponseSchema
      })
    ]);
    CohereTextGenerationResponseFormat = {
      json: {
        stream: false,
        handler: createJsonResponseHandler(
          zodSchema(cohereTextGenerationResponseSchema)
        )
      },
      deltaIterable: {
        stream: true,
        handler: createJsonStreamResponseHandler(
          zodSchema(cohereTextStreamChunkSchema)
        )
      }
    };
    ElevenLabsApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            "xi-api-key": loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "ELEVENLABS_API_KEY",
              description: "ElevenLabs"
            })
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.elevenlabs.io",
            port: "443",
            path: "/v1"
          }
        });
      }
      get apiKey() {
        return this.fixedHeadersValue["xi-api-key"];
      }
    };
    ElevenLabsFacade_exports = {};
    __export2(ElevenLabsFacade_exports, {
      Api: () => Api3,
      SpeechGenerator: () => SpeechGenerator
    });
    defaultModel = "eleven_monolingual_v1";
    ElevenLabsSpeechModel = class _ElevenLabsSpeechModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "elevenlabs";
      get modelName() {
        return this.settings.voice;
      }
      async callAPI(text13, callOptions) {
        const api = this.settings.api ?? new ElevenLabsApiConfiguration();
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(
              `/text-to-speech/${this.settings.voice}${assembleQuery({
                optimize_streaming_latency: this.settings.optimizeStreamingLatency,
                output_format: this.settings.outputFormat
              })}`
            ),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              text: text13,
              model_id: this.settings.model ?? defaultModel,
              voice_settings: toApiVoiceSettings(this.settings.voiceSettings)
            },
            failedResponseHandler: createTextErrorResponseHandler(),
            successfulResponseHandler: createAudioMpegResponseHandler(),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          model: this.settings.model,
          voice: this.settings.voice,
          voiceSettings: this.settings.voiceSettings
        };
      }
      doGenerateSpeechStandard(text13, options) {
        return this.callAPI(text13, options);
      }
      async doGenerateSpeechStreamDuplex(textStream) {
        const queue = new AsyncQueue();
        const model = this.settings.model ?? defaultModel;
        const socket = await createSimpleWebSocket(
          `wss://api.elevenlabs.io/v1/text-to-speech/${this.settings.voice}/stream-input${assembleQuery({
            model_id: model,
            optimize_streaming_latency: this.settings.optimizeStreamingLatency,
            output_format: this.settings.outputFormat
          })}`
        );
        socket.onopen = async () => {
          const api = this.settings.api ?? new ElevenLabsApiConfiguration();
          socket.send(
            JSON.stringify({
              xi_api_key: api.apiKey,
              text: " ",
              voice_settings: toApiVoiceSettings(this.settings.voiceSettings),
              generation_config: toGenerationConfig(this.settings.generationConfig)
            })
          );
          let textBuffer = "";
          for await (const textDelta of textStream) {
            textBuffer += textDelta;
            const separator = textBuffer.lastIndexOf(". ");
            if (separator === -1) {
              continue;
            }
            const textToProcess = textBuffer.slice(0, separator);
            textBuffer = textBuffer.slice(separator + 1);
            socket.send(
              JSON.stringify({
                text: textToProcess,
                try_trigger_generation: true
              })
            );
          }
          if (textBuffer.length > 0) {
            socket.send(
              JSON.stringify({
                text: `${textBuffer} `,
                try_trigger_generation: true
              })
            );
          }
          socket.send(JSON.stringify({ text: "" }));
        };
        socket.onmessage = (event) => {
          const parseResult = safeParseJSON({
            text: event.data,
            schema: zodSchema(streamingResponseSchema)
          });
          if (!parseResult.success) {
            queue.push({ type: "error", error: parseResult.error });
            return;
          }
          const response = parseResult.value;
          if ("error" in response) {
            queue.push({ type: "error", error: response });
            return;
          }
          if (!response.isFinal) {
            queue.push({
              type: "delta",
              deltaValue: base64ToUint8Array(response.audio)
            });
          }
        };
        socket.onerror = (error) => {
          queue.push({ type: "error", error });
        };
        socket.onclose = () => {
          queue.close();
        };
        return queue;
      }
      withSettings(additionalSettings) {
        return new _ElevenLabsSpeechModel({
          ...this.settings,
          ...additionalSettings
        });
      }
    };
    streamingResponseSchema = z.union([
      z.object({
        audio: z.string(),
        isFinal: z.literal(false).nullable(),
        normalizedAlignment: z.object({
          chars: z.array(z.string()),
          charStartTimesMs: z.array(z.number()),
          charDurationsMs: z.array(z.number())
        }).nullable()
      }),
      z.object({
        isFinal: z.literal(true)
      }),
      z.object({
        message: z.string(),
        error: z.string(),
        code: z.number()
      })
    ]);
    HuggingFaceApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "HUGGINGFACE_API_KEY",
              description: "Hugging Face"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api-inference.huggingface.co",
            port: "443",
            path: "/models"
          }
        });
      }
    };
    huggingFaceErrorDataSchema = z.object({
      error: z.array(z.string()).or(z.string())
    });
    failedHuggingFaceCallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(huggingFaceErrorDataSchema),
      errorToMessage: (data) => typeof data.error === "string" ? data.error : data.error.join("\n\n")
    });
    HuggingFaceFacade_exports = {};
    __export2(HuggingFaceFacade_exports, {
      Api: () => Api4,
      TextEmbedder: () => TextEmbedder2,
      TextGenerator: () => TextGenerator2
    });
    HuggingFaceTextEmbeddingModel = class _HuggingFaceTextEmbeddingModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
        this.maxValuesPerCall = settings.maxValuesPerCall ?? 1024;
        this.dimensions = settings.dimensions;
      }
      provider = "huggingface";
      get modelName() {
        return this.settings.model;
      }
      maxValuesPerCall;
      isParallelizable = true;
      contextWindowSize = void 0;
      dimensions;
      tokenizer = void 0;
      async callAPI(texts, callOptions) {
        if (texts.length > this.maxValuesPerCall) {
          throw new Error(
            `The HuggingFace feature extraction API is configured to only support ${this.maxValuesPerCall} texts per API call.`
          );
        }
        const api = this.settings.api ?? new HuggingFaceApiConfiguration();
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/${this.settings.model}`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              inputs: texts,
              options: {
                use_cache: this.settings.options?.useCache ?? true,
                wait_for_model: this.settings.options?.waitForModel ?? true
              }
            },
            failedResponseHandler: failedHuggingFaceCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(huggingFaceTextEmbeddingResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          dimensions: this.settings.dimensions,
          options: this.settings.options
        };
      }
      countPromptTokens = void 0;
      async doEmbedValues(texts, options) {
        const rawResponse = await this.callAPI(texts, options);
        return {
          rawResponse,
          embeddings: rawResponse
        };
      }
      withSettings(additionalSettings) {
        return new _HuggingFaceTextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    huggingFaceTextEmbeddingResponseSchema = z.array(z.array(z.number()));
    HuggingFaceTextGenerationModel = class _HuggingFaceTextGenerationModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "huggingface";
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize = void 0;
      tokenizer = void 0;
      countPromptTokens = void 0;
      async callAPI(prompt, callOptions) {
        const api = this.settings.api ?? new HuggingFaceApiConfiguration();
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/${this.settings.model}`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              inputs: prompt,
              top_k: this.settings.topK,
              top_p: this.settings.topP,
              temperature: this.settings.temperature,
              repetition_penalty: this.settings.repetitionPenalty,
              max_new_tokens: this.settings.maxGenerationTokens,
              max_time: this.settings.maxTime,
              num_return_sequences: this.settings.numberOfGenerations,
              do_sample: this.settings.doSample,
              options: {
                use_cache: true,
                wait_for_model: true
              }
            },
            failedResponseHandler: failedHuggingFaceCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(huggingFaceTextGenerationResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "topK",
          "topP",
          "temperature",
          "repetitionPenalty",
          "maxTime",
          "doSample"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options)
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(huggingFaceTextGenerationResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: rawResponse.map((response) => ({
            text: response.generated_text,
            finishReason: "unknown"
          }))
        };
      }
      withJsonOutput() {
        return this;
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextGenerationModel({
          model: this,
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _HuggingFaceTextGenerationModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    huggingFaceTextGenerationResponseSchema = z.array(
      z.object({
        generated_text: z.string()
      })
    );
    LlamaCppApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          baseUrlDefaults: {
            protocol: "http",
            host: "127.0.0.1",
            port: "8080",
            path: ""
          }
        });
      }
    };
    EventSourceParserStream = class extends TransformStream {
      constructor() {
        let parser;
        super({
          start(controller) {
            parser = createParser((event) => {
              if (event.type === "event") {
                controller.enqueue(event);
              }
            });
          },
          transform(chunk) {
            parser.feed(chunk);
          }
        });
      }
    };
    llamaCppErrorDataSchema = z.object({
      error: z.string()
    });
    failedLlamaCppCallResponseHandler = createJsonErrorResponseHandler(
      {
        errorSchema: zodSchema(llamaCppErrorDataSchema),
        errorToMessage: (error) => error.error
      }
    );
    LlamaCppPrompt_exports = {};
    __export2(LlamaCppPrompt_exports, {
      Alpaca: () => Alpaca,
      BakLLaVA1: () => BakLLaVA1,
      ChatML: () => ChatML,
      Llama2: () => Llama2,
      Mistral: () => Mistral,
      NeuralChat: () => NeuralChat,
      Synthia: () => Synthia,
      Text: () => Text,
      Vicuna: () => Vicuna,
      asLlamaCppPromptTemplate: () => asLlamaCppPromptTemplate,
      asLlamaCppTextPromptTemplateProvider: () => asLlamaCppTextPromptTemplateProvider
    });
    LlamaCppBakLLaVA1PromptTemplate_exports = {};
    __export2(LlamaCppBakLLaVA1PromptTemplate_exports, {
      chat: () => chat9,
      instruction: () => instruction9,
      text: () => text9
    });
    DEFAULT_SYSTEM_MESSAGE2 = "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.";
    Text = asLlamaCppTextPromptTemplateProvider(TextPromptTemplate_exports);
    Mistral = asLlamaCppTextPromptTemplateProvider(MistralInstructPromptTemplate_exports);
    ChatML = asLlamaCppTextPromptTemplateProvider(ChatMLPromptTemplate_exports);
    Llama2 = asLlamaCppTextPromptTemplateProvider(Llama2PromptTemplate_exports);
    NeuralChat = asLlamaCppTextPromptTemplateProvider(NeuralChatPromptTemplate_exports);
    Alpaca = asLlamaCppTextPromptTemplateProvider(AlpacaPromptTemplate_exports);
    Synthia = asLlamaCppTextPromptTemplateProvider(SynthiaPromptTemplate_exports);
    Vicuna = asLlamaCppTextPromptTemplateProvider(VicunaPromptTemplate_exports);
    BakLLaVA1 = LlamaCppBakLLaVA1PromptTemplate_exports;
    LlamaCppTokenizer = class {
      api;
      constructor(api = new LlamaCppApiConfiguration()) {
        this.api = api;
      }
      async callTokenizeAPI(text13, callOptions) {
        const api = this.api;
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/tokenize`),
            headers: api.headers({
              functionType: "tokenize",
              functionId: callOptions?.functionId,
              run: callOptions?.run,
              callId: ""
            }),
            body: {
              content: text13
            },
            failedResponseHandler: failedLlamaCppCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(llamaCppTokenizationResponseSchema)
            ),
            abortSignal
          })
        });
      }
      async tokenize(text13) {
        const response = await this.callTokenizeAPI(text13);
        return response.tokens;
      }
    };
    llamaCppTokenizationResponseSchema = z.object({
      tokens: z.array(z.number())
    });
    SPACE_RULE = '" "?';
    PRIMITIVE_RULES = {
      boolean: '("true" | "false") space',
      number: '("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? space',
      integer: '("-"? ([0-9] | [1-9] [0-9]*)) space',
      string: ` "\\"" ( [^"\\\\] | "\\\\" (["\\\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) )* "\\"" space`,
      null: '"null" space'
    };
    RuleMap = class {
      rules = /* @__PURE__ */ new Map();
      add(name, rule) {
        const escapedName = this.escapeRuleName(name, rule);
        this.rules.set(escapedName, rule);
        return escapedName;
      }
      escapeRuleName(name, rule) {
        const baseName = name.replace(/[^\dA-Za-z-]+/g, "-");
        if (!this.rules.has(baseName) || this.rules.get(baseName) === rule) {
          return baseName;
        }
        let i = 0;
        while (this.rules.has(`${baseName}${i}`)) {
          if (this.rules.get(`${baseName}${i}`) === rule) {
            return `${baseName}${i}`;
          }
          i++;
        }
        return `${baseName}${i}`;
      }
      toGBNF() {
        return Array.from(this.rules).map(([name, rule]) => `${name} ::= ${rule}`).join("\n");
      }
    };
    GRAMMAR_LITERAL_ESCAPES = {
      "\r": "\\r",
      "\n": "\\n",
      '"': '\\"'
    };
    LlamaCppCompletionModel = class _LlamaCppCompletionModel extends AbstractModel {
      constructor(settings = {}) {
        super({ settings });
        this.tokenizer = new LlamaCppTokenizer(this.settings.api);
      }
      provider = "llamacpp";
      get modelName() {
        return null;
      }
      get contextWindowSize() {
        return this.settings.contextWindowSize;
      }
      tokenizer;
      async callAPI(prompt, callOptions, options) {
        const api = this.settings.api ?? new LlamaCppApiConfiguration();
        const responseFormat = options.responseFormat;
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/completion`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              stream: responseFormat.stream,
              prompt: prompt.text,
              image_data: prompt.images != null ? Object.entries(prompt.images).map(([id, data]) => ({
                id: +id,
                data
              })) : void 0,
              temperature: this.settings.temperature,
              top_k: this.settings.topK,
              top_p: this.settings.topP,
              min_p: this.settings.minP,
              n_predict: this.settings.maxGenerationTokens,
              n_keep: this.settings.nKeep,
              stop: this.settings.stopSequences,
              tfs_z: this.settings.tfsZ,
              typical_p: this.settings.typicalP,
              repeat_penalty: this.settings.repeatPenalty,
              repeat_last_n: this.settings.repeatLastN,
              penalize_nl: this.settings.penalizeNl,
              presence_penalty: this.settings.presencePenalty,
              frequency_penalty: this.settings.frequencyPenalty,
              penalty_prompt: this.settings.penaltyPrompt,
              mirostat: this.settings.mirostat,
              mirostat_tau: this.settings.mirostatTau,
              mirostat_eta: this.settings.mirostatEta,
              grammar: this.settings.grammar,
              seed: this.settings.seed,
              ignore_eos: this.settings.ignoreEos,
              logit_bias: this.settings.logitBias,
              n_probs: this.settings.nProbs,
              cache_prompt: this.settings.cachePrompt,
              slot_id: this.settings.slotId
            },
            failedResponseHandler: failedLlamaCppCallResponseHandler,
            successfulResponseHandler: responseFormat.handler,
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "contextWindowSize",
          "temperature",
          "topK",
          "topP",
          "minP",
          "nKeep",
          "tfsZ",
          "typicalP",
          "repeatPenalty",
          "repeatLastN",
          "penalizeNl",
          "presencePenalty",
          "frequencyPenalty",
          "penaltyPrompt",
          "mirostat",
          "mirostatTau",
          "mirostatEta",
          "grammar",
          "seed",
          "ignoreEos",
          "logitBias",
          "nProbs",
          "cachePrompt",
          "slotId"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async countPromptTokens(prompt) {
        const tokens = await this.tokenizer.tokenize(prompt.text);
        return tokens.length;
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: LlamaCppCompletionResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(llamaCppTextGenerationResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: [
            {
              text: rawResponse.content,
              finishReason: rawResponse.stopped_eos || rawResponse.stopped_word ? "stop" : rawResponse.stopped_limit ? "length" : "unknown"
            }
          ],
          usage: {
            promptTokens: rawResponse.tokens_evaluated,
            completionTokens: rawResponse.tokens_predicted,
            totalTokens: rawResponse.tokens_evaluated + rawResponse.tokens_predicted
          }
        };
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          responseFormat: LlamaCppCompletionResponseFormat.deltaIterable
        });
      }
      extractTextDelta(delta) {
        return delta.content;
      }
      asObjectGenerationModel(promptTemplate) {
        return "adaptModel" in promptTemplate ? new ObjectFromTextStreamingModel({
          model: promptTemplate.adaptModel(this),
          template: promptTemplate
        }) : new ObjectFromTextStreamingModel({
          model: this,
          template: promptTemplate
        });
      }
      withJsonOutput(schema) {
        if (this.settings.grammar != null) {
          return this;
        }
        const grammar = convertJsonSchemaToGBNF(schema.getJsonSchema());
        return this.withSettings({
          grammar
        });
      }
      get promptTemplateProvider() {
        return this.settings.promptTemplate ?? Text;
      }
      withTextPrompt() {
        return this.withPromptTemplate(this.promptTemplateProvider.text());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(this.promptTemplateProvider.instruction());
      }
      withChatPrompt() {
        return this.withPromptTemplate(this.promptTemplateProvider.chat());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _LlamaCppCompletionModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    llamaCppTextGenerationResponseSchema = z.object({
      content: z.string(),
      stop: z.literal(true),
      generation_settings: z.object({
        frequency_penalty: z.number(),
        ignore_eos: z.boolean(),
        logit_bias: z.array(z.number()),
        mirostat: z.number(),
        mirostat_eta: z.number(),
        mirostat_tau: z.number(),
        model: z.string(),
        n_ctx: z.number(),
        n_keep: z.number(),
        n_predict: z.number(),
        n_probs: z.number(),
        penalize_nl: z.boolean(),
        presence_penalty: z.number(),
        repeat_last_n: z.number(),
        repeat_penalty: z.number(),
        seed: z.number(),
        stop: z.array(z.string()),
        stream: z.boolean(),
        temperature: z.number().optional(),
        tfs_z: z.number(),
        top_k: z.number(),
        top_p: z.number(),
        typical_p: z.number()
      }),
      model: z.string(),
      prompt: z.string(),
      stopped_eos: z.boolean(),
      stopped_limit: z.boolean(),
      stopped_word: z.boolean(),
      stopping_word: z.string(),
      timings: z.object({
        predicted_ms: z.number(),
        predicted_n: z.number(),
        predicted_per_second: z.number().nullable(),
        predicted_per_token_ms: z.number().nullable(),
        prompt_ms: z.number().nullable().optional(),
        prompt_n: z.number(),
        prompt_per_second: z.number().nullable(),
        prompt_per_token_ms: z.number().nullable()
      }),
      tokens_cached: z.number(),
      tokens_evaluated: z.number(),
      tokens_predicted: z.number(),
      truncated: z.boolean()
    });
    llamaCppTextStreamChunkSchema = z.discriminatedUnion("stop", [
      z.object({
        content: z.string(),
        stop: z.literal(false)
      }),
      llamaCppTextGenerationResponseSchema
    ]);
    LlamaCppCompletionResponseFormat = {
      json: {
        stream: false,
        handler: createJsonResponseHandler(
          zodSchema(llamaCppTextGenerationResponseSchema)
        )
      },
      deltaIterable: {
        stream: true,
        handler: async ({ response }) => createLlamaCppFullDeltaIterableQueue(response.body)
      }
    };
    LlamaCppFacade_exports = {};
    __export2(LlamaCppFacade_exports, {
      Api: () => Api5,
      CompletionTextGenerator: () => CompletionTextGenerator,
      TextEmbedder: () => TextEmbedder3,
      Tokenizer: () => Tokenizer2,
      grammar: () => LlamaCppGrammars_exports,
      prompt: () => LlamaCppPrompt_exports
    });
    LlamaCppTextEmbeddingModel = class _LlamaCppTextEmbeddingModel extends AbstractModel {
      constructor(settings = {}) {
        super({ settings });
        this.tokenizer = new LlamaCppTokenizer(this.settings.api);
      }
      provider = "llamacpp";
      get modelName() {
        return null;
      }
      maxValuesPerCall = 1;
      get isParallelizable() {
        return this.settings.isParallelizable ?? false;
      }
      contextWindowSize = void 0;
      get dimensions() {
        return this.settings.dimensions;
      }
      tokenizer;
      async tokenize(text13) {
        return this.tokenizer.tokenize(text13);
      }
      async callAPI(texts, callOptions) {
        if (texts.length > this.maxValuesPerCall) {
          throw new Error(
            `The Llama.cpp embedding API only supports ${this.maxValuesPerCall} texts per API call.`
          );
        }
        const api = this.settings.api ?? new LlamaCppApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: this.settings.api?.retry,
          throttle: this.settings.api?.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/embedding`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: { content: texts[0] },
            failedResponseHandler: failedLlamaCppCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(llamaCppTextEmbeddingResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          dimensions: this.settings.dimensions
        };
      }
      async doEmbedValues(texts, options) {
        const rawResponse = await this.callAPI(texts, options);
        return {
          rawResponse,
          embeddings: [rawResponse.embedding]
        };
      }
      withSettings(additionalSettings) {
        return new _LlamaCppTextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    llamaCppTextEmbeddingResponseSchema = z.object({
      embedding: z.array(z.number())
    });
    LlamaCppGrammars_exports = {};
    __export2(LlamaCppGrammars_exports, {
      fromJsonSchema: () => convertJsonSchemaToGBNF,
      json: () => json,
      jsonArray: () => jsonArray,
      list: () => list
    });
    json = `
root   ::= object
value  ::= object | array | string | number | ("true" | "false" | "null") ws

object ::=
  "{" ws (
            string ":" ws value
    ("," ws string ":" ws value)*
  )? "}" ws

array  ::=
  "[" ws (
            value
    ("," ws value)*
  )? "]" ws

string ::=
  "\\"" (
    [^"\\\\] |
    "\\\\" (["\\\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) # escapes
  )* "\\"" ws

number ::= ("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? ws

# Optional space: by convention, applied in this grammar after literal chars when allowed
ws ::= ([ 	
] ws)?
`;
    jsonArray = `
root   ::= arr
value  ::= object | array | string | number | ("true" | "false" | "null") ws

arr  ::=
  "[
" ws (
            value
    (",
" ws value)*
  )? "]"

object ::=
  "{" ws (
            string ":" ws value
    ("," ws string ":" ws value)*
  )? "}" ws

array  ::=
  "[" ws (
            value
    ("," ws value)*
  )? "]" ws

string ::=
  "\\"" (
    [^"\\\\] |
    "\\\\" (["\\\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) # escapes
  )* "\\"" ws

number ::= ("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? ws

# Optional space: by convention, applied in this grammar after literal chars when allowed
ws ::= ([ 	
] ws)?
`;
    list = `
root ::= item+

# Excludes various line break characters
item ::= "- " [^\r
\v\f\x85\u2028\u2029]+ "
"
`;
    LmntApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            "X-API-Key": loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "LMNT_API_KEY",
              description: "LMNT"
            })
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.lmnt.com",
            port: "443",
            path: "/v1"
          }
        });
      }
    };
    LmntFacade_exports = {};
    __export2(LmntFacade_exports, {
      Api: () => Api6,
      SpeechGenerator: () => SpeechGenerator2
    });
    LmntSpeechModel = class _LmntSpeechModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "lmnt";
      get modelName() {
        return this.settings.voice;
      }
      async callAPI(text13, callOptions) {
        const api = this.settings.api ?? new LmntApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => {
            const formData = new FormData();
            formData.append("text", text13);
            formData.append("voice", this.settings.voice);
            formData.append("format", "mp3");
            formData.append("return_durations", "true");
            if (this.settings.speed != null) {
              formData.append("speed", this.settings.speed.toString());
            }
            if (this.settings.seed != null) {
              formData.append("seed", this.settings.seed.toString());
            }
            if (this.settings.length != null) {
              formData.append("length", this.settings.length.toString());
            }
            return postToApi({
              url: api.assembleUrl(`/ai/speech`),
              headers: api.headers({
                functionType: callOptions.functionType,
                functionId: callOptions.functionId,
                run: callOptions.run,
                callId: callOptions.callId
              }),
              body: {
                content: formData,
                values: {
                  text: text13,
                  voice: this.settings.voice,
                  speed: this.settings.speed,
                  seed: this.settings.seed,
                  length: this.settings.length
                }
              },
              failedResponseHandler: createTextErrorResponseHandler(),
              successfulResponseHandler: createJsonResponseHandler(
                zodSchema(lmntSpeechResponseSchema)
              ),
              abortSignal
            });
          }
        });
      }
      get settingsForEvent() {
        return {
          voice: this.settings.voice,
          speed: this.settings.speed,
          seed: this.settings.seed,
          length: this.settings.length
        };
      }
      async doGenerateSpeechStandard(text13, options) {
        const response = await this.callAPI(text13, options);
        return base64ToUint8Array(response.audio);
      }
      withSettings(additionalSettings) {
        return new _LmntSpeechModel({
          ...this.settings,
          ...additionalSettings
        });
      }
    };
    lmntSpeechResponseSchema = z.object({
      audio: z.string(),
      durations: z.array(
        z.object({
          duration: z.number(),
          start: z.number(),
          text: z.string()
        })
      ),
      seed: z.number()
    });
    MistralApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "MISTRAL_API_KEY",
              description: "Mistral"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.mistral.ai",
            port: "443",
            path: "/v1"
          }
        });
      }
    };
    createEventSourceResponseHandler = (schema) => ({ response }) => parseEventSourceStreamAsAsyncIterable({
      stream: response.body,
      schema
    });
    mistralErrorDataSchema = z.object({
      object: z.literal("error"),
      message: z.string(),
      type: z.string(),
      param: z.string().nullable(),
      code: z.string()
    });
    failedMistralCallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(mistralErrorDataSchema),
      errorToMessage: (error) => error.message
    });
    MistralChatModel = class _MistralChatModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "mistral";
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize = void 0;
      tokenizer = void 0;
      countPromptTokens = void 0;
      async callAPI(prompt, callOptions, options) {
        const api = this.settings.api ?? new MistralApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        const stream = options.responseFormat.stream;
        const successfulResponseHandler2 = options.responseFormat.handler;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/chat/completions`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              stream,
              messages: prompt,
              model: this.settings.model,
              temperature: this.settings.temperature,
              top_p: this.settings.topP,
              max_tokens: this.settings.maxGenerationTokens,
              safe_mode: this.settings.safeMode,
              random_seed: this.settings.randomSeed
            },
            failedResponseHandler: failedMistralCallResponseHandler,
            successfulResponseHandler: successfulResponseHandler2,
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "temperature",
          "topP",
          "safeMode",
          "randomSeed"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: MistralChatResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(mistralChatResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: rawResponse.choices.map((choice) => ({
            text: choice.message.content,
            finishReason: this.translateFinishReason(choice.finish_reason)
          }))
        };
      }
      translateFinishReason(finishReason) {
        switch (finishReason) {
          case "stop":
            return "stop";
          case "length":
          case "model_length":
            return "length";
          default:
            return "unknown";
        }
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          responseFormat: MistralChatResponseFormat.textDeltaIterable
        });
      }
      extractTextDelta(delta) {
        const chunk = delta;
        return chunk.choices[0].delta.content ?? void 0;
      }
      withTextPrompt() {
        return this.withPromptTemplate(text10());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction10());
      }
      withChatPrompt() {
        return this.withPromptTemplate(chat10());
      }
      withJsonOutput() {
        return this;
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this,
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _MistralChatModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    mistralChatResponseSchema = z.object({
      id: z.string(),
      object: z.string(),
      created: z.number(),
      model: z.string(),
      choices: z.array(
        z.object({
          index: z.number(),
          message: z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string()
          }),
          finish_reason: z.enum(["stop", "length", "model_length"])
        })
      ),
      usage: z.object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number()
      })
    });
    mistralChatStreamChunkSchema = z.object({
      id: z.string(),
      object: z.string().optional(),
      created: z.number().optional(),
      model: z.string(),
      choices: z.array(
        z.object({
          index: z.number(),
          delta: z.object({
            role: z.enum(["assistant", "user"]).optional().nullable(),
            content: z.string().nullable().optional()
          }),
          finish_reason: z.enum(["stop", "length", "model_length"]).nullable().optional()
        })
      )
    });
    MistralChatResponseFormat = {
      json: {
        stream: false,
        handler: createJsonResponseHandler(zodSchema(mistralChatResponseSchema))
      },
      textDeltaIterable: {
        stream: true,
        handler: createEventSourceResponseHandler(
          zodSchema(mistralChatStreamChunkSchema)
        )
      }
    };
    MistralFacade_exports = {};
    __export2(MistralFacade_exports, {
      Api: () => Api7,
      ChatTextGenerator: () => ChatTextGenerator,
      TextEmbedder: () => TextEmbedder4
    });
    MistralTextEmbeddingModel = class _MistralTextEmbeddingModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "mistral";
      get modelName() {
        return this.settings.model;
      }
      maxValuesPerCall = 32;
      isParallelizable = false;
      dimensions = 1024;
      async callAPI(texts, callOptions) {
        if (texts.length > this.maxValuesPerCall) {
          throw new Error(
            `The Mistral embedding API only supports ${this.maxValuesPerCall} texts per API call.`
          );
        }
        const api = this.settings.api ?? new MistralApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        const model = this.settings.model;
        const encodingFormat = this.settings.encodingFormat ?? "float";
        return callWithRetryAndThrottle({
          retry: this.settings.api?.retry,
          throttle: this.settings.api?.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/embeddings`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              model,
              input: texts,
              encoding_format: encodingFormat
            },
            failedResponseHandler: failedMistralCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(MistralTextEmbeddingResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          encodingFormat: this.settings.encodingFormat
        };
      }
      async doEmbedValues(texts, options) {
        const rawResponse = await this.callAPI(texts, options);
        return {
          rawResponse,
          embeddings: rawResponse.data.map((entry) => entry.embedding)
        };
      }
      withSettings(additionalSettings) {
        return new _MistralTextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    MistralTextEmbeddingResponseSchema = z.object({
      id: z.string(),
      object: z.string(),
      data: z.array(
        z.object({
          object: z.string(),
          embedding: z.array(z.number()),
          index: z.number()
        })
      ),
      model: z.string(),
      usage: z.object({
        prompt_tokens: z.number(),
        total_tokens: z.number()
      })
    });
    OllamaApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          baseUrlDefaults: {
            protocol: "http",
            host: "127.0.0.1",
            port: "11434",
            path: ""
          }
        });
      }
    };
    ollamaErrorDataSchema = z.object({
      error: z.string()
    });
    failedOllamaCallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(ollamaErrorDataSchema),
      errorToMessage: (error) => error.error
    });
    OllamaChatModel = class _OllamaChatModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "ollama";
      get modelName() {
        return this.settings.model;
      }
      tokenizer = void 0;
      countPromptTokens = void 0;
      contextWindowSize = void 0;
      async callAPI(prompt, callOptions, options) {
        const { responseFormat } = options;
        const api = this.settings.api ?? new OllamaApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/api/chat`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              stream: responseFormat.stream,
              model: this.settings.model,
              messages: prompt,
              format: this.settings.format,
              options: {
                mirostat: this.settings.mirostat,
                mirostat_eta: this.settings.mirostatEta,
                mirostat_tau: this.settings.mirostatTau,
                num_gpu: this.settings.numGpu,
                num_gqa: this.settings.numGqa,
                num_predict: this.settings.maxGenerationTokens,
                num_threads: this.settings.numThreads,
                repeat_last_n: this.settings.repeatLastN,
                repeat_penalty: this.settings.repeatPenalty,
                seed: this.settings.seed,
                stop: this.settings.stopSequences,
                temperature: this.settings.temperature,
                tfs_z: this.settings.tfsZ,
                top_k: this.settings.topK,
                top_p: this.settings.topP
              },
              template: this.settings.template
            },
            failedResponseHandler: failedOllamaCallResponseHandler,
            successfulResponseHandler: responseFormat.handler,
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "temperature",
          "mirostat",
          "mirostatEta",
          "mirostatTau",
          "numGqa",
          "numGpu",
          "numThreads",
          "repeatLastN",
          "repeatPenalty",
          "seed",
          "tfsZ",
          "topK",
          "topP",
          "template",
          "format"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: OllamaChatResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(ollamaChatResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: [
            {
              text: rawResponse.message.content,
              finishReason: "unknown"
            }
          ]
        };
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          responseFormat: OllamaChatResponseFormat.deltaIterable
        });
      }
      extractTextDelta(delta) {
        const chunk = delta;
        return chunk.done === true ? void 0 : chunk.message.content;
      }
      asToolCallGenerationModel(promptTemplate) {
        return new TextGenerationToolCallModel({
          model: this,
          template: promptTemplate
        });
      }
      asToolCallsOrTextGenerationModel(promptTemplate) {
        return new TextGenerationToolCallsModel({
          model: this,
          template: promptTemplate
        });
      }
      asObjectGenerationModel(promptTemplate) {
        return "adaptModel" in promptTemplate ? new ObjectFromTextStreamingModel({
          model: promptTemplate.adaptModel(this),
          template: promptTemplate
        }) : new ObjectFromTextStreamingModel({
          model: this,
          template: promptTemplate
        });
      }
      withTextPrompt() {
        return this.withPromptTemplate(text11());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction11());
      }
      withChatPrompt() {
        return this.withPromptTemplate(chat11());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withJsonOutput() {
        return this.withSettings({ format: "json" });
      }
      withSettings(additionalSettings) {
        return new _OllamaChatModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    ollamaChatResponseSchema = z.object({
      model: z.string(),
      created_at: z.string(),
      done: z.literal(true),
      message: z.object({
        role: z.string(),
        content: z.string()
      }),
      total_duration: z.number(),
      load_duration: z.number().optional(),
      prompt_eval_count: z.number().optional(),
      prompt_eval_duration: z.number().optional(),
      eval_count: z.number(),
      eval_duration: z.number()
    });
    ollamaChatStreamChunkSchema = z.discriminatedUnion("done", [
      z.object({
        done: z.literal(false),
        model: z.string(),
        created_at: z.string(),
        message: z.object({
          role: z.string(),
          content: z.string()
        })
      }),
      z.object({
        done: z.literal(true),
        model: z.string(),
        created_at: z.string(),
        total_duration: z.number(),
        load_duration: z.number().optional(),
        prompt_eval_count: z.number().optional(),
        prompt_eval_duration: z.number().optional(),
        eval_count: z.number(),
        eval_duration: z.number()
      })
    ]);
    OllamaChatResponseFormat = {
      json: {
        stream: false,
        handler: async ({ response, url, requestBodyValues }) => {
          const responseBody = await response.text();
          const parsedResult = safeParseJSON({
            text: responseBody,
            schema: zodSchema(
              z.union([
                ollamaChatResponseSchema,
                z.object({
                  done: z.literal(false),
                  model: z.string(),
                  created_at: z.string()
                })
              ])
            )
          });
          if (!parsedResult.success) {
            throw new ApiCallError({
              message: "Invalid JSON response",
              cause: parsedResult.error,
              statusCode: response.status,
              responseBody,
              url,
              requestBodyValues
            });
          }
          if (parsedResult.value.done === false) {
            throw new ApiCallError({
              message: "Incomplete Ollama response received",
              statusCode: response.status,
              responseBody,
              url,
              requestBodyValues,
              isRetryable: true
            });
          }
          return parsedResult.value;
        }
      },
      deltaIterable: {
        stream: true,
        handler: createJsonStreamResponseHandler(
          zodSchema(ollamaChatStreamChunkSchema)
        )
      }
    };
    OllamaCompletionPrompt_exports = {};
    __export2(OllamaCompletionPrompt_exports, {
      Alpaca: () => Alpaca2,
      ChatML: () => ChatML2,
      Llama2: () => Llama22,
      Mistral: () => Mistral2,
      NeuralChat: () => NeuralChat2,
      Synthia: () => Synthia2,
      Text: () => Text2,
      Vicuna: () => Vicuna2,
      asOllamaCompletionPromptTemplate: () => asOllamaCompletionPromptTemplate,
      asOllamaCompletionTextPromptTemplateProvider: () => asOllamaCompletionTextPromptTemplateProvider
    });
    Text2 = asOllamaCompletionTextPromptTemplateProvider(TextPromptTemplate_exports);
    Mistral2 = asOllamaCompletionTextPromptTemplateProvider(MistralInstructPromptTemplate_exports);
    ChatML2 = asOllamaCompletionTextPromptTemplateProvider(ChatMLPromptTemplate_exports);
    Llama22 = asOllamaCompletionTextPromptTemplateProvider(Llama2PromptTemplate_exports);
    NeuralChat2 = asOllamaCompletionTextPromptTemplateProvider(NeuralChatPromptTemplate_exports);
    Alpaca2 = asOllamaCompletionTextPromptTemplateProvider(AlpacaPromptTemplate_exports);
    Synthia2 = asOllamaCompletionTextPromptTemplateProvider(SynthiaPromptTemplate_exports);
    Vicuna2 = asOllamaCompletionTextPromptTemplateProvider(VicunaPromptTemplate_exports);
    OllamaCompletionModel = class _OllamaCompletionModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "ollama";
      get modelName() {
        return this.settings.model;
      }
      tokenizer = void 0;
      countPromptTokens = void 0;
      get contextWindowSize() {
        return this.settings.contextWindowSize;
      }
      async callAPI(prompt, callOptions, options) {
        const { responseFormat } = options;
        const api = this.settings.api ?? new OllamaApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/api/generate`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              stream: responseFormat.stream,
              model: this.settings.model,
              prompt: prompt.prompt,
              images: prompt.images,
              format: this.settings.format,
              options: {
                mirostat: this.settings.mirostat,
                mirostat_eta: this.settings.mirostatEta,
                mirostat_tau: this.settings.mirostatTau,
                num_ctx: this.settings.contextWindowSize,
                num_gpu: this.settings.numGpu,
                num_gqa: this.settings.numGqa,
                num_predict: this.settings.maxGenerationTokens,
                num_threads: this.settings.numThreads,
                repeat_last_n: this.settings.repeatLastN,
                repeat_penalty: this.settings.repeatPenalty,
                seed: this.settings.seed,
                stop: this.settings.stopSequences,
                temperature: this.settings.temperature,
                tfs_z: this.settings.tfsZ,
                top_k: this.settings.topK,
                top_p: this.settings.topP
              },
              system: this.settings.system,
              template: this.settings.template,
              context: this.settings.context,
              raw: this.settings.raw
            },
            failedResponseHandler: failedOllamaCallResponseHandler,
            successfulResponseHandler: responseFormat.handler,
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "contextWindowSize",
          "temperature",
          "mirostat",
          "mirostatEta",
          "mirostatTau",
          "numGqa",
          "numGpu",
          "numThreads",
          "repeatLastN",
          "repeatPenalty",
          "seed",
          "tfsZ",
          "topK",
          "topP",
          "system",
          "template",
          "context",
          "format",
          "raw"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: OllamaCompletionResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(ollamaCompletionResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: [
            {
              text: rawResponse.response,
              finishReason: "unknown"
            }
          ]
        };
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          ...options,
          responseFormat: OllamaCompletionResponseFormat.deltaIterable
        });
      }
      extractTextDelta(delta) {
        const chunk = delta;
        return chunk.done === true ? void 0 : chunk.response;
      }
      asObjectGenerationModel(promptTemplate) {
        return "adaptModel" in promptTemplate ? new ObjectFromTextStreamingModel({
          model: promptTemplate.adaptModel(this),
          template: promptTemplate
        }) : new ObjectFromTextStreamingModel({
          model: this,
          template: promptTemplate
        });
      }
      asToolCallGenerationModel(promptTemplate) {
        return new TextGenerationToolCallModel({
          model: this,
          template: promptTemplate
        });
      }
      asToolCallsOrTextGenerationModel(promptTemplate) {
        return new TextGenerationToolCallsModel({
          model: this,
          template: promptTemplate
        });
      }
      get promptTemplateProvider() {
        return this.settings.promptTemplate ?? Text2;
      }
      withJsonOutput() {
        return this.withSettings({ format: "json" });
      }
      withTextPrompt() {
        return this.withPromptTemplate(this.promptTemplateProvider.text());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(this.promptTemplateProvider.instruction());
      }
      withChatPrompt() {
        return this.withPromptTemplate(this.promptTemplateProvider.chat());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _OllamaCompletionModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    ollamaCompletionResponseSchema = z.object({
      done: z.literal(true),
      model: z.string(),
      created_at: z.string(),
      response: z.string(),
      total_duration: z.number(),
      load_duration: z.number().optional(),
      prompt_eval_count: z.number().optional(),
      prompt_eval_duration: z.number().optional(),
      eval_count: z.number(),
      eval_duration: z.number(),
      context: z.array(z.number()).optional()
    });
    ollamaCompletionStreamChunkSchema = z.discriminatedUnion("done", [
      z.object({
        done: z.literal(false),
        model: z.string(),
        created_at: z.string(),
        response: z.string()
      }),
      z.object({
        done: z.literal(true),
        model: z.string(),
        created_at: z.string(),
        total_duration: z.number(),
        load_duration: z.number().optional(),
        sample_count: z.number().optional(),
        sample_duration: z.number().optional(),
        prompt_eval_count: z.number().optional(),
        prompt_eval_duration: z.number().optional(),
        eval_count: z.number(),
        eval_duration: z.number(),
        context: z.array(z.number()).optional()
      })
    ]);
    OllamaCompletionResponseFormat = {
      json: {
        stream: false,
        handler: async ({ response, url, requestBodyValues }) => {
          const responseBody = await response.text();
          const parsedResult = safeParseJSON({
            text: responseBody,
            schema: zodSchema(
              z.union([
                ollamaCompletionResponseSchema,
                z.object({
                  done: z.literal(false),
                  model: z.string(),
                  created_at: z.string(),
                  response: z.string()
                })
              ])
            )
          });
          if (!parsedResult.success) {
            throw new ApiCallError({
              message: "Invalid JSON response",
              cause: parsedResult.error,
              statusCode: response.status,
              responseBody,
              url,
              requestBodyValues
            });
          }
          if (parsedResult.value.done === false) {
            throw new ApiCallError({
              message: "Incomplete Ollama response received",
              statusCode: response.status,
              responseBody,
              url,
              requestBodyValues,
              isRetryable: true
            });
          }
          return parsedResult.value;
        }
      },
      deltaIterable: {
        stream: true,
        handler: createJsonStreamResponseHandler(
          zodSchema(ollamaCompletionStreamChunkSchema)
        )
      }
    };
    OllamaFacade_exports = {};
    __export2(OllamaFacade_exports, {
      Api: () => Api8,
      ChatTextGenerator: () => ChatTextGenerator2,
      CompletionTextGenerator: () => CompletionTextGenerator2,
      TextEmbedder: () => TextEmbedder5,
      prompt: () => OllamaCompletionPrompt_exports
    });
    OllamaTextEmbeddingModel = class _OllamaTextEmbeddingModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "ollama";
      get modelName() {
        return null;
      }
      maxValuesPerCall = 1;
      get isParallelizable() {
        return this.settings.isParallelizable ?? false;
      }
      get dimensions() {
        return this.settings.dimensions;
      }
      async callAPI(texts, callOptions) {
        if (texts.length > this.maxValuesPerCall) {
          throw new Error(
            `The Ollama embedding API only supports ${this.maxValuesPerCall} texts per API call.`
          );
        }
        const api = this.settings.api ?? new OllamaApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/api/embeddings`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              model: this.settings.model,
              prompt: texts[0]
            },
            failedResponseHandler: failedOllamaCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(ollamaTextEmbeddingResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          dimensions: this.settings.dimensions
        };
      }
      async doEmbedValues(texts, options) {
        const rawResponse = await this.callAPI(texts, options);
        return {
          rawResponse,
          embeddings: [rawResponse.embedding]
        };
      }
      withSettings(additionalSettings) {
        return new _OllamaTextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    ollamaTextEmbeddingResponseSchema = z.object({
      embedding: z.array(z.number())
    });
    OpenAIApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "OPENAI_API_KEY",
              description: "OpenAI"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.openai.com",
            port: "443",
            path: "/v1"
          }
        });
      }
    };
    openAIErrorDataSchema = z.object({
      error: z.object({
        message: z.string(),
        type: z.string(),
        param: z.any().nullable(),
        code: z.string().nullable()
      })
    });
    failedOpenAICallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(openAIErrorDataSchema),
      errorToMessage: (data) => data.error.message,
      isRetryable: (response, error) => response.status >= 500 || response.status === 429 && error?.error.type !== "insufficient_quota"
    });
    AbstractOpenAIChatModel = class extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      async callAPI(messages, callOptions, options) {
        const api = this.settings.api ?? new OpenAIApiConfiguration();
        const responseFormat = options.responseFormat;
        const abortSignal = callOptions.run?.abortSignal;
        const user = this.settings.isUserIdForwardingEnabled ? callOptions.run?.userId : void 0;
        const openAIResponseFormat = this.settings.responseFormat;
        const functions = options.functions ?? this.settings.functions;
        const functionCall = options.functionCall ?? this.settings.functionCall;
        const tools = options.tools ?? this.settings.tools;
        const toolChoice = options.toolChoice ?? this.settings.toolChoice;
        let { stopSequences } = this.settings;
        return callWithRetryAndThrottle({
          retry: this.settings.api?.retry,
          throttle: this.settings.api?.throttle,
          call: async () => {
            if (stopSequences != null && Array.isArray(stopSequences) && stopSequences.length === 0) {
              stopSequences = void 0;
            }
            return postJsonToApi({
              url: api.assembleUrl("/chat/completions"),
              headers: api.headers({
                functionType: callOptions.functionType,
                functionId: callOptions.functionId,
                run: callOptions.run,
                callId: callOptions.callId
              }),
              body: {
                stream: responseFormat.stream,
                model: this.settings.model,
                messages,
                functions,
                function_call: functionCall,
                tools,
                tool_choice: toolChoice,
                temperature: this.settings.temperature,
                top_p: this.settings.topP,
                n: this.settings.numberOfGenerations,
                stop: stopSequences,
                max_tokens: this.settings.maxGenerationTokens,
                presence_penalty: this.settings.presencePenalty,
                frequency_penalty: this.settings.frequencyPenalty,
                logit_bias: this.settings.logitBias,
                seed: this.settings.seed,
                response_format: openAIResponseFormat,
                user
              },
              failedResponseHandler: failedOpenAICallResponseHandler,
              successfulResponseHandler: responseFormat.handler,
              abortSignal
            });
          }
        });
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: OpenAIChatResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(openAIChatResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: rawResponse.choices.map((choice) => ({
            text: choice.message.content ?? "",
            finishReason: this.translateFinishReason(choice.finish_reason)
          })),
          usage: this.extractUsage(rawResponse)
        };
      }
      translateFinishReason(finishReason) {
        switch (finishReason) {
          case "stop":
            return "stop";
          case "length":
            return "length";
          case "content_filter":
            return "content-filter";
          case "function_call":
          case "tool_calls":
            return "tool-calls";
          default:
            return "unknown";
        }
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          responseFormat: OpenAIChatResponseFormat.deltaIterable
        });
      }
      extractTextDelta(delta) {
        const chunk = delta;
        if (chunk.object !== "chat.completion.chunk" && chunk.object !== "chat.completion") {
          return void 0;
        }
        const chatChunk = chunk;
        const firstChoice = chatChunk.choices[0];
        if (firstChoice.index > 0) {
          return void 0;
        }
        return firstChoice.delta.content ?? void 0;
      }
      async doGenerateToolCall(tool, prompt, options) {
        const rawResponse = await this.callAPI(prompt, options, {
          responseFormat: OpenAIChatResponseFormat.json,
          toolChoice: {
            type: "function",
            function: { name: tool.name }
          },
          tools: [
            {
              type: "function",
              function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.parameters.getJsonSchema()
              }
            }
          ]
        });
        const toolCalls = rawResponse.choices[0]?.message.tool_calls;
        return {
          rawResponse,
          toolCall: toolCalls == null || toolCalls.length === 0 ? null : {
            id: toolCalls[0].id,
            args: parseJSON({ text: toolCalls[0].function.arguments })
          },
          usage: this.extractUsage(rawResponse)
        };
      }
      async doGenerateToolCalls(tools, prompt, options) {
        const rawResponse = await this.callAPI(prompt, options, {
          responseFormat: OpenAIChatResponseFormat.json,
          toolChoice: "auto",
          tools: tools.map((tool) => ({
            type: "function",
            function: {
              name: tool.name,
              description: tool.description,
              parameters: tool.parameters.getJsonSchema()
            }
          }))
        });
        const message = rawResponse.choices[0]?.message;
        return {
          rawResponse,
          text: message.content ?? null,
          toolCalls: message.tool_calls?.map((toolCall) => ({
            id: toolCall.id,
            name: toolCall.function.name,
            args: parseJSON({ text: toolCall.function.arguments })
          })) ?? null,
          usage: this.extractUsage(rawResponse)
        };
      }
      extractUsage(response) {
        return {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens
        };
      }
    };
    openAIChatResponseSchema = z.object({
      id: z.string(),
      choices: z.array(
        z.object({
          message: z.object({
            role: z.literal("assistant"),
            content: z.string().nullable(),
            function_call: z.object({
              name: z.string(),
              arguments: z.string()
            }).optional(),
            tool_calls: z.array(
              z.object({
                id: z.string(),
                type: z.literal("function"),
                function: z.object({
                  name: z.string(),
                  arguments: z.string()
                })
              })
            ).optional()
          }),
          index: z.number().optional(),
          logprobs: z.nullable(z.any()),
          finish_reason: z.enum([
            "stop",
            "length",
            "tool_calls",
            "content_filter",
            "function_call"
          ]).optional().nullable()
        })
      ),
      created: z.number(),
      model: z.string(),
      system_fingerprint: z.string().optional().nullable(),
      object: z.literal("chat.completion"),
      usage: z.object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number()
      })
    });
    openaiChatChunkSchema = z.object({
      object: z.string(),
      id: z.string(),
      choices: z.array(
        z.object({
          delta: z.object({
            role: z.enum(["assistant", "user"]).optional(),
            content: z.string().nullable().optional(),
            function_call: z.object({
              name: z.string().optional(),
              arguments: z.string().optional()
            }).optional(),
            tool_calls: z.array(
              z.object({
                id: z.string(),
                type: z.literal("function"),
                function: z.object({
                  name: z.string(),
                  arguments: z.string()
                })
              })
            ).optional()
          }),
          finish_reason: z.enum([
            "stop",
            "length",
            "tool_calls",
            "content_filter",
            "function_call"
          ]).nullable().optional(),
          index: z.number()
        })
      ),
      created: z.number(),
      model: z.string().optional(),
      system_fingerprint: z.string().optional().nullable()
    });
    OpenAIChatResponseFormat = {
      json: {
        stream: false,
        handler: createJsonResponseHandler(zodSchema(openAIChatResponseSchema))
      },
      deltaIterable: {
        stream: true,
        handler: createEventSourceResponseHandler(zodSchema(openaiChatChunkSchema))
      }
    };
    AbstractOpenAICompletionModel = class extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      async callAPI(prompt, callOptions, options) {
        const api = this.settings.api ?? new OpenAIApiConfiguration();
        const user = this.settings.isUserIdForwardingEnabled ? callOptions.run?.userId : void 0;
        const abortSignal = callOptions.run?.abortSignal;
        const openaiResponseFormat = options.responseFormat;
        const stopSequences = this.settings.stopSequences != null && Array.isArray(this.settings.stopSequences) && this.settings.stopSequences.length === 0 ? void 0 : this.settings.stopSequences;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl("/completions"),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              stream: openaiResponseFormat.stream,
              model: this.settings.model,
              prompt,
              suffix: this.settings.suffix,
              max_tokens: this.settings.maxGenerationTokens,
              temperature: this.settings.temperature,
              top_p: this.settings.topP,
              n: this.settings.numberOfGenerations,
              logprobs: this.settings.logprobs,
              echo: this.settings.echo,
              stop: stopSequences,
              seed: this.settings.seed,
              presence_penalty: this.settings.presencePenalty,
              frequency_penalty: this.settings.frequencyPenalty,
              best_of: this.settings.bestOf,
              logit_bias: this.settings.logitBias,
              user
            },
            failedResponseHandler: failedOpenAICallResponseHandler,
            successfulResponseHandler: openaiResponseFormat.handler,
            abortSignal
          })
        });
      }
      async doGenerateTexts(prompt, options) {
        return this.processTextGenerationResponse(
          await this.callAPI(prompt, options, {
            responseFormat: OpenAITextResponseFormat.json
          })
        );
      }
      restoreGeneratedTexts(rawResponse) {
        return this.processTextGenerationResponse(
          validateTypes({
            value: rawResponse,
            schema: zodSchema(OpenAICompletionResponseSchema)
          })
        );
      }
      processTextGenerationResponse(rawResponse) {
        return {
          rawResponse,
          textGenerationResults: rawResponse.choices.map((choice) => {
            return {
              finishReason: this.translateFinishReason(choice.finish_reason),
              text: choice.text
            };
          }),
          usage: {
            promptTokens: rawResponse.usage.prompt_tokens,
            completionTokens: rawResponse.usage.completion_tokens,
            totalTokens: rawResponse.usage.total_tokens
          }
        };
      }
      translateFinishReason(finishReason) {
        switch (finishReason) {
          case "stop":
            return "stop";
          case "length":
            return "length";
          case "content_filter":
            return "content-filter";
          default:
            return "unknown";
        }
      }
      doStreamText(prompt, options) {
        return this.callAPI(prompt, options, {
          responseFormat: OpenAITextResponseFormat.deltaIterable
        });
      }
      extractTextDelta(delta) {
        const chunk = delta;
        const firstChoice = chunk.choices[0];
        if (firstChoice.index > 0) {
          return void 0;
        }
        return chunk.choices[0].text;
      }
      withJsonOutput() {
        return this;
      }
    };
    OpenAICompletionResponseSchema = z.object({
      id: z.string(),
      choices: z.array(
        z.object({
          finish_reason: z.enum(["stop", "length", "content_filter"]).optional().nullable(),
          index: z.number(),
          logprobs: z.nullable(z.any()),
          text: z.string()
        })
      ),
      created: z.number(),
      model: z.string(),
      system_fingerprint: z.string().optional(),
      object: z.literal("text_completion"),
      usage: z.object({
        prompt_tokens: z.number(),
        completion_tokens: z.number(),
        total_tokens: z.number()
      })
    });
    openaiCompletionStreamChunkSchema = z.object({
      choices: z.array(
        z.object({
          text: z.string(),
          finish_reason: z.enum(["stop", "length", "content_filter"]).optional().nullable(),
          index: z.number()
        })
      ),
      created: z.number(),
      id: z.string(),
      model: z.string(),
      system_fingerprint: z.string().optional(),
      object: z.literal("text_completion")
    });
    OpenAITextResponseFormat = {
      json: {
        stream: false,
        handler: createJsonResponseHandler(
          zodSchema(OpenAICompletionResponseSchema)
        )
      },
      deltaIterable: {
        stream: true,
        handler: createEventSourceResponseHandler(
          zodSchema(openaiCompletionStreamChunkSchema)
        )
      }
    };
    AbstractOpenAITextEmbeddingModel = class extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      get maxValuesPerCall() {
        return this.settings.maxValuesPerCall ?? 2048;
      }
      isParallelizable = true;
      async callAPI(texts, callOptions) {
        const api = this.settings.api ?? new OpenAIApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl("/embeddings"),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              model: this.modelName,
              input: texts,
              dimensions: this.settings.dimensions,
              user: this.settings.isUserIdForwardingEnabled ? callOptions.run?.userId : void 0
            },
            failedResponseHandler: failedOpenAICallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(openAITextEmbeddingResponseSchema)
            ),
            abortSignal
          })
        });
      }
      async doEmbedValues(texts, callOptions) {
        if (texts.length > this.maxValuesPerCall) {
          throw new Error(
            `The OpenAI embedding API only supports ${this.maxValuesPerCall} texts per API call.`
          );
        }
        const rawResponse = await this.callAPI(texts, callOptions);
        return {
          rawResponse,
          embeddings: rawResponse.data.map((data) => data.embedding)
        };
      }
    };
    openAITextEmbeddingResponseSchema = z.object({
      object: z.literal("list"),
      data: z.array(
        z.object({
          object: z.literal("embedding"),
          embedding: z.array(z.number()),
          index: z.number()
        })
      ),
      model: z.string(),
      usage: z.object({
        prompt_tokens: z.number(),
        total_tokens: z.number()
      }).optional()
    });
    AzureOpenAIApiConfiguration = class extends AbstractApiConfiguration {
      resourceName;
      deploymentId;
      apiVersion;
      fixedHeaderValue;
      constructor({
        resourceName,
        deploymentId,
        apiVersion,
        apiKey,
        retry,
        throttle
      }) {
        super({ retry, throttle });
        this.resourceName = resourceName;
        this.deploymentId = deploymentId;
        this.apiVersion = apiVersion;
        this.fixedHeaderValue = {
          "api-key": loadApiKey({
            apiKey,
            environmentVariableName: "AZURE_OPENAI_API_KEY",
            description: "Azure OpenAI"
          })
        };
      }
      assembleUrl(path) {
        return `https://${this.resourceName}.openai.azure.com/openai/deployments/${this.deploymentId}${path}?api-version=${this.apiVersion}`;
      }
      fixedHeaders() {
        return this.fixedHeaderValue;
      }
    };
    OpenAIChatMessage = {
      system(content) {
        return { role: "system", content };
      },
      user(content, options) {
        return {
          role: "user",
          content: typeof content === "string" ? content : content.map((part) => {
            switch (part.type) {
              case "text": {
                return { type: "text", text: part.text };
              }
              case "image": {
                return {
                  type: "image_url",
                  image_url: `data:${part.mimeType ?? "image/jpeg"};base64,${convertDataContentToBase64String(part.image)}`
                };
              }
            }
          }),
          name: options?.name
        };
      },
      assistant(content, options) {
        return {
          role: "assistant",
          content,
          function_call: options?.functionCall == null ? void 0 : {
            name: options.functionCall.name,
            arguments: options.functionCall.arguments
          },
          tool_calls: options?.toolCalls?.map((toolCall) => ({
            id: toolCall.id,
            type: "function",
            function: {
              name: toolCall.name,
              arguments: JSON.stringify(toolCall.args)
            }
          })) ?? void 0
        };
      },
      fn({
        fnName,
        content
      }) {
        return { role: "function", name: fnName, content: JSON.stringify(content) };
      },
      tool({
        toolCallId,
        content
      }) {
        return {
          role: "tool",
          tool_call_id: toolCallId,
          content: JSON.stringify(content)
        };
      }
    };
    OpenAIChatFunctionCallObjectGenerationModel = class _OpenAIChatFunctionCallObjectGenerationModel {
      model;
      fnName;
      fnDescription;
      promptTemplate;
      constructor({
        model,
        fnName,
        fnDescription,
        promptTemplate
      }) {
        this.model = model;
        this.fnName = fnName;
        this.fnDescription = fnDescription;
        this.promptTemplate = promptTemplate;
      }
      get modelInformation() {
        return this.model.modelInformation;
      }
      get settings() {
        return {
          ...this.model.settings,
          fnName: this.fnName,
          fnDescription: this.fnDescription
        };
      }
      get settingsForEvent() {
        return {
          ...this.model.settingsForEvent,
          fnName: this.fnName,
          fnDescription: this.fnDescription
        };
      }
      withTextPrompt() {
        return this.withPromptTemplate(text12());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction12());
      }
      withChatPrompt() {
        return this.withPromptTemplate(chat12());
      }
      withPromptTemplate(promptTemplate) {
        return new _OpenAIChatFunctionCallObjectGenerationModel({
          model: this.model,
          fnName: this.fnName,
          fnDescription: this.fnDescription,
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _OpenAIChatFunctionCallObjectGenerationModel({
          model: this.model.withSettings(additionalSettings),
          fnName: this.fnName,
          fnDescription: this.fnDescription,
          promptTemplate: this.promptTemplate
        });
      }
      async doGenerateObject(schema, prompt, options) {
        const expandedPrompt = this.promptTemplate.format(prompt);
        const rawResponse = await this.model.withSettings({
          stopSequences: [
            ...this.settings.stopSequences ?? [],
            ...this.promptTemplate.stopSequences
          ]
        }).callAPI(expandedPrompt, options, {
          responseFormat: OpenAIChatResponseFormat.json,
          functionCall: { name: this.fnName },
          functions: [
            {
              name: this.fnName,
              description: this.fnDescription,
              parameters: schema.getJsonSchema()
            }
          ]
        });
        const valueText = rawResponse.choices[0].message.function_call.arguments;
        try {
          return {
            rawResponse,
            valueText,
            value: import_secure_json_parse3.default.parse(valueText),
            usage: this.model.extractUsage(rawResponse)
          };
        } catch (error) {
          throw new ObjectParseError({
            valueText,
            cause: error
          });
        }
      }
      async doStreamObject(schema, prompt, options) {
        const expandedPrompt = this.promptTemplate.format(prompt);
        return this.model.callAPI(expandedPrompt, options, {
          responseFormat: OpenAIChatResponseFormat.deltaIterable,
          functionCall: { name: this.fnName },
          functions: [
            {
              name: this.fnName,
              description: this.fnDescription,
              parameters: schema.getJsonSchema()
            }
          ]
        });
      }
      extractObjectTextDelta(delta) {
        const chunk = delta;
        if (chunk.object !== "chat.completion.chunk") {
          return void 0;
        }
        const chatChunk = chunk;
        const firstChoice = chatChunk.choices[0];
        if (firstChoice.index > 0) {
          return void 0;
        }
        return firstChoice.delta.function_call?.arguments;
      }
      parseAccumulatedObjectText(accumulatedText) {
        return parsePartialJson(accumulatedText);
      }
    };
    TikTokenTokenizer = class {
      constructor(settings) {
        this.tiktoken = new Tiktoken(getTiktokenBPE(settings.model));
      }
      tiktoken;
      async tokenize(text13) {
        return this.tiktoken.encode(text13);
      }
      async tokenizeWithTexts(text13) {
        const tokens = this.tiktoken.encode(text13);
        return {
          tokens,
          tokenTexts: tokens.map((token) => this.tiktoken.decode([token]))
        };
      }
      async detokenize(tokens) {
        return this.tiktoken.decode(tokens);
      }
    };
    OPENAI_CHAT_PROMPT_BASE_TOKEN_COUNT = 2;
    OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT = 5;
    OPENAI_CHAT_MODELS = {
      "gpt-4": {
        contextWindowSize: 8192,
        promptTokenCostInMillicents: 3,
        completionTokenCostInMillicents: 6
      },
      "gpt-4-0314": {
        contextWindowSize: 8192,
        promptTokenCostInMillicents: 3,
        completionTokenCostInMillicents: 6
      },
      "gpt-4-0613": {
        contextWindowSize: 8192,
        promptTokenCostInMillicents: 3,
        completionTokenCostInMillicents: 6,
        fineTunedPromptTokenCostInMillicents: null,
        fineTunedCompletionTokenCostInMillicents: null
      },
      "gpt-4-turbo-preview": {
        contextWindowSize: 128e3,
        promptTokenCostInMillicents: 1,
        completionTokenCostInMillicents: 3
      },
      "gpt-4-1106-preview": {
        contextWindowSize: 128e3,
        promptTokenCostInMillicents: 1,
        completionTokenCostInMillicents: 3
      },
      "gpt-4-0125-preview": {
        contextWindowSize: 128e3,
        promptTokenCostInMillicents: 1,
        completionTokenCostInMillicents: 3
      },
      "gpt-4-vision-preview": {
        contextWindowSize: 128e3,
        promptTokenCostInMillicents: 1,
        completionTokenCostInMillicents: 3
      },
      "gpt-4-32k": {
        contextWindowSize: 32768,
        promptTokenCostInMillicents: 6,
        completionTokenCostInMillicents: 12
      },
      "gpt-4-32k-0314": {
        contextWindowSize: 32768,
        promptTokenCostInMillicents: 6,
        completionTokenCostInMillicents: 12
      },
      "gpt-4-32k-0613": {
        contextWindowSize: 32768,
        promptTokenCostInMillicents: 6,
        completionTokenCostInMillicents: 12
      },
      "gpt-3.5-turbo": {
        contextWindowSize: 4096,
        promptTokenCostInMillicents: 0.15,
        completionTokenCostInMillicents: 0.2,
        fineTunedPromptTokenCostInMillicents: 0.3,
        fineTunedCompletionTokenCostInMillicents: 0.6
      },
      "gpt-3.5-turbo-0125": {
        contextWindowSize: 16385,
        promptTokenCostInMillicents: 0.05,
        completionTokenCostInMillicents: 0.15
      },
      "gpt-3.5-turbo-1106": {
        contextWindowSize: 16385,
        promptTokenCostInMillicents: 0.1,
        completionTokenCostInMillicents: 0.2
      },
      "gpt-3.5-turbo-0301": {
        contextWindowSize: 4096,
        promptTokenCostInMillicents: 0.15,
        completionTokenCostInMillicents: 0.2
      },
      "gpt-3.5-turbo-0613": {
        contextWindowSize: 4096,
        promptTokenCostInMillicents: 0.15,
        completionTokenCostInMillicents: 0.2,
        fineTunedPromptTokenCostInMillicents: 1.2,
        fineTunedCompletionTokenCostInMillicents: 1.6
      },
      "gpt-3.5-turbo-16k": {
        contextWindowSize: 16384,
        promptTokenCostInMillicents: 0.3,
        completionTokenCostInMillicents: 0.4
      },
      "gpt-3.5-turbo-16k-0613": {
        contextWindowSize: 16384,
        promptTokenCostInMillicents: 0.3,
        completionTokenCostInMillicents: 0.4
      }
    };
    isOpenAIChatModel = (model) => model in OPENAI_CHAT_MODELS || model.startsWith("ft:gpt-3.5-turbo-0613:") || model.startsWith("ft:gpt-3.5-turbo:");
    calculateOpenAIChatCostInMillicents = ({
      model,
      response
    }) => {
      const { promptTokenCostInMillicents, completionTokenCostInMillicents } = getOpenAIChatModelInformation(model);
      if (promptTokenCostInMillicents == null || completionTokenCostInMillicents == null) {
        return null;
      }
      return response.usage.prompt_tokens * promptTokenCostInMillicents + response.usage.completion_tokens * completionTokenCostInMillicents;
    };
    OpenAIChatModel = class _OpenAIChatModel extends AbstractOpenAIChatModel {
      constructor(settings) {
        super(settings);
        const modelInformation = getOpenAIChatModelInformation(this.settings.model);
        this.tokenizer = new TikTokenTokenizer({
          model: modelInformation.baseModel
        });
        this.contextWindowSize = modelInformation.contextWindowSize;
      }
      provider = "openai";
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize;
      tokenizer;
      countPromptTokens(messages) {
        return countOpenAIChatPromptTokens({
          messages,
          model: this.modelName
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "functions",
          "functionCall",
          "temperature",
          "topP",
          "presencePenalty",
          "frequencyPenalty",
          "logitBias",
          "seed",
          "responseFormat"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      asFunctionCallObjectGenerationModel({
        fnName,
        fnDescription
      }) {
        return new OpenAIChatFunctionCallObjectGenerationModel({
          model: this,
          fnName,
          fnDescription,
          promptTemplate: identity()
        });
      }
      asObjectGenerationModel(promptTemplate) {
        return "adaptModel" in promptTemplate ? new ObjectFromTextStreamingModel({
          model: promptTemplate.adaptModel(this),
          template: promptTemplate
        }) : new ObjectFromTextStreamingModel({
          model: this,
          template: promptTemplate
        });
      }
      withTextPrompt() {
        return this.withPromptTemplate(text12());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction12());
      }
      withChatPrompt() {
        return this.withPromptTemplate(chat12());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateFullTextModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withJsonOutput() {
        return this.withSettings({ responseFormat: { type: "json_object" } });
      }
      withSettings(additionalSettings) {
        return new _OpenAIChatModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    OPENAI_TEXT_GENERATION_MODELS = {
      "gpt-3.5-turbo-instruct": {
        contextWindowSize: 4097,
        promptTokenCostInMillicents: 0.15,
        completionTokenCostInMillicents: 0.2
      }
    };
    isOpenAICompletionModel = (model) => model in OPENAI_TEXT_GENERATION_MODELS;
    calculateOpenAICompletionCostInMillicents = ({
      model,
      response
    }) => {
      const modelInformation = getOpenAICompletionModelInformation(model);
      return response.usage.prompt_tokens * modelInformation.promptTokenCostInMillicents + response.usage.completion_tokens * modelInformation.completionTokenCostInMillicents;
    };
    OpenAICompletionModel = class _OpenAICompletionModel extends AbstractOpenAICompletionModel {
      constructor(settings) {
        super(settings);
        const modelInformation = getOpenAICompletionModelInformation(
          this.settings.model
        );
        this.tokenizer = new TikTokenTokenizer({
          model: this.settings.model
        });
        this.contextWindowSize = modelInformation.contextWindowSize;
      }
      provider = "openai";
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize;
      tokenizer;
      async countPromptTokens(input) {
        return countTokens(this.tokenizer, input);
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "suffix",
          "temperature",
          "topP",
          "logprobs",
          "echo",
          "presencePenalty",
          "frequencyPenalty",
          "bestOf",
          "logitBias",
          "seed"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      withTextPrompt() {
        return this.withPromptTemplate(text7());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction7());
      }
      withChatPrompt(options) {
        return this.withPromptTemplate(chat7(options));
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _OpenAICompletionModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    OpenAIFacade_exports = {};
    __export2(OpenAIFacade_exports, {
      Api: () => Api9,
      AzureApi: () => AzureApi,
      ChatMessage: () => OpenAIChatMessage,
      ChatTextGenerator: () => ChatTextGenerator3,
      CompletionTextGenerator: () => CompletionTextGenerator3,
      ImageGenerator: () => ImageGenerator2,
      SpeechGenerator: () => SpeechGenerator3,
      TextEmbedder: () => TextEmbedder6,
      Tokenizer: () => Tokenizer3,
      Transcriber: () => Transcriber
    });
    OPENAI_IMAGE_MODELS = {
      "dall-e-2": {
        getCost(settings) {
          switch (settings.size ?? "1024x1024") {
            case "1024x1024":
              return 2e3;
            case "512x512":
              return 1800;
            case "256x256":
              return 1600;
            default:
              return null;
          }
        }
      },
      "dall-e-3": {
        getCost(settings) {
          switch (settings.quality ?? "standard") {
            case "standard": {
              switch (settings.size ?? "1024x1024") {
                case "1024x1024":
                  return 4e3;
                case "1024x1792":
                case "1792x1024":
                  return 8e3;
                default:
                  return null;
              }
            }
            case "hd": {
              switch (settings.size ?? "1024x1024") {
                case "1024x1024":
                  return 8e3;
                case "1024x1792":
                case "1792x1024":
                  return 12e3;
                default:
                  return null;
              }
            }
          }
        }
      }
    };
    calculateOpenAIImageGenerationCostInMillicents = ({
      model,
      settings
    }) => {
      const cost = OPENAI_IMAGE_MODELS[model]?.getCost(settings);
      if (cost == null) {
        return null;
      }
      return (settings.numberOfGenerations ?? 1) * cost;
    };
    OpenAIImageGenerationModel = class _OpenAIImageGenerationModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "openai";
      get modelName() {
        return this.settings.model;
      }
      async callAPI(prompt, callOptions, options) {
        const api = this.settings.api ?? new OpenAIApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        const userId = callOptions.run?.userId;
        const responseFormat = options.responseFormat;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl("/images/generations"),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              prompt,
              n: this.settings.numberOfGenerations,
              size: this.settings.size,
              response_format: responseFormat.type,
              user: this.settings.isUserIdForwardingEnabled ? userId : void 0
            },
            failedResponseHandler: failedOpenAICallResponseHandler,
            successfulResponseHandler: responseFormat.handler,
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        const eventSettingProperties = [
          "numberOfGenerations",
          "size",
          "quality",
          "style"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      async doGenerateImages(prompt, options) {
        const rawResponse = await this.callAPI(prompt, options, {
          responseFormat: OpenAIImageGenerationResponseFormat.base64Json
        });
        return {
          rawResponse,
          base64Images: rawResponse.data.map((item) => item.b64_json)
        };
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateImageGenerationModel({
          model: this,
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _OpenAIImageGenerationModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    openAIImageGenerationUrlSchema = z.object({
      created: z.number(),
      data: z.array(
        z.object({
          url: z.string()
        })
      )
    });
    openAIImageGenerationBase64JsonSchema = z.object({
      created: z.number(),
      data: z.array(
        z.object({
          b64_json: z.string()
        })
      )
    });
    OpenAIImageGenerationResponseFormat = {
      url: {
        type: "url",
        handler: createJsonResponseHandler(
          zodSchema(openAIImageGenerationUrlSchema)
        )
      },
      base64Json: {
        type: "b64_json",
        handler: createJsonResponseHandler(
          zodSchema(openAIImageGenerationBase64JsonSchema)
        )
      }
    };
    OPENAI_SPEECH_MODELS = {
      "tts-1": {
        costInMillicentsPerCharacter: 1.5
      },
      "tts-1-hd": {
        costInMillicentsPerCharacter: 3
      }
    };
    calculateOpenAISpeechCostInMillicents = ({
      model,
      input
    }) => {
      if (!OPENAI_SPEECH_MODELS[model]) {
        return null;
      }
      return input.length * OPENAI_SPEECH_MODELS[model].costInMillicentsPerCharacter;
    };
    OpenAISpeechModel = class _OpenAISpeechModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "openai";
      get voice() {
        return this.settings.voice;
      }
      get modelName() {
        return this.settings.model;
      }
      async callAPI(text13, callOptions) {
        const api = this.settings.api ?? new OpenAIApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(`/audio/speech`),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              input: text13,
              voice: this.settings.voice,
              speed: this.settings.speed,
              model: this.settings.model,
              response_format: this.settings.responseFormat
            },
            failedResponseHandler: failedOpenAICallResponseHandler,
            successfulResponseHandler: createAudioMpegResponseHandler(),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          voice: this.settings.voice,
          speed: this.settings.speed,
          model: this.settings.model,
          responseFormat: this.settings.responseFormat
        };
      }
      doGenerateSpeechStandard(text13, options) {
        return this.callAPI(text13, options);
      }
      withSettings(additionalSettings) {
        return new _OpenAISpeechModel({
          ...this.settings,
          ...additionalSettings
        });
      }
    };
    OPENAI_TEXT_EMBEDDING_MODELS = {
      "text-embedding-3-small": {
        contextWindowSize: 8192,
        dimensions: 1536,
        tokenCostInMillicents: 2e-3
      },
      "text-embedding-3-large": {
        contextWindowSize: 8192,
        dimensions: 3072,
        tokenCostInMillicents: 0.013
      },
      "text-embedding-ada-002": {
        contextWindowSize: 8192,
        dimensions: 1536,
        tokenCostInMillicents: 0.01
      }
    };
    isOpenAIEmbeddingModel = (model) => model in OPENAI_TEXT_EMBEDDING_MODELS;
    calculateOpenAIEmbeddingCostInMillicents = ({
      model,
      responses
    }) => {
      let amountInMilliseconds = 0;
      for (const response of responses) {
        amountInMilliseconds += response.usage.total_tokens * OPENAI_TEXT_EMBEDDING_MODELS[model].tokenCostInMillicents;
      }
      return amountInMilliseconds;
    };
    OpenAITextEmbeddingModel = class _OpenAITextEmbeddingModel extends AbstractOpenAITextEmbeddingModel {
      constructor(settings) {
        super(settings);
        this.tokenizer = new TikTokenTokenizer({ model: this.modelName });
        this.contextWindowSize = OPENAI_TEXT_EMBEDDING_MODELS[this.modelName].contextWindowSize;
        this.dimensions = this.settings.dimensions ?? OPENAI_TEXT_EMBEDDING_MODELS[this.modelName].dimensions;
      }
      provider = "openai";
      get modelName() {
        return this.settings.model;
      }
      dimensions;
      tokenizer;
      contextWindowSize;
      async countTokens(input) {
        return countTokens(this.tokenizer, input);
      }
      get settingsForEvent() {
        return {};
      }
      withSettings(additionalSettings) {
        return new _OpenAITextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    OPENAI_TRANSCRIPTION_MODELS = {
      "whisper-1": {
        costInMillicentsPerSecond: 10
      }
    };
    calculateOpenAITranscriptionCostInMillicents = ({
      model,
      response
    }) => {
      if (model !== "whisper-1") {
        return null;
      }
      const durationInSeconds = response.duration;
      return Math.ceil(durationInSeconds) * OPENAI_TRANSCRIPTION_MODELS[model].costInMillicentsPerSecond;
    };
    OpenAITranscriptionModel = class _OpenAITranscriptionModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "openai";
      get modelName() {
        return this.settings.model;
      }
      async doTranscribe({
        audioData,
        mimeType
      }, options) {
        const rawResponse = await this.callAPI(
          {
            fileExtension: getAudioFileExtension(mimeType),
            audioData: convertDataContentToUint8Array(audioData)
          },
          options,
          { responseFormat: OpenAITranscriptionResponseFormat.verboseJson }
        );
        return {
          rawResponse,
          transcription: rawResponse.text
        };
      }
      async callAPI(input, callOptions, options) {
        const api = this.settings.api ?? new OpenAIApiConfiguration();
        const abortSignal = callOptions?.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => {
            const fileName = `audio.${input.fileExtension}`;
            const formData = new FormData();
            formData.append("file", new Blob([input.audioData]), fileName);
            formData.append("model", this.settings.model);
            if (this.settings.prompt != null) {
              formData.append("prompt", this.settings.prompt);
            }
            if (options.responseFormat != null) {
              formData.append("response_format", options.responseFormat.type);
            }
            if (this.settings.temperature != null) {
              formData.append("temperature", this.settings.temperature.toString());
            }
            if (this.settings.language != null) {
              formData.append("language", this.settings.language);
            }
            return postToApi({
              url: api.assembleUrl("/audio/transcriptions"),
              headers: api.headers({
                functionType: callOptions.functionType,
                functionId: callOptions.functionId,
                run: callOptions.run,
                callId: callOptions.callId
              }),
              body: {
                content: formData,
                values: {
                  model: this.settings.model,
                  prompt: this.settings.prompt,
                  response_format: options.responseFormat,
                  temperature: this.settings.temperature,
                  language: this.settings.language
                }
              },
              failedResponseHandler: failedOpenAICallResponseHandler,
              successfulResponseHandler: options.responseFormat.handler,
              abortSignal
            });
          }
        });
      }
      get settingsForEvent() {
        return {
          language: this.settings.language,
          temperature: this.settings.temperature
        };
      }
      withSettings(additionalSettings) {
        return new _OpenAITranscriptionModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    openAITranscriptionJsonSchema = z.object({
      text: z.string()
    });
    openAITranscriptionVerboseJsonSchema = z.object({
      task: z.literal("transcribe"),
      language: z.string(),
      duration: z.number(),
      segments: z.array(
        z.object({
          id: z.number(),
          seek: z.number(),
          start: z.number(),
          end: z.number(),
          text: z.string(),
          tokens: z.array(z.number()),
          temperature: z.number(),
          avg_logprob: z.number(),
          compression_ratio: z.number(),
          no_speech_prob: z.number(),
          transient: z.boolean().optional()
        })
      ),
      text: z.string()
    });
    OpenAITranscriptionResponseFormat = {
      json: {
        type: "json",
        handler: createJsonResponseHandler(
          zodSchema(openAITranscriptionJsonSchema)
        )
      },
      verboseJson: {
        type: "verbose_json",
        handler: createJsonResponseHandler(
          zodSchema(openAITranscriptionVerboseJsonSchema)
        )
      },
      text: {
        type: "text",
        handler: createTextResponseHandler()
      },
      srt: {
        type: "srt",
        handler: createTextResponseHandler()
      },
      vtt: {
        type: "vtt",
        handler: createTextResponseHandler()
      }
    };
    FireworksAIApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "FIREWORKS_API_KEY",
              description: "Fireworks AI"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.fireworks.ai",
            port: "443",
            path: "/inference/v1"
          }
        });
      }
      provider = "openaicompatible-fireworksai";
    };
    OpenAICompatibleChatModel = class _OpenAICompatibleChatModel extends AbstractOpenAIChatModel {
      constructor(settings) {
        super(settings);
      }
      get provider() {
        return this.settings.provider ?? this.settings.api.provider ?? "openaicompatible";
      }
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize = void 0;
      tokenizer = void 0;
      countPromptTokens = void 0;
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "functions",
          "functionCall",
          "temperature",
          "topP",
          "presencePenalty",
          "frequencyPenalty",
          "logitBias",
          "seed",
          "responseFormat"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      asObjectGenerationModel(promptTemplate) {
        return "adaptModel" in promptTemplate ? new ObjectFromTextStreamingModel({
          model: promptTemplate.adaptModel(this),
          template: promptTemplate
        }) : new ObjectFromTextStreamingModel({
          model: this,
          template: promptTemplate
        });
      }
      withTextPrompt() {
        return this.withPromptTemplate(text12());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction12());
      }
      withChatPrompt() {
        return this.withPromptTemplate(chat12());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateFullTextModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withJsonOutput() {
        return this.withSettings({ responseFormat: { type: "json_object" } });
      }
      withSettings(additionalSettings) {
        return new _OpenAICompatibleChatModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    OpenAICompatibleCompletionModel = class _OpenAICompatibleCompletionModel extends AbstractOpenAICompletionModel {
      constructor(settings) {
        super(settings);
      }
      get provider() {
        return this.settings.provider ?? this.settings.api.provider ?? "openaicompatible";
      }
      get modelName() {
        return this.settings.model;
      }
      contextWindowSize = void 0;
      tokenizer = void 0;
      countPromptTokens = void 0;
      get settingsForEvent() {
        const eventSettingProperties = [
          ...textGenerationModelProperties,
          "suffix",
          "temperature",
          "topP",
          "logprobs",
          "echo",
          "presencePenalty",
          "frequencyPenalty",
          "bestOf",
          "logitBias",
          "seed"
        ];
        return Object.fromEntries(
          Object.entries(this.settings).filter(
            ([key]) => eventSettingProperties.includes(key)
          )
        );
      }
      withTextPrompt() {
        return this.withPromptTemplate(text7());
      }
      withInstructionPrompt() {
        return this.withPromptTemplate(instruction7());
      }
      withChatPrompt(options) {
        return this.withPromptTemplate(chat7(options));
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateTextStreamingModel({
          model: this.withSettings({
            stopSequences: [
              ...this.settings.stopSequences ?? [],
              ...promptTemplate.stopSequences
            ]
          }),
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _OpenAICompatibleCompletionModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    OpenAICompatibleFacade_exports = {};
    __export2(OpenAICompatibleFacade_exports, {
      ChatTextGenerator: () => ChatTextGenerator4,
      CompletionTextGenerator: () => CompletionTextGenerator4,
      FireworksAIApi: () => FireworksAIApi,
      PerplexityApi: () => PerplexityApi,
      TextEmbedder: () => TextEmbedder7,
      TogetherAIApi: () => TogetherAIApi
    });
    OpenAICompatibleTextEmbeddingModel = class _OpenAICompatibleTextEmbeddingModel extends AbstractOpenAITextEmbeddingModel {
      constructor(settings) {
        super(settings);
      }
      get provider() {
        return this.settings.provider ?? this.settings.api.provider ?? "openaicompatible";
      }
      get modelName() {
        return this.settings.model;
      }
      get dimensions() {
        return this.settings.dimensions;
      }
      get settingsForEvent() {
        return {
          dimensions: this.settings.dimensions
        };
      }
      withSettings(additionalSettings) {
        return new _OpenAICompatibleTextEmbeddingModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    PerplexityApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "PERPLEXITY_API_KEY",
              description: "Perplexity"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.perplexity.ai",
            port: "443",
            path: ""
          }
        });
      }
      provider = "openaicompatible-perplexity";
    };
    TogetherAIApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "TOGETHER_API_KEY",
              description: "Together AI"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.together.xyz",
            port: "443",
            path: "/v1"
          }
        });
      }
      provider = "openaicompatible-togetherai";
    };
    StabilityApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          headers: settings.headers ?? {
            Authorization: `Bearer ${loadApiKey({
              apiKey: settings.apiKey,
              environmentVariableName: "STABILITY_API_KEY",
              description: "Stability"
            })}`
          },
          baseUrlDefaults: {
            protocol: "https",
            host: "api.stability.ai",
            port: "443",
            path: "/v1"
          }
        });
      }
    };
    stabilityErrorDataSchema = z.object({
      message: z.string()
    });
    failedStabilityCallResponseHandler = createJsonErrorResponseHandler({
      errorSchema: zodSchema(stabilityErrorDataSchema),
      errorToMessage: (error) => error.message
    });
    StabilityFacade_exports = {};
    __export2(StabilityFacade_exports, {
      Api: () => Api10,
      ImageGenerator: () => ImageGenerator3
    });
    StabilityImageGenerationModel = class _StabilityImageGenerationModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "stability";
      get modelName() {
        return this.settings.model;
      }
      async callAPI(input, callOptions) {
        const api = this.settings.api ?? new StabilityApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: this.settings.api?.retry,
          throttle: this.settings.api?.throttle,
          call: async () => postJsonToApi({
            url: api.assembleUrl(
              `/generation/${this.settings.model}/text-to-image`
            ),
            headers: api.headers({
              functionType: callOptions.functionType,
              functionId: callOptions.functionId,
              run: callOptions.run,
              callId: callOptions.callId
            }),
            body: {
              height: this.settings.height,
              width: this.settings.width,
              text_prompts: input,
              cfg_scale: this.settings.cfgScale,
              clip_guidance_preset: this.settings.clipGuidancePreset,
              sampler: this.settings.sampler,
              samples: this.settings.numberOfGenerations,
              seed: this.settings.seed,
              steps: this.settings.steps,
              style_preset: this.settings.stylePreset
            },
            failedResponseHandler: failedStabilityCallResponseHandler,
            successfulResponseHandler: createJsonResponseHandler(
              zodSchema(stabilityImageGenerationResponseSchema)
            ),
            abortSignal
          })
        });
      }
      get settingsForEvent() {
        return {
          numberOfGenerations: this.settings.numberOfGenerations,
          height: this.settings.height,
          width: this.settings.width,
          cfgScale: this.settings.cfgScale,
          clipGuidancePreset: this.settings.clipGuidancePreset,
          sampler: this.settings.sampler,
          seed: this.settings.seed,
          steps: this.settings.steps,
          stylePreset: this.settings.stylePreset
        };
      }
      async doGenerateImages(prompt, callOptions) {
        const rawResponse = await this.callAPI(prompt, callOptions);
        return {
          rawResponse,
          base64Images: rawResponse.artifacts.map((artifact) => artifact.base64)
        };
      }
      withTextPrompt() {
        return this.withPromptTemplate(mapBasicPromptToStabilityFormat());
      }
      withPromptTemplate(promptTemplate) {
        return new PromptTemplateImageGenerationModel({
          model: this,
          promptTemplate
        });
      }
      withSettings(additionalSettings) {
        return new _StabilityImageGenerationModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    stabilityImageGenerationResponseSchema = z.object({
      artifacts: z.array(
        z.object({
          base64: z.string(),
          seed: z.number(),
          finishReason: z.enum(["SUCCESS", "ERROR", "CONTENT_FILTERED"])
        })
      )
    });
    WhisperCppApiConfiguration = class extends BaseUrlApiConfigurationWithDefaults {
      constructor(settings = {}) {
        super({
          ...settings,
          baseUrlDefaults: {
            protocol: "http",
            host: "127.0.0.1",
            port: "8080",
            path: ""
          }
        });
      }
    };
    WhisperCppFacade_exports = {};
    __export2(WhisperCppFacade_exports, {
      Api: () => Api11,
      Transcriber: () => Transcriber2
    });
    WhisperCppTranscriptionModel = class _WhisperCppTranscriptionModel extends AbstractModel {
      constructor(settings) {
        super({ settings });
      }
      provider = "whispercpp";
      modelName = null;
      async doTranscribe({
        audioData,
        mimeType
      }, options) {
        const rawResponse = await this.callAPI(
          {
            fileExtension: getAudioFileExtension(mimeType),
            audioData: convertDataContentToUint8Array(audioData)
          },
          options
        );
        return {
          rawResponse,
          transcription: rawResponse.text
        };
      }
      async callAPI(input, callOptions) {
        const { temperature } = this.settings;
        const api = this.settings.api ?? new WhisperCppApiConfiguration();
        const abortSignal = callOptions.run?.abortSignal;
        return callWithRetryAndThrottle({
          retry: api.retry,
          throttle: api.throttle,
          call: async () => {
            const formData = new FormData();
            formData.append(
              "file",
              new Blob([input.audioData]),
              `audio.${input.fileExtension}`
            );
            formData.append("response_format", "json");
            if (temperature != null) {
              formData.append("temperature", temperature.toString());
            }
            return postToApi({
              url: api.assembleUrl("/inference"),
              headers: api.headers({
                functionType: callOptions.functionType,
                functionId: callOptions.functionId,
                run: callOptions.run,
                callId: callOptions.callId
              }),
              body: {
                content: formData,
                values: { temperature }
              },
              failedResponseHandler,
              successfulResponseHandler,
              abortSignal
            });
          }
        });
      }
      get settingsForEvent() {
        return {
          temperature: this.settings.temperature
        };
      }
      withSettings(additionalSettings) {
        return new _WhisperCppTranscriptionModel(
          Object.assign({}, this.settings, additionalSettings)
        );
      }
    };
    whisperCppTranscriptionJsonSchema = z.union([
      z.object({ text: z.string() }),
      z.object({ error: z.string() })
    ]);
    successfulResponseHandler = async ({ response, url, requestBodyValues }) => {
      const responseBody = await response.text();
      const parsedResult = safeParseJSON({
        text: responseBody,
        schema: zodSchema(whisperCppTranscriptionJsonSchema)
      });
      if (!parsedResult.success) {
        throw new ApiCallError({
          message: "Invalid JSON response",
          cause: parsedResult.error,
          statusCode: response.status,
          responseBody,
          url,
          requestBodyValues
        });
      }
      if ("error" in parsedResult.value) {
        throw new ApiCallError({
          message: parsedResult.value.error,
          statusCode: response.status,
          responseBody,
          url,
          requestBodyValues
        });
      }
      return {
        text: parsedResult.value.text.trim()
      };
    };
    failedResponseHandler = async ({
      response,
      url,
      requestBodyValues
    }) => {
      const responseBody = await response.text();
      return new ApiCallError({
        message: responseBody,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseBody
      });
    };
    HeliconeOpenAIApiConfiguration = class extends BaseUrlApiConfiguration {
      constructor({
        baseUrl = "https://oai.hconeai.com/v1",
        openAIApiKey,
        heliconeApiKey,
        retry,
        throttle,
        customCallHeaders
      } = {}) {
        super({
          baseUrl,
          headers: {
            Authorization: `Bearer ${loadApiKey({
              apiKey: openAIApiKey,
              environmentVariableName: "OPENAI_API_KEY",
              apiKeyParameterName: "openAIApiKey",
              description: "OpenAI"
            })}`,
            "Helicone-Auth": `Bearer ${loadApiKey({
              apiKey: heliconeApiKey,
              environmentVariableName: "HELICONE_API_KEY",
              apiKeyParameterName: "heliconeApiKey",
              description: "Helicone"
            })}`
          },
          retry,
          throttle,
          customCallHeaders
        });
      }
    };
    splitAtCharacter = ({
      maxCharactersPerChunk
    }) => async ({ text: text13 }) => splitRecursively({
      maxChunkSize: maxCharactersPerChunk,
      segments: text13
    });
    splitAtToken = ({
      tokenizer,
      maxTokensPerChunk
    }) => async ({ text: text13 }) => splitRecursively({
      maxChunkSize: maxTokensPerChunk,
      segments: (await tokenizer.tokenizeWithTexts(text13)).tokenTexts
    });
    NoSuchToolDefinitionError = class extends Error {
      toolName;
      cause;
      parameters;
      constructor({
        toolName,
        parameters
      }) {
        super(
          `Tool definition '${toolName}' not found. Parameters: ${JSON.stringify(parameters)}.`
        );
        this.name = "NoSuchToolDefinitionError";
        this.toolName = toolName;
        this.parameters = parameters;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          cause: this.cause,
          stack: this.stack,
          toolName: this.toolName,
          parameter: this.parameters
        };
      }
    };
    Tool = class {
      name;
      description;
      parameters;
      returnType;
      execute;
      constructor({
        name,
        description,
        parameters,
        returnType,
        execute
      }) {
        this.name = name;
        this.description = description;
        this.parameters = parameters;
        this.returnType = returnType;
        this.execute = execute;
      }
    };
    ObjectGeneratorTool = class extends Tool {
      constructor({
        name = "object-generator",
        description,
        model,
        parameters,
        objectSchema,
        prompt
      }) {
        super({
          name,
          description,
          parameters,
          execute: async (input, options) => generateObject({
            model,
            schema: objectSchema,
            prompt: prompt(input),
            ...options
          })
        });
      }
    };
    ToolCallArgumentsValidationError = class extends Error {
      toolName;
      cause;
      args;
      constructor({
        toolName,
        args,
        cause
      }) {
        super(
          `Argument validation failed for tool '${toolName}'.
Arguments: ${JSON.stringify(args)}.
Error message: ${getErrorMessage(cause)}`
        );
        this.name = "ToolCallArgumentsValidationError";
        this.toolName = toolName;
        this.cause = cause;
        this.args = args;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          cause: this.cause,
          stack: this.stack,
          toolName: this.toolName,
          args: this.args
        };
      }
    };
    ToolCallError = class extends Error {
      toolCall;
      cause;
      constructor({
        cause,
        toolCall,
        message = getErrorMessage(cause)
      }) {
        super(`Tool call for tool '${toolCall.name}' failed: ${message}`);
        this.name = "ToolCallError";
        this.toolCall = toolCall;
        this.cause = cause;
      }
      toJSON() {
        return {
          name: this.name,
          cause: this.cause,
          message: this.message,
          stack: this.stack,
          toolCall: this.toolCall
        };
      }
    };
    ToolCallGenerationError = class extends Error {
      toolName;
      cause;
      constructor({ toolName, cause }) {
        super(
          `Tool call generation failed for tool '${toolName}'. Error message: ${getErrorMessage(cause)}`
        );
        this.name = "ToolCallsGenerationError";
        this.toolName = toolName;
        this.cause = cause;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          cause: this.cause,
          stack: this.stack,
          toolName: this.toolName
        };
      }
    };
    ToolExecutionError = class extends Error {
      toolName;
      input;
      cause;
      constructor({
        toolName,
        input,
        cause,
        message = getErrorMessage(cause)
      }) {
        super(`Error executing tool '${toolName}': ${message}`);
        this.name = "ToolExecutionError";
        this.toolName = toolName;
        this.input = input;
        this.cause = cause;
      }
      toJSON() {
        return {
          name: this.name,
          cause: this.cause,
          message: this.message,
          stack: this.stack,
          toolName: this.toolName,
          input: this.input
        };
      }
    };
    RETURN_TYPE_SCHEMA = zodSchema(
      z.object({
        results: z.array(
          z.object({
            title: z.string(),
            link: z.string().url(),
            snippet: z.string()
          })
        )
      })
    );
    createParameters = (description) => zodSchema(
      z.object({
        query: z.string().describe(description)
      })
    );
    WebSearchTool = class extends Tool {
      constructor({
        name,
        description,
        queryDescription = "Search query",
        execute
      }) {
        super({
          name,
          description,
          parameters: createParameters(queryDescription),
          returnType: RETURN_TYPE_SCHEMA,
          execute
        });
      }
    };
    DEFAULT_TOOL_PROMPT = (tool) => [
      `You are calling the function "${tool.name}".`,
      tool.description != null ? `Function description: ${tool.description}` : null,
      `Function parameters JSON schema: ${JSON.stringify(
        tool.parameters.getJsonSchema()
      )}`,
      ``,
      `You MUST answer with a JSON object that matches the JSON schema above.`
    ].filter(Boolean).join("\n");
    jsonToolCallPrompt = {
      text({
        toolPrompt
      } = {}) {
        return {
          createPrompt(prompt, tool) {
            return {
              system: createSystemPrompt2({ tool, toolPrompt }),
              instruction: prompt
            };
          },
          extractToolCall,
          withJsonOutput: ({ model, schema }) => model.withJsonOutput(schema)
        };
      },
      instruction({
        toolPrompt
      } = {}) {
        return {
          createPrompt(prompt, tool) {
            return {
              system: createSystemPrompt2({
                originalSystemPrompt: prompt.system,
                tool,
                toolPrompt
              }),
              instruction: prompt.instruction
            };
          },
          extractToolCall,
          withJsonOutput: ({ model, schema }) => model.withJsonOutput(schema)
        };
      }
    };
    textEncoder = new TextEncoder();
    VectorIndexRetriever = class _VectorIndexRetriever {
      vectorIndex;
      embeddingModel;
      settings;
      constructor({
        vectorIndex,
        embeddingModel,
        maxResults,
        similarityThreshold,
        filter
      }) {
        this.vectorIndex = vectorIndex;
        this.embeddingModel = embeddingModel;
        this.settings = {
          maxResults,
          similarityThreshold,
          filter
        };
      }
      async retrieve(query, options) {
        const embedding = await embed({
          model: this.embeddingModel,
          value: query,
          ...options
        });
        const queryResult = await this.vectorIndex.queryByVector({
          queryVector: embedding,
          maxResults: this.settings.maxResults ?? 1,
          similarityThreshold: this.settings.similarityThreshold,
          filter: this.settings?.filter
        });
        return queryResult.map((item) => item.data);
      }
      withSettings(additionalSettings) {
        return new _VectorIndexRetriever(
          Object.assign({}, this.settings, additionalSettings, {
            vectorIndex: this.vectorIndex,
            embeddingModel: this.embeddingModel
          })
        );
      }
    };
    jsonDataSchema = zodSchema(
      z.array(
        z.object({
          id: z.string(),
          vector: z.array(z.number()),
          data: z.unknown()
        })
      )
    );
    MemoryVectorIndex = class _MemoryVectorIndex {
      static async deserialize({
        serializedData,
        schema
      }) {
        const json2 = parseJSON({ text: serializedData, schema: jsonDataSchema });
        if (schema != null) {
          for (const entry of json2) {
            const validationResult = schema.validate(entry.data);
            if (!validationResult.success) {
              throw validationResult.error;
            }
          }
        }
        const vectorIndex = new _MemoryVectorIndex();
        vectorIndex.upsertMany(
          json2
        );
        return vectorIndex;
      }
      entries = /* @__PURE__ */ new Map();
      async upsertMany(data) {
        for (const entry of data) {
          this.entries.set(entry.id, entry);
        }
      }
      async queryByVector({
        queryVector,
        similarityThreshold,
        maxResults,
        filter
      }) {
        const results = [...this.entries.values()].filter((value) => filter?.(value.data) ?? true).map((entry) => ({
          id: entry.id,
          similarity: cosineSimilarity(entry.vector, queryVector),
          data: entry.data
        })).filter(
          (entry) => similarityThreshold == void 0 || entry.similarity == void 0 || entry.similarity > similarityThreshold
        );
        results.sort((a, b) => b.similarity - a.similarity);
        return results.slice(0, maxResults);
      }
      serialize() {
        return JSON.stringify([...this.entries.values()]);
      }
      asIndex() {
        return this;
      }
    };
  }
});

// ../../node_modules/zod/lib/helpers/util.js
var require_util = __commonJS({
  "../../node_modules/zod/lib/helpers/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getParsedType = exports2.ZodParsedType = exports2.objectUtil = exports2.util = void 0;
    var util2;
    (function(util3) {
      util3.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util3.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util3.assertNever = assertNever;
      util3.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util3.getValidEnumValues = (obj) => {
        const validKeys = util3.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util3.objectValues(filtered);
      };
      util3.objectValues = (obj) => {
        return util3.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util3.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util3.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util3.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util3.joinValues = joinValues;
      util3.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util2 = exports2.util || (exports2.util = {}));
    var objectUtil2;
    (function(objectUtil3) {
      objectUtil3.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
        };
      };
    })(objectUtil2 = exports2.objectUtil || (exports2.objectUtil = {}));
    exports2.ZodParsedType = util2.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    var getParsedType2 = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return exports2.ZodParsedType.undefined;
        case "string":
          return exports2.ZodParsedType.string;
        case "number":
          return isNaN(data) ? exports2.ZodParsedType.nan : exports2.ZodParsedType.number;
        case "boolean":
          return exports2.ZodParsedType.boolean;
        case "function":
          return exports2.ZodParsedType.function;
        case "bigint":
          return exports2.ZodParsedType.bigint;
        case "symbol":
          return exports2.ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return exports2.ZodParsedType.array;
          }
          if (data === null) {
            return exports2.ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return exports2.ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return exports2.ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return exports2.ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return exports2.ZodParsedType.date;
          }
          return exports2.ZodParsedType.object;
        default:
          return exports2.ZodParsedType.unknown;
      }
    };
    exports2.getParsedType = getParsedType2;
  }
});

// ../../node_modules/zod/lib/ZodError.js
var require_ZodError = __commonJS({
  "../../node_modules/zod/lib/ZodError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ZodError = exports2.quotelessJson = exports2.ZodIssueCode = void 0;
    var util_1 = require_util();
    exports2.ZodIssueCode = util_1.util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    var quotelessJson2 = (obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    };
    exports2.quotelessJson = quotelessJson2;
    var ZodError2 = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util_1.util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    exports2.ZodError = ZodError2;
    ZodError2.create = (issues) => {
      const error = new ZodError2(issues);
      return error;
    };
  }
});

// ../../node_modules/zod/lib/locales/en.js
var require_en = __commonJS({
  "../../node_modules/zod/lib/locales/en.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var ZodError_1 = require_ZodError();
    var errorMap2 = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodError_1.ZodIssueCode.invalid_type:
          if (issue.received === util_1.ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodError_1.ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_1.util.jsonStringifyReplacer)}`;
          break;
        case ZodError_1.ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util_1.util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodError_1.ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodError_1.ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util_1.util.joinValues(issue.options)}`;
          break;
        case ZodError_1.ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util_1.util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodError_1.ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodError_1.ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodError_1.ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodError_1.ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util_1.util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodError_1.ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodError_1.ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodError_1.ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodError_1.ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodError_1.ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodError_1.ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util_1.util.assertNever(issue);
      }
      return { message };
    };
    exports2.default = errorMap2;
  }
});

// ../../node_modules/zod/lib/errors.js
var require_errors = __commonJS({
  "../../node_modules/zod/lib/errors.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getErrorMap = exports2.setErrorMap = exports2.defaultErrorMap = void 0;
    var en_1 = __importDefault(require_en());
    exports2.defaultErrorMap = en_1.default;
    var overrideErrorMap2 = en_1.default;
    function setErrorMap2(map) {
      overrideErrorMap2 = map;
    }
    exports2.setErrorMap = setErrorMap2;
    function getErrorMap2() {
      return overrideErrorMap2;
    }
    exports2.getErrorMap = getErrorMap2;
  }
});

// ../../node_modules/zod/lib/helpers/parseUtil.js
var require_parseUtil = __commonJS({
  "../../node_modules/zod/lib/helpers/parseUtil.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isAsync = exports2.isValid = exports2.isDirty = exports2.isAborted = exports2.OK = exports2.DIRTY = exports2.INVALID = exports2.ParseStatus = exports2.addIssueToContext = exports2.EMPTY_PATH = exports2.makeIssue = void 0;
    var errors_1 = require_errors();
    var en_1 = __importDefault(require_en());
    var makeIssue2 = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    exports2.makeIssue = makeIssue2;
    exports2.EMPTY_PATH = [];
    function addIssueToContext2(ctx, issueData) {
      const issue = (0, exports2.makeIssue)({
        issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          (0, errors_1.getErrorMap)(),
          en_1.default
        ].filter((x) => !!x)
      });
      ctx.common.issues.push(issue);
    }
    exports2.addIssueToContext = addIssueToContext2;
    var ParseStatus2 = class {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return exports2.INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return ParseStatus2.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return exports2.INVALID;
          if (value.status === "aborted")
            return exports2.INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    exports2.ParseStatus = ParseStatus2;
    exports2.INVALID = Object.freeze({
      status: "aborted"
    });
    var DIRTY2 = (value) => ({ status: "dirty", value });
    exports2.DIRTY = DIRTY2;
    var OK2 = (value) => ({ status: "valid", value });
    exports2.OK = OK2;
    var isAborted2 = (x) => x.status === "aborted";
    exports2.isAborted = isAborted2;
    var isDirty2 = (x) => x.status === "dirty";
    exports2.isDirty = isDirty2;
    var isValid2 = (x) => x.status === "valid";
    exports2.isValid = isValid2;
    var isAsync2 = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    exports2.isAsync = isAsync2;
  }
});

// ../../node_modules/zod/lib/helpers/typeAliases.js
var require_typeAliases = __commonJS({
  "../../node_modules/zod/lib/helpers/typeAliases.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../../node_modules/zod/lib/helpers/errorUtil.js
var require_errorUtil = __commonJS({
  "../../node_modules/zod/lib/helpers/errorUtil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.errorUtil = void 0;
    var errorUtil2;
    (function(errorUtil3) {
      errorUtil3.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil3.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil2 = exports2.errorUtil || (exports2.errorUtil = {}));
  }
});

// ../../node_modules/zod/lib/types.js
var require_types = __commonJS({
  "../../node_modules/zod/lib/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.date = exports2.boolean = exports2.bigint = exports2.array = exports2.any = exports2.coerce = exports2.ZodFirstPartyTypeKind = exports2.late = exports2.ZodSchema = exports2.Schema = exports2.custom = exports2.ZodReadonly = exports2.ZodPipeline = exports2.ZodBranded = exports2.BRAND = exports2.ZodNaN = exports2.ZodCatch = exports2.ZodDefault = exports2.ZodNullable = exports2.ZodOptional = exports2.ZodTransformer = exports2.ZodEffects = exports2.ZodPromise = exports2.ZodNativeEnum = exports2.ZodEnum = exports2.ZodLiteral = exports2.ZodLazy = exports2.ZodFunction = exports2.ZodSet = exports2.ZodMap = exports2.ZodRecord = exports2.ZodTuple = exports2.ZodIntersection = exports2.ZodDiscriminatedUnion = exports2.ZodUnion = exports2.ZodObject = exports2.ZodArray = exports2.ZodVoid = exports2.ZodNever = exports2.ZodUnknown = exports2.ZodAny = exports2.ZodNull = exports2.ZodUndefined = exports2.ZodSymbol = exports2.ZodDate = exports2.ZodBoolean = exports2.ZodBigInt = exports2.ZodNumber = exports2.ZodString = exports2.ZodType = void 0;
    exports2.NEVER = exports2.void = exports2.unknown = exports2.union = exports2.undefined = exports2.tuple = exports2.transformer = exports2.symbol = exports2.string = exports2.strictObject = exports2.set = exports2.record = exports2.promise = exports2.preprocess = exports2.pipeline = exports2.ostring = exports2.optional = exports2.onumber = exports2.oboolean = exports2.object = exports2.number = exports2.nullable = exports2.null = exports2.never = exports2.nativeEnum = exports2.nan = exports2.map = exports2.literal = exports2.lazy = exports2.intersection = exports2.instanceof = exports2.function = exports2.enum = exports2.effect = exports2.discriminatedUnion = void 0;
    var errors_1 = require_errors();
    var errorUtil_1 = require_errorUtil();
    var parseUtil_1 = require_parseUtil();
    var util_1 = require_util();
    var ZodError_1 = require_ZodError();
    var ParseInputLazyPath2 = class {
      constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (this._key instanceof Array) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    var handleResult2 = (ctx, result) => {
      if ((0, parseUtil_1.isValid)(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError_1.ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    function processCreateParams2(params) {
      if (!params)
        return {};
      const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
      if (errorMap2 && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
      }
      if (errorMap2)
        return { errorMap: errorMap2, description };
      const customMap = (iss, ctx) => {
        if (iss.code !== "invalid_type")
          return { message: ctx.defaultError };
        if (typeof ctx.data === "undefined") {
          return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
        }
        return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
      };
      return { errorMap: customMap, description };
    }
    var ZodType2 = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return (0, util_1.getParsedType)(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: (0, util_1.getParsedType)(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new parseUtil_1.ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if ((0, parseUtil_1.isAsync)(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_1.getParsedType)(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult2(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_1.getParsedType)(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await ((0, parseUtil_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult2(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodError_1.ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects2({
          schema: this,
          typeName: ZodFirstPartyTypeKind2.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional2.create(this, this._def);
      }
      nullable() {
        return ZodNullable2.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray2.create(this, this._def);
      }
      promise() {
        return ZodPromise2.create(this, this._def);
      }
      or(option) {
        return ZodUnion2.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection2.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects2({
          ...processCreateParams2(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind2.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault2({
          ...processCreateParams2(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind2.ZodDefault
        });
      }
      brand() {
        return new ZodBranded2({
          typeName: ZodFirstPartyTypeKind2.ZodBranded,
          type: this,
          ...processCreateParams2(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch2({
          ...processCreateParams2(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind2.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline2.create(this, target);
      }
      readonly() {
        return ZodReadonly2.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    exports2.ZodType = ZodType2;
    exports2.Schema = ZodType2;
    exports2.ZodSchema = ZodType2;
    var cuidRegex2 = /^c[^\s-]{8,}$/i;
    var cuid2Regex2 = /^[a-z][a-z0-9]*$/;
    var ulidRegex2 = /^[0-9A-HJKMNP-TV-Z]{26}$/;
    var uuidRegex2 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    var emailRegex2 = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    var _emojiRegex2 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    var emojiRegex2;
    var ipv4Regex2 = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
    var ipv6Regex2 = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    var datetimeRegex2 = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    function isValidIP2(ip, version) {
      if ((version === "v4" || !version) && ipv4Regex2.test(ip)) {
        return true;
      }
      if ((version === "v6" || !version) && ipv6Regex2.test(ip)) {
        return true;
      }
      return false;
    }
    var ZodString2 = class extends ZodType2 {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(
            ctx2,
            {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.string,
              received: ctx2.parsedType
            }
          );
          return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "email",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex2) {
              emojiRegex2 = new RegExp(_emojiRegex2, "u");
            }
            if (!emojiRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "emoji",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "uuid",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "cuid",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "cuid2",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "ulid",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "url",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "regex",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex2(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP2(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "ip",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodError_1.ZodIssueCode.invalid_string,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new ZodString2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil_1.errorUtil.errToObj(options) });
      }
      datetime(options) {
        var _a;
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
          offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
          ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      includes(value, options) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options === null || options === void 0 ? void 0 : options.position,
          ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      nonempty(message) {
        return this.min(1, errorUtil_1.errorUtil.errToObj(message));
      }
      trim() {
        return new ZodString2({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new ZodString2({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new ZodString2({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    exports2.ZodString = ZodString2;
    ZodString2.create = (params) => {
      var _a;
      return new ZodString2({
        checks: [],
        typeName: ZodFirstPartyTypeKind2.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams2(params)
      });
    };
    function floatSafeRemainder2(val, step) {
      const valDecCount = (val.toString().split(".")[1] || "").length;
      const stepDecCount = (step.toString().split(".")[1] || "").length;
      const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
      const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
      const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
      return valInt % stepInt / Math.pow(10, decCount);
    }
    var ZodNumber2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.number,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        let ctx = void 0;
        const status = new parseUtil_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util_1.util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder2(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new ZodNumber2({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil_1.errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodNumber2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil_1.errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util_1.util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    exports2.ZodNumber = ZodNumber2;
    ZodNumber2.create = (params) => {
      return new ZodNumber2({
        checks: [],
        typeName: ZodFirstPartyTypeKind2.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams2(params)
      });
    };
    var ZodBigInt2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.bigint) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.bigint,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        let ctx = void 0;
        const status = new parseUtil_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new ZodBigInt2({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil_1.errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodBigInt2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    exports2.ZodBigInt = ZodBigInt2;
    ZodBigInt2.create = (params) => {
      var _a;
      return new ZodBigInt2({
        checks: [],
        typeName: ZodFirstPartyTypeKind2.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams2(params)
      });
    };
    var ZodBoolean2 = class extends ZodType2 {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodBoolean = ZodBoolean2;
    ZodBoolean2.create = (params) => {
      return new ZodBoolean2({
        typeName: ZodFirstPartyTypeKind2.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams2(params)
      });
    };
    var ZodDate2 = class extends ZodType2 {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.date,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_date
          });
          return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new ZodDate2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    exports2.ZodDate = ZodDate2;
    ZodDate2.create = (params) => {
      return new ZodDate2({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind2.ZodDate,
        ...processCreateParams2(params)
      });
    };
    var ZodSymbol2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodSymbol = ZodSymbol2;
    ZodSymbol2.create = (params) => {
      return new ZodSymbol2({
        typeName: ZodFirstPartyTypeKind2.ZodSymbol,
        ...processCreateParams2(params)
      });
    };
    var ZodUndefined2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodUndefined = ZodUndefined2;
    ZodUndefined2.create = (params) => {
      return new ZodUndefined2({
        typeName: ZodFirstPartyTypeKind2.ZodUndefined,
        ...processCreateParams2(params)
      });
    };
    var ZodNull2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.null,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodNull = ZodNull2;
    ZodNull2.create = (params) => {
      return new ZodNull2({
        typeName: ZodFirstPartyTypeKind2.ZodNull,
        ...processCreateParams2(params)
      });
    };
    var ZodAny2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodAny = ZodAny2;
    ZodAny2.create = (params) => {
      return new ZodAny2({
        typeName: ZodFirstPartyTypeKind2.ZodAny,
        ...processCreateParams2(params)
      });
    };
    var ZodUnknown2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodUnknown = ZodUnknown2;
    ZodUnknown2.create = (params) => {
      return new ZodUnknown2({
        typeName: ZodFirstPartyTypeKind2.ZodUnknown,
        ...processCreateParams2(params)
      });
    };
    var ZodNever2 = class extends ZodType2 {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_1.addIssueToContext)(ctx, {
          code: ZodError_1.ZodIssueCode.invalid_type,
          expected: util_1.ZodParsedType.never,
          received: ctx.parsedType
        });
        return parseUtil_1.INVALID;
      }
    };
    exports2.ZodNever = ZodNever2;
    ZodNever2.create = (params) => {
      return new ZodNever2({
        typeName: ZodFirstPartyTypeKind2.ZodNever,
        ...processCreateParams2(params)
      });
    };
    var ZodVoid2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.void,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodVoid = ZodVoid2;
    ZodVoid2.create = (params) => {
      return new ZodVoid2({
        typeName: ZodFirstPartyTypeKind2.ZodVoid,
        ...processCreateParams2(params)
      });
    };
    var ZodArray2 = class extends ZodType2 {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: tooBig ? ZodError_1.ZodIssueCode.too_big : ZodError_1.ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath2(ctx, item, ctx.path, i));
          })).then((result2) => {
            return parseUtil_1.ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath2(ctx, item, ctx.path, i));
        });
        return parseUtil_1.ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new ZodArray2({
          ...this._def,
          minLength: { value: minLength, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new ZodArray2({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new ZodArray2({
          ...this._def,
          exactLength: { value: len, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports2.ZodArray = ZodArray2;
    ZodArray2.create = (schema, params) => {
      return new ZodArray2({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind2.ZodArray,
        ...processCreateParams2(params)
      });
    };
    function deepPartialify2(schema) {
      if (schema instanceof ZodObject2) {
        const newShape = {};
        for (const key in schema.shape) {
          const fieldSchema = schema.shape[key];
          newShape[key] = ZodOptional2.create(deepPartialify2(fieldSchema));
        }
        return new ZodObject2({
          ...schema._def,
          shape: () => newShape
        });
      } else if (schema instanceof ZodArray2) {
        return new ZodArray2({
          ...schema._def,
          type: deepPartialify2(schema.element)
        });
      } else if (schema instanceof ZodOptional2) {
        return ZodOptional2.create(deepPartialify2(schema.unwrap()));
      } else if (schema instanceof ZodNullable2) {
        return ZodNullable2.create(deepPartialify2(schema.unwrap()));
      } else if (schema instanceof ZodTuple2) {
        return ZodTuple2.create(schema.items.map((item) => deepPartialify2(item)));
      } else {
        return schema;
      }
    }
    var ZodObject2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util_1.util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.object,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever2 && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath2(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever2) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath2(ctx, value, ctx.path, key)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              syncPairs.push({
                key,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil_1.errorUtil.errToObj;
        return new ZodObject2({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil_1.errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new ZodObject2({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new ZodObject2({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      extend(augmentation) {
        return new ZodObject2({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      merge(merging) {
        const merged = new ZodObject2({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind2.ZodObject
        });
        return merged;
      }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      catchall(index) {
        return new ZodObject2({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        util_1.util.objectKeys(mask).forEach((key) => {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject2({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util_1.util.objectKeys(this.shape).forEach((key) => {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject2({
          ...this._def,
          shape: () => shape
        });
      }
      deepPartial() {
        return deepPartialify2(this);
      }
      partial(mask) {
        const newShape = {};
        util_1.util.objectKeys(this.shape).forEach((key) => {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        });
        return new ZodObject2({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util_1.util.objectKeys(this.shape).forEach((key) => {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional2) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        });
        return new ZodObject2({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum2(util_1.util.objectKeys(this.shape));
      }
    };
    exports2.ZodObject = ZodObject2;
    ZodObject2.create = (shape, params) => {
      return new ZodObject2({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever2.create(),
        typeName: ZodFirstPartyTypeKind2.ZodObject,
        ...processCreateParams2(params)
      });
    };
    ZodObject2.strictCreate = (shape, params) => {
      return new ZodObject2({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever2.create(),
        typeName: ZodFirstPartyTypeKind2.ZodObject,
        ...processCreateParams2(params)
      });
    };
    ZodObject2.lazycreate = (shape, params) => {
      return new ZodObject2({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever2.create(),
        typeName: ZodFirstPartyTypeKind2.ZodObject,
        ...processCreateParams2(params)
      });
    };
    var ZodUnion2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError_1.ZodError(result.ctx.common.issues));
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError_1.ZodError(issues2));
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_1.INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    exports2.ZodUnion = ZodUnion2;
    ZodUnion2.create = (types, params) => {
      return new ZodUnion2({
        options: types,
        typeName: ZodFirstPartyTypeKind2.ZodUnion,
        ...processCreateParams2(params)
      });
    };
    var getDiscriminator2 = (type) => {
      if (type instanceof ZodLazy2) {
        return getDiscriminator2(type.schema);
      } else if (type instanceof ZodEffects2) {
        return getDiscriminator2(type.innerType());
      } else if (type instanceof ZodLiteral2) {
        return [type.value];
      } else if (type instanceof ZodEnum2) {
        return type.options;
      } else if (type instanceof ZodNativeEnum2) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault2) {
        return getDiscriminator2(type._def.innerType);
      } else if (type instanceof ZodUndefined2) {
        return [void 0];
      } else if (type instanceof ZodNull2) {
        return [null];
      } else {
        return null;
      }
    };
    var ZodDiscriminatedUnion2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator2(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new ZodDiscriminatedUnion2({
          typeName: ZodFirstPartyTypeKind2.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams2(params)
        });
      }
    };
    exports2.ZodDiscriminatedUnion = ZodDiscriminatedUnion2;
    function mergeValues2(a, b) {
      const aType = (0, util_1.getParsedType)(a);
      const bType = (0, util_1.getParsedType)(b);
      if (a === b) {
        return { valid: true, data: a };
      } else if (aType === util_1.ZodParsedType.object && bType === util_1.ZodParsedType.object) {
        const bKeys = util_1.util.objectKeys(b);
        const sharedKeys = util_1.util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
          const sharedValue = mergeValues2(a[key], b[key]);
          if (!sharedValue.valid) {
            return { valid: false };
          }
          newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
      } else if (aType === util_1.ZodParsedType.array && bType === util_1.ZodParsedType.array) {
        if (a.length !== b.length) {
          return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
          const itemA = a[index];
          const itemB = b[index];
          const sharedValue = mergeValues2(itemA, itemB);
          if (!sharedValue.valid) {
            return { valid: false };
          }
          newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
      } else if (aType === util_1.ZodParsedType.date && bType === util_1.ZodParsedType.date && +a === +b) {
        return { valid: true, data: a };
      } else {
        return { valid: false };
      }
    }
    var ZodIntersection2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if ((0, parseUtil_1.isAborted)(parsedLeft) || (0, parseUtil_1.isAborted)(parsedRight)) {
            return parseUtil_1.INVALID;
          }
          const merged = mergeValues2(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_intersection_types
            });
            return parseUtil_1.INVALID;
          }
          if ((0, parseUtil_1.isDirty)(parsedLeft) || (0, parseUtil_1.isDirty)(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    exports2.ZodIntersection = ZodIntersection2;
    ZodIntersection2.create = (left, right, params) => {
      return new ZodIntersection2({
        left,
        right,
        typeName: ZodFirstPartyTypeKind2.ZodIntersection,
        ...processCreateParams2(params)
      });
    };
    var ZodTuple2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return parseUtil_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath2(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return parseUtil_1.ParseStatus.mergeArray(status, results);
          });
        } else {
          return parseUtil_1.ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new ZodTuple2({
          ...this._def,
          rest
        });
      }
    };
    exports2.ZodTuple = ZodTuple2;
    ZodTuple2.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple2({
        items: schemas,
        typeName: ZodFirstPartyTypeKind2.ZodTuple,
        rest: null,
        ...processCreateParams2(params)
      });
    };
    var ZodRecord2 = class extends ZodType2 {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath2(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath2(ctx, ctx.data[key], ctx.path, key))
          });
        }
        if (ctx.common.async) {
          return parseUtil_1.ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType2) {
          return new ZodRecord2({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind2.ZodRecord,
            ...processCreateParams2(third)
          });
        }
        return new ZodRecord2({
          keyType: ZodString2.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind2.ZodRecord,
          ...processCreateParams2(second)
        });
      }
    };
    exports2.ZodRecord = ZodRecord2;
    var ZodMap2 = class extends ZodType2 {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.map) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.map,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath2(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath2(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return parseUtil_1.INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return parseUtil_1.INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    exports2.ZodMap = ZodMap2;
    ZodMap2.create = (keyType, valueType, params) => {
      return new ZodMap2({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind2.ZodMap,
        ...processCreateParams2(params)
      });
    };
    var ZodSet2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.set) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.set,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return parseUtil_1.INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath2(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new ZodSet2({
          ...this._def,
          minSize: { value: minSize, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new ZodSet2({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports2.ZodSet = ZodSet2;
    ZodSet2.create = (valueType, params) => {
      return new ZodSet2({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind2.ZodSet,
        ...processCreateParams2(params)
      });
    };
    var ZodFunction2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.function) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.function,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        function makeArgsIssue(args, error) {
          return (0, parseUtil_1.makeIssue)({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              (0, errors_1.getErrorMap)(),
              errors_1.defaultErrorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodError_1.ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return (0, parseUtil_1.makeIssue)({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              (0, errors_1.getErrorMap)(),
              errors_1.defaultErrorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodError_1.ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise2) {
          const me = this;
          return (0, parseUtil_1.OK)(async function(...args) {
            const error = new ZodError_1.ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return (0, parseUtil_1.OK)(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new ZodFunction2({
          ...this._def,
          args: ZodTuple2.create(items).rest(ZodUnknown2.create())
        });
      }
      returns(returnType) {
        return new ZodFunction2({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new ZodFunction2({
          args: args ? args : ZodTuple2.create([]).rest(ZodUnknown2.create()),
          returns: returns || ZodUnknown2.create(),
          typeName: ZodFirstPartyTypeKind2.ZodFunction,
          ...processCreateParams2(params)
        });
      }
    };
    exports2.ZodFunction = ZodFunction2;
    var ZodLazy2 = class extends ZodType2 {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    exports2.ZodLazy = ZodLazy2;
    ZodLazy2.create = (getter, params) => {
      return new ZodLazy2({
        getter,
        typeName: ZodFirstPartyTypeKind2.ZodLazy,
        ...processCreateParams2(params)
      });
    };
    var ZodLiteral2 = class extends ZodType2 {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_1.ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return parseUtil_1.INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    exports2.ZodLiteral = ZodLiteral2;
    ZodLiteral2.create = (value, params) => {
      return new ZodLiteral2({
        value,
        typeName: ZodFirstPartyTypeKind2.ZodLiteral,
        ...processCreateParams2(params)
      });
    };
    function createZodEnum2(values, params) {
      return new ZodEnum2({
        values,
        typeName: ZodFirstPartyTypeKind2.ZodEnum,
        ...processCreateParams2(params)
      });
    }
    var ZodEnum2 = class extends ZodType2 {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_1.addIssueToContext)(ctx, {
            expected: util_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_1.ZodIssueCode.invalid_type
          });
          return parseUtil_1.INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values) {
        return ZodEnum2.create(values);
      }
      exclude(values) {
        return ZodEnum2.create(this.options.filter((opt) => !values.includes(opt)));
      }
    };
    exports2.ZodEnum = ZodEnum2;
    ZodEnum2.create = createZodEnum2;
    var ZodNativeEnum2 = class extends ZodType2 {
      _parse(input) {
        const nativeEnumValues = util_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_1.ZodParsedType.string && ctx.parsedType !== util_1.ZodParsedType.number) {
          const expectedValues = util_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            expected: util_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_1.ZodIssueCode.invalid_type
          });
          return parseUtil_1.INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    exports2.ZodNativeEnum = ZodNativeEnum2;
    ZodNativeEnum2.create = (values, params) => {
      return new ZodNativeEnum2({
        values,
        typeName: ZodFirstPartyTypeKind2.ZodNativeEnum,
        ...processCreateParams2(params)
      });
    };
    var ZodPromise2 = class extends ZodType2 {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.promise && ctx.common.async === false) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.promise,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const promisified = ctx.parsedType === util_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0, parseUtil_1.OK)(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    exports2.ZodPromise = ZodPromise2;
    ZodPromise2.create = (schema, params) => {
      return new ZodPromise2({
        type: schema,
        typeName: ZodFirstPartyTypeKind2.ZodPromise,
        ...processCreateParams2(params)
      });
    };
    var ZodEffects2 = class extends ZodType2 {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind2.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            (0, parseUtil_1.addIssueToContext)(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.issues.length) {
            return {
              status: "dirty",
              value: ctx.data
            };
          }
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return parseUtil_1.INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return parseUtil_1.INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!(0, parseUtil_1.isValid)(base))
              return base;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!(0, parseUtil_1.isValid)(base))
                return base;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util_1.util.assertNever(effect);
      }
    };
    exports2.ZodEffects = ZodEffects2;
    exports2.ZodTransformer = ZodEffects2;
    ZodEffects2.create = (schema, effect, params) => {
      return new ZodEffects2({
        schema,
        typeName: ZodFirstPartyTypeKind2.ZodEffects,
        effect,
        ...processCreateParams2(params)
      });
    };
    ZodEffects2.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects2({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind2.ZodEffects,
        ...processCreateParams2(params)
      });
    };
    var ZodOptional2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.undefined) {
          return (0, parseUtil_1.OK)(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports2.ZodOptional = ZodOptional2;
    ZodOptional2.create = (type, params) => {
      return new ZodOptional2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodOptional,
        ...processCreateParams2(params)
      });
    };
    var ZodNullable2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.null) {
          return (0, parseUtil_1.OK)(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports2.ZodNullable = ZodNullable2;
    ZodNullable2.create = (type, params) => {
      return new ZodNullable2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodNullable,
        ...processCreateParams2(params)
      });
    };
    var ZodDefault2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_1.ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    exports2.ZodDefault = ZodDefault2;
    ZodDefault2.create = (type, params) => {
      return new ZodDefault2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams2(params)
      });
    };
    var ZodCatch2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if ((0, parseUtil_1.isAsync)(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError_1.ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError_1.ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    exports2.ZodCatch = ZodCatch2;
    ZodCatch2.create = (type, params) => {
      return new ZodCatch2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams2(params)
      });
    };
    var ZodNaN2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.nan,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    exports2.ZodNaN = ZodNaN2;
    ZodNaN2.create = (params) => {
      return new ZodNaN2({
        typeName: ZodFirstPartyTypeKind2.ZodNaN,
        ...processCreateParams2(params)
      });
    };
    exports2.BRAND = Symbol("zod_brand");
    var ZodBranded2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    exports2.ZodBranded = ZodBranded2;
    var ZodPipeline2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return parseUtil_1.INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return (0, parseUtil_1.DIRTY)(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return parseUtil_1.INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new ZodPipeline2({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind2.ZodPipeline
        });
      }
    };
    exports2.ZodPipeline = ZodPipeline2;
    var ZodReadonly2 = class extends ZodType2 {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        if ((0, parseUtil_1.isValid)(result)) {
          result.value = Object.freeze(result.value);
        }
        return result;
      }
    };
    exports2.ZodReadonly = ZodReadonly2;
    ZodReadonly2.create = (type, params) => {
      return new ZodReadonly2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodReadonly,
        ...processCreateParams2(params)
      });
    };
    var custom2 = (check, params = {}, fatal) => {
      if (check)
        return ZodAny2.create().superRefine((data, ctx) => {
          var _a, _b;
          if (!check(data)) {
            const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
            const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
            const p2 = typeof p === "string" ? { message: p } : p;
            ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
          }
        });
      return ZodAny2.create();
    };
    exports2.custom = custom2;
    exports2.late = {
      object: ZodObject2.lazycreate
    };
    var ZodFirstPartyTypeKind2;
    (function(ZodFirstPartyTypeKind3) {
      ZodFirstPartyTypeKind3["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind3["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind3["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind3["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind3["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind3["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind3["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind3["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind3["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind3["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind3["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind3["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind3["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind3["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind3["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind3["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind3["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind3["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind3["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind3["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind3["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind3["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind3["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind3["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind3["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind3["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind3["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind3["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind3["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind3["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind3["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind3["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind3["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind3["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind3["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind3["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind2 = exports2.ZodFirstPartyTypeKind || (exports2.ZodFirstPartyTypeKind = {}));
    var instanceOfType2 = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => (0, exports2.custom)((data) => data instanceof cls, params);
    exports2.instanceof = instanceOfType2;
    var stringType2 = ZodString2.create;
    exports2.string = stringType2;
    var numberType2 = ZodNumber2.create;
    exports2.number = numberType2;
    var nanType2 = ZodNaN2.create;
    exports2.nan = nanType2;
    var bigIntType2 = ZodBigInt2.create;
    exports2.bigint = bigIntType2;
    var booleanType2 = ZodBoolean2.create;
    exports2.boolean = booleanType2;
    var dateType2 = ZodDate2.create;
    exports2.date = dateType2;
    var symbolType2 = ZodSymbol2.create;
    exports2.symbol = symbolType2;
    var undefinedType2 = ZodUndefined2.create;
    exports2.undefined = undefinedType2;
    var nullType2 = ZodNull2.create;
    exports2.null = nullType2;
    var anyType2 = ZodAny2.create;
    exports2.any = anyType2;
    var unknownType2 = ZodUnknown2.create;
    exports2.unknown = unknownType2;
    var neverType2 = ZodNever2.create;
    exports2.never = neverType2;
    var voidType2 = ZodVoid2.create;
    exports2.void = voidType2;
    var arrayType2 = ZodArray2.create;
    exports2.array = arrayType2;
    var objectType2 = ZodObject2.create;
    exports2.object = objectType2;
    var strictObjectType2 = ZodObject2.strictCreate;
    exports2.strictObject = strictObjectType2;
    var unionType2 = ZodUnion2.create;
    exports2.union = unionType2;
    var discriminatedUnionType2 = ZodDiscriminatedUnion2.create;
    exports2.discriminatedUnion = discriminatedUnionType2;
    var intersectionType2 = ZodIntersection2.create;
    exports2.intersection = intersectionType2;
    var tupleType2 = ZodTuple2.create;
    exports2.tuple = tupleType2;
    var recordType2 = ZodRecord2.create;
    exports2.record = recordType2;
    var mapType2 = ZodMap2.create;
    exports2.map = mapType2;
    var setType2 = ZodSet2.create;
    exports2.set = setType2;
    var functionType2 = ZodFunction2.create;
    exports2.function = functionType2;
    var lazyType2 = ZodLazy2.create;
    exports2.lazy = lazyType2;
    var literalType2 = ZodLiteral2.create;
    exports2.literal = literalType2;
    var enumType2 = ZodEnum2.create;
    exports2.enum = enumType2;
    var nativeEnumType2 = ZodNativeEnum2.create;
    exports2.nativeEnum = nativeEnumType2;
    var promiseType2 = ZodPromise2.create;
    exports2.promise = promiseType2;
    var effectsType2 = ZodEffects2.create;
    exports2.effect = effectsType2;
    exports2.transformer = effectsType2;
    var optionalType2 = ZodOptional2.create;
    exports2.optional = optionalType2;
    var nullableType2 = ZodNullable2.create;
    exports2.nullable = nullableType2;
    var preprocessType2 = ZodEffects2.createWithPreprocess;
    exports2.preprocess = preprocessType2;
    var pipelineType2 = ZodPipeline2.create;
    exports2.pipeline = pipelineType2;
    var ostring2 = () => stringType2().optional();
    exports2.ostring = ostring2;
    var onumber2 = () => numberType2().optional();
    exports2.onumber = onumber2;
    var oboolean2 = () => booleanType2().optional();
    exports2.oboolean = oboolean2;
    exports2.coerce = {
      string: (arg) => ZodString2.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber2.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean2.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt2.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate2.create({ ...arg, coerce: true })
    };
    exports2.NEVER = parseUtil_1.INVALID;
  }
});

// ../../node_modules/zod/lib/external.js
var require_external = __commonJS({
  "../../node_modules/zod/lib/external.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_errors(), exports2);
    __exportStar(require_parseUtil(), exports2);
    __exportStar(require_typeAliases(), exports2);
    __exportStar(require_util(), exports2);
    __exportStar(require_types(), exports2);
    __exportStar(require_ZodError(), exports2);
  }
});

// ../../node_modules/zod/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/zod/lib/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.z = void 0;
    var z2 = __importStar2(require_external());
    exports2.z = z2;
    __exportStar(require_external(), exports2);
    exports2.default = z2;
  }
});

// build/ai/AIClient.js
var require_AIClient = __commonJS({
  "build/ai/AIClient.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AIClient = void 0;
    var modelfusion_1 = (init_modelfusion(), __toCommonJS(modelfusion_exports));
    var vscode2 = __importStar2(require("vscode"));
    var zod_1 = require_lib();
    function getOpenAIBaseUrl() {
      return vscode2.workspace.getConfiguration("pearai.openAI").get("baseUrl", "https://api.openai.com/v1/").replace(/\/$/, "");
    }
    function getModel() {
      return zod_1.z.enum([
        "gpt-4",
        "gpt-4-32k",
        "gpt-4-1106-preview",
        "gpt-4-0125-preview",
        "gpt-4-turbo-preview",
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-1106",
        "gpt-3.5-turbo-0125",
        "llama.cpp"
      ]).parse(vscode2.workspace.getConfiguration("pearai").get("model"));
    }
    var AIClient = class {
      constructor({ apiKeyManager, logger }) {
        this.apiKeyManager = apiKeyManager;
        this.logger = logger;
      }
      async getOpenAIApiConfiguration() {
        const apiKey = await this.apiKeyManager.getOpenAIApiKey();
        if (apiKey == void 0) {
          throw new Error("No OpenAI API key found. Please enter your OpenAI API key with the 'PearAI: Enter OpenAI API key' command.");
        }
        return modelfusion_1.openai.Api({
          baseUrl: getOpenAIBaseUrl(),
          apiKey
        });
      }
      async getTextStreamingModel({ maxTokens, stop, temperature = 0 }) {
        const modelConfiguration = getModel();
        return modelConfiguration === "llama.cpp" ? modelfusion_1.llamacpp.CompletionTextGenerator({
          promptTemplate: modelfusion_1.llamacpp.prompt.Llama2,
          maxGenerationTokens: maxTokens,
          stopSequences: stop,
          temperature
        }).withInstructionPrompt() : modelfusion_1.openai.ChatTextGenerator({
          api: await this.getOpenAIApiConfiguration(),
          model: modelConfiguration,
          maxGenerationTokens: maxTokens,
          stopSequences: stop,
          temperature,
          frequencyPenalty: 0,
          presencePenalty: 0
        }).withInstructionPrompt();
      }
      async streamText({ prompt, maxTokens, stop, temperature = 0 }) {
        this.logger.log(["--- Start prompt ---", prompt, "--- End prompt ---"]);
        return (0, modelfusion_1.streamText)({
          model: await this.getTextStreamingModel({ maxTokens, stop, temperature }),
          prompt: { instruction: prompt }
        });
      }
      async generateEmbedding({ input }) {
        try {
          const { embedding, rawResponse } = await (0, modelfusion_1.embed)({
            model: modelfusion_1.openai.TextEmbedder({
              api: await this.getOpenAIApiConfiguration(),
              model: "text-embedding-ada-002"
            }),
            value: input,
            fullResponse: true
          });
          return {
            type: "success",
            embedding,
            totalTokenCount: rawResponse.usage?.total_tokens
          };
        } catch (error) {
          console.log(error);
          return {
            type: "error",
            errorMessage: error?.message
          };
        }
      }
    };
    exports2.AIClient = AIClient;
  }
});

// build/ai/ApiKeyManager.js
var require_ApiKeyManager = __commonJS({
  "build/ai/ApiKeyManager.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApiKeyManager = void 0;
    var vscode2 = __importStar2(require("vscode"));
    var OPEN_AI_API_KEY_SECRET_KEY = "pearai.openAI.apiKey";
    var ApiKeyManager = class {
      constructor({ secretStorage }) {
        this.messageEmitter = new vscode2.EventEmitter();
        this.onUpdate = (listener, thisArg, disposables) => {
          this.messageHandler?.dispose();
          this.messageHandler = this.messageEmitter.event(listener, thisArg, disposables);
          return this.messageHandler;
        };
        this.secretStorage = secretStorage;
      }
      async clearOpenAIApiKey() {
        await this.secretStorage.delete(OPEN_AI_API_KEY_SECRET_KEY);
        this.messageEmitter.fire("clear key");
      }
      async getOpenAIApiKey() {
        return this.secretStorage.get(OPEN_AI_API_KEY_SECRET_KEY);
      }
      async hasOpenAIApiKey() {
        const key = await this.getOpenAIApiKey();
        return key !== void 0;
      }
      async storeApiKey(apiKey) {
        return this.secretStorage.store(OPEN_AI_API_KEY_SECRET_KEY, apiKey);
      }
      async enterOpenAIApiKey() {
        await this.clearOpenAIApiKey();
        const apiKey = await vscode2.window.showInputBox({
          title: "Enter your Open AI API key",
          ignoreFocusOut: true,
          placeHolder: "Open AI API key"
        });
        if (apiKey == null) {
          return;
        }
        await this.storeApiKey(apiKey);
        this.messageEmitter.fire("set key");
        vscode2.window.showInformationMessage("OpenAI API key stored.");
      }
    };
    exports2.ApiKeyManager = ApiKeyManager;
  }
});

// ../common/node_modules/zod/lib/helpers/util.js
var require_util2 = __commonJS({
  "../common/node_modules/zod/lib/helpers/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getParsedType = exports2.ZodParsedType = exports2.util = void 0;
    var util2;
    (function(util3) {
      util3.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util3.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util3.assertNever = assertNever;
      util3.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util3.getValidEnumValues = (obj) => {
        const validKeys = util3.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util3.objectValues(filtered);
      };
      util3.objectValues = (obj) => {
        return util3.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util3.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util3.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util3.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util3.joinValues = joinValues;
      util3.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util2 = exports2.util || (exports2.util = {}));
    exports2.ZodParsedType = util2.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    var getParsedType2 = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return exports2.ZodParsedType.undefined;
        case "string":
          return exports2.ZodParsedType.string;
        case "number":
          return isNaN(data) ? exports2.ZodParsedType.nan : exports2.ZodParsedType.number;
        case "boolean":
          return exports2.ZodParsedType.boolean;
        case "function":
          return exports2.ZodParsedType.function;
        case "bigint":
          return exports2.ZodParsedType.bigint;
        case "symbol":
          return exports2.ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return exports2.ZodParsedType.array;
          }
          if (data === null) {
            return exports2.ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return exports2.ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return exports2.ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return exports2.ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return exports2.ZodParsedType.date;
          }
          return exports2.ZodParsedType.object;
        default:
          return exports2.ZodParsedType.unknown;
      }
    };
    exports2.getParsedType = getParsedType2;
  }
});

// ../common/node_modules/zod/lib/ZodError.js
var require_ZodError2 = __commonJS({
  "../common/node_modules/zod/lib/ZodError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ZodError = exports2.quotelessJson = exports2.ZodIssueCode = void 0;
    var util_1 = require_util2();
    exports2.ZodIssueCode = util_1.util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    var quotelessJson2 = (obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    };
    exports2.quotelessJson = quotelessJson2;
    var ZodError2 = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util_1.util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    exports2.ZodError = ZodError2;
    ZodError2.create = (issues) => {
      const error = new ZodError2(issues);
      return error;
    };
  }
});

// ../common/node_modules/zod/lib/locales/en.js
var require_en2 = __commonJS({
  "../common/node_modules/zod/lib/locales/en.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util2();
    var ZodError_1 = require_ZodError2();
    var errorMap2 = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodError_1.ZodIssueCode.invalid_type:
          if (issue.received === util_1.ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodError_1.ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_1.util.jsonStringifyReplacer)}`;
          break;
        case ZodError_1.ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util_1.util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodError_1.ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodError_1.ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util_1.util.joinValues(issue.options)}`;
          break;
        case ZodError_1.ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util_1.util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodError_1.ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodError_1.ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodError_1.ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodError_1.ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util_1.util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodError_1.ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(issue.minimum)}`;
          else
            message = "Invalid input";
          break;
        case ZodError_1.ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(issue.maximum)}`;
          else
            message = "Invalid input";
          break;
        case ZodError_1.ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodError_1.ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodError_1.ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodError_1.ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util_1.util.assertNever(issue);
      }
      return { message };
    };
    exports2.default = errorMap2;
  }
});

// ../common/node_modules/zod/lib/errors.js
var require_errors2 = __commonJS({
  "../common/node_modules/zod/lib/errors.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getErrorMap = exports2.setErrorMap = exports2.defaultErrorMap = void 0;
    var en_1 = __importDefault(require_en2());
    exports2.defaultErrorMap = en_1.default;
    var overrideErrorMap2 = en_1.default;
    function setErrorMap2(map) {
      overrideErrorMap2 = map;
    }
    exports2.setErrorMap = setErrorMap2;
    function getErrorMap2() {
      return overrideErrorMap2;
    }
    exports2.getErrorMap = getErrorMap2;
  }
});

// ../common/node_modules/zod/lib/helpers/parseUtil.js
var require_parseUtil2 = __commonJS({
  "../common/node_modules/zod/lib/helpers/parseUtil.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isAsync = exports2.isValid = exports2.isDirty = exports2.isAborted = exports2.OK = exports2.DIRTY = exports2.INVALID = exports2.ParseStatus = exports2.addIssueToContext = exports2.EMPTY_PATH = exports2.makeIssue = void 0;
    var errors_1 = require_errors2();
    var en_1 = __importDefault(require_en2());
    var makeIssue2 = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    exports2.makeIssue = makeIssue2;
    exports2.EMPTY_PATH = [];
    function addIssueToContext2(ctx, issueData) {
      const issue = (0, exports2.makeIssue)({
        issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          (0, errors_1.getErrorMap)(),
          en_1.default
        ].filter((x) => !!x)
      });
      ctx.common.issues.push(issue);
    }
    exports2.addIssueToContext = addIssueToContext2;
    var ParseStatus2 = class {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return exports2.INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return ParseStatus2.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return exports2.INVALID;
          if (value.status === "aborted")
            return exports2.INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (typeof value.value !== "undefined" || pair.alwaysSet) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    exports2.ParseStatus = ParseStatus2;
    exports2.INVALID = Object.freeze({
      status: "aborted"
    });
    var DIRTY2 = (value) => ({ status: "dirty", value });
    exports2.DIRTY = DIRTY2;
    var OK2 = (value) => ({ status: "valid", value });
    exports2.OK = OK2;
    var isAborted2 = (x) => x.status === "aborted";
    exports2.isAborted = isAborted2;
    var isDirty2 = (x) => x.status === "dirty";
    exports2.isDirty = isDirty2;
    var isValid2 = (x) => x.status === "valid";
    exports2.isValid = isValid2;
    var isAsync2 = (x) => typeof Promise !== void 0 && x instanceof Promise;
    exports2.isAsync = isAsync2;
  }
});

// ../common/node_modules/zod/lib/helpers/typeAliases.js
var require_typeAliases2 = __commonJS({
  "../common/node_modules/zod/lib/helpers/typeAliases.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../common/node_modules/zod/lib/helpers/errorUtil.js
var require_errorUtil2 = __commonJS({
  "../common/node_modules/zod/lib/helpers/errorUtil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.errorUtil = void 0;
    var errorUtil2;
    (function(errorUtil3) {
      errorUtil3.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil3.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil2 = exports2.errorUtil || (exports2.errorUtil = {}));
  }
});

// ../common/node_modules/zod/lib/types.js
var require_types2 = __commonJS({
  "../common/node_modules/zod/lib/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.date = exports2.boolean = exports2.bigint = exports2.array = exports2.any = exports2.coerce = exports2.ZodFirstPartyTypeKind = exports2.late = exports2.ZodSchema = exports2.Schema = exports2.custom = exports2.ZodPipeline = exports2.ZodBranded = exports2.BRAND = exports2.ZodNaN = exports2.ZodCatch = exports2.ZodDefault = exports2.ZodNullable = exports2.ZodOptional = exports2.ZodTransformer = exports2.ZodEffects = exports2.ZodPromise = exports2.ZodNativeEnum = exports2.ZodEnum = exports2.ZodLiteral = exports2.ZodLazy = exports2.ZodFunction = exports2.ZodSet = exports2.ZodMap = exports2.ZodRecord = exports2.ZodTuple = exports2.ZodIntersection = exports2.ZodDiscriminatedUnion = exports2.ZodUnion = exports2.ZodObject = exports2.objectUtil = exports2.ZodArray = exports2.ZodVoid = exports2.ZodNever = exports2.ZodUnknown = exports2.ZodAny = exports2.ZodNull = exports2.ZodUndefined = exports2.ZodSymbol = exports2.ZodDate = exports2.ZodBoolean = exports2.ZodBigInt = exports2.ZodNumber = exports2.ZodString = exports2.ZodType = void 0;
    exports2.NEVER = exports2.void = exports2.unknown = exports2.union = exports2.undefined = exports2.tuple = exports2.transformer = exports2.symbol = exports2.string = exports2.strictObject = exports2.set = exports2.record = exports2.promise = exports2.preprocess = exports2.pipeline = exports2.ostring = exports2.optional = exports2.onumber = exports2.oboolean = exports2.object = exports2.number = exports2.nullable = exports2.null = exports2.never = exports2.nativeEnum = exports2.nan = exports2.map = exports2.literal = exports2.lazy = exports2.intersection = exports2.instanceof = exports2.function = exports2.enum = exports2.effect = exports2.discriminatedUnion = void 0;
    var errors_1 = require_errors2();
    var errorUtil_1 = require_errorUtil2();
    var parseUtil_1 = require_parseUtil2();
    var util_1 = require_util2();
    var ZodError_1 = require_ZodError2();
    var ParseInputLazyPath2 = class {
      constructor(parent, value, path, key) {
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        return this._path.concat(this._key);
      }
    };
    var handleResult2 = (ctx, result) => {
      if ((0, parseUtil_1.isValid)(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        const error = new ZodError_1.ZodError(ctx.common.issues);
        return { success: false, error };
      }
    };
    function processCreateParams2(params) {
      if (!params)
        return {};
      const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
      if (errorMap2 && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
      }
      if (errorMap2)
        return { errorMap: errorMap2, description };
      const customMap = (iss, ctx) => {
        if (iss.code !== "invalid_type")
          return { message: ctx.defaultError };
        if (typeof ctx.data === "undefined") {
          return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
        }
        return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
      };
      return { errorMap: customMap, description };
    }
    var ZodType2 = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return (0, util_1.getParsedType)(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: (0, util_1.getParsedType)(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new parseUtil_1.ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if ((0, parseUtil_1.isAsync)(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_1.getParsedType)(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult2(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_1.getParsedType)(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await ((0, parseUtil_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult2(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodError_1.ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects2({
          schema: this,
          typeName: ZodFirstPartyTypeKind2.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional2.create(this);
      }
      nullable() {
        return ZodNullable2.create(this);
      }
      nullish() {
        return this.optional().nullable();
      }
      array() {
        return ZodArray2.create(this);
      }
      promise() {
        return ZodPromise2.create(this);
      }
      or(option) {
        return ZodUnion2.create([this, option]);
      }
      and(incoming) {
        return ZodIntersection2.create(this, incoming);
      }
      transform(transform) {
        return new ZodEffects2({
          schema: this,
          typeName: ZodFirstPartyTypeKind2.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault2({
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind2.ZodDefault
        });
      }
      brand() {
        return new ZodBranded2({
          typeName: ZodFirstPartyTypeKind2.ZodBranded,
          type: this,
          ...processCreateParams2(void 0)
        });
      }
      catch(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch2({
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind2.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline2.create(this, target);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    exports2.ZodType = ZodType2;
    exports2.Schema = ZodType2;
    exports2.ZodSchema = ZodType2;
    var cuidRegex2 = /^c[^\s-]{8,}$/i;
    var uuidRegex2 = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
    var emailRegex2 = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var datetimeRegex2 = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}:\\d{2})|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}:\\d{2})|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}:\\d{2})|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    var ZodString2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
          validation,
          code: ZodError_1.ZodIssueCode.invalid_string,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
        this.nonempty = (message) => this.min(1, errorUtil_1.errorUtil.errToObj(message));
        this.trim = () => new ZodString2({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(
            ctx2,
            {
              code: ZodError_1.ZodIssueCode.invalid_type,
              expected: util_1.ZodParsedType.string,
              received: ctx2.parsedType
            }
          );
          return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                (0, parseUtil_1.addIssueToContext)(ctx, {
                  code: ZodError_1.ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "email",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "uuid",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex2.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "cuid",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "url",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                validation: "regex",
                code: ZodError_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex2(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _addCheck(check) {
        return new ZodString2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil_1.errorUtil.errToObj(message) });
      }
      datetime(options) {
        var _a;
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
          offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
          ...errorUtil_1.errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil_1.errorUtil.errToObj(message)
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    exports2.ZodString = ZodString2;
    ZodString2.create = (params) => {
      var _a;
      return new ZodString2({
        checks: [],
        typeName: ZodFirstPartyTypeKind2.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams2(params)
      });
    };
    function floatSafeRemainder2(val, step) {
      const valDecCount = (val.toString().split(".")[1] || "").length;
      const stepDecCount = (step.toString().split(".")[1] || "").length;
      const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
      const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
      const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
      return valInt % stepInt / Math.pow(10, decCount);
    }
    var ZodNumber2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.number,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        let ctx = void 0;
        const status = new parseUtil_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util_1.util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder2(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new ZodNumber2({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil_1.errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new ZodNumber2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int");
      }
    };
    exports2.ZodNumber = ZodNumber2;
    ZodNumber2.create = (params) => {
      return new ZodNumber2({
        checks: [],
        typeName: ZodFirstPartyTypeKind2.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams2(params)
      });
    };
    var ZodBigInt2 = class extends ZodType2 {
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.bigint) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.bigint,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodBigInt = ZodBigInt2;
    ZodBigInt2.create = (params) => {
      var _a;
      return new ZodBigInt2({
        typeName: ZodFirstPartyTypeKind2.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams2(params)
      });
    };
    var ZodBoolean2 = class extends ZodType2 {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodBoolean = ZodBoolean2;
    ZodBoolean2.create = (params) => {
      return new ZodBoolean2({
        typeName: ZodFirstPartyTypeKind2.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams2(params)
      });
    };
    var ZodDate2 = class extends ZodType2 {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.date,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_date
          });
          return parseUtil_1.INVALID;
        }
        const status = new parseUtil_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new ZodDate2({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil_1.errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    exports2.ZodDate = ZodDate2;
    ZodDate2.create = (params) => {
      return new ZodDate2({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind2.ZodDate,
        ...processCreateParams2(params)
      });
    };
    var ZodSymbol2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodSymbol = ZodSymbol2;
    ZodSymbol2.create = (params) => {
      return new ZodSymbol2({
        typeName: ZodFirstPartyTypeKind2.ZodSymbol,
        ...processCreateParams2(params)
      });
    };
    var ZodUndefined2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodUndefined = ZodUndefined2;
    ZodUndefined2.create = (params) => {
      return new ZodUndefined2({
        typeName: ZodFirstPartyTypeKind2.ZodUndefined,
        ...processCreateParams2(params)
      });
    };
    var ZodNull2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.null,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodNull = ZodNull2;
    ZodNull2.create = (params) => {
      return new ZodNull2({
        typeName: ZodFirstPartyTypeKind2.ZodNull,
        ...processCreateParams2(params)
      });
    };
    var ZodAny2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodAny = ZodAny2;
    ZodAny2.create = (params) => {
      return new ZodAny2({
        typeName: ZodFirstPartyTypeKind2.ZodAny,
        ...processCreateParams2(params)
      });
    };
    var ZodUnknown2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodUnknown = ZodUnknown2;
    ZodUnknown2.create = (params) => {
      return new ZodUnknown2({
        typeName: ZodFirstPartyTypeKind2.ZodUnknown,
        ...processCreateParams2(params)
      });
    };
    var ZodNever2 = class extends ZodType2 {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_1.addIssueToContext)(ctx, {
          code: ZodError_1.ZodIssueCode.invalid_type,
          expected: util_1.ZodParsedType.never,
          received: ctx.parsedType
        });
        return parseUtil_1.INVALID;
      }
    };
    exports2.ZodNever = ZodNever2;
    ZodNever2.create = (params) => {
      return new ZodNever2({
        typeName: ZodFirstPartyTypeKind2.ZodNever,
        ...processCreateParams2(params)
      });
    };
    var ZodVoid2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.void,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
    };
    exports2.ZodVoid = ZodVoid2;
    ZodVoid2.create = (params) => {
      return new ZodVoid2({
        typeName: ZodFirstPartyTypeKind2.ZodVoid,
        ...processCreateParams2(params)
      });
    };
    var ZodArray2 = class extends ZodType2 {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: tooBig ? ZodError_1.ZodIssueCode.too_big : ZodError_1.ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all(ctx.data.map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath2(ctx, item, ctx.path, i));
          })).then((result2) => {
            return parseUtil_1.ParseStatus.mergeArray(status, result2);
          });
        }
        const result = ctx.data.map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath2(ctx, item, ctx.path, i));
        });
        return parseUtil_1.ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new ZodArray2({
          ...this._def,
          minLength: { value: minLength, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new ZodArray2({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new ZodArray2({
          ...this._def,
          exactLength: { value: len, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports2.ZodArray = ZodArray2;
    ZodArray2.create = (schema, params) => {
      return new ZodArray2({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind2.ZodArray,
        ...processCreateParams2(params)
      });
    };
    var objectUtil2;
    (function(objectUtil3) {
      objectUtil3.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
        };
      };
    })(objectUtil2 = exports2.objectUtil || (exports2.objectUtil = {}));
    var AugmentFactory = (def) => (augmentation) => {
      return new ZodObject2({
        ...def,
        shape: () => ({
          ...def.shape(),
          ...augmentation
        })
      });
    };
    function deepPartialify2(schema) {
      if (schema instanceof ZodObject2) {
        const newShape = {};
        for (const key in schema.shape) {
          const fieldSchema = schema.shape[key];
          newShape[key] = ZodOptional2.create(deepPartialify2(fieldSchema));
        }
        return new ZodObject2({
          ...schema._def,
          shape: () => newShape
        });
      } else if (schema instanceof ZodArray2) {
        return ZodArray2.create(deepPartialify2(schema.element));
      } else if (schema instanceof ZodOptional2) {
        return ZodOptional2.create(deepPartialify2(schema.unwrap()));
      } else if (schema instanceof ZodNullable2) {
        return ZodNullable2.create(deepPartialify2(schema.unwrap()));
      } else if (schema instanceof ZodTuple2) {
        return ZodTuple2.create(schema.items.map((item) => deepPartialify2(item)));
      } else {
        return schema;
      }
    }
    var ZodObject2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = AugmentFactory(this._def);
        this.extend = AugmentFactory(this._def);
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util_1.util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx2, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.object,
            received: ctx2.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever2 && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath2(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever2) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              (0, parseUtil_1.addIssueToContext)(ctx, {
                code: ZodError_1.ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath2(ctx, value, ctx.path, key)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              syncPairs.push({
                key,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return parseUtil_1.ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil_1.errorUtil.errToObj;
        return new ZodObject2({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil_1.errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new ZodObject2({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new ZodObject2({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      merge(merging) {
        const merged = new ZodObject2({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => objectUtil2.mergeShapes(this._def.shape(), merging._def.shape()),
          typeName: ZodFirstPartyTypeKind2.ZodObject
        });
        return merged;
      }
      catchall(index) {
        return new ZodObject2({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        util_1.util.objectKeys(mask).map((key) => {
          if (this.shape[key])
            shape[key] = this.shape[key];
        });
        return new ZodObject2({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util_1.util.objectKeys(this.shape).map((key) => {
          if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
            shape[key] = this.shape[key];
          }
        });
        return new ZodObject2({
          ...this._def,
          shape: () => shape
        });
      }
      deepPartial() {
        return deepPartialify2(this);
      }
      partial(mask) {
        const newShape = {};
        if (mask) {
          util_1.util.objectKeys(this.shape).map((key) => {
            if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
              newShape[key] = this.shape[key];
            } else {
              newShape[key] = this.shape[key].optional();
            }
          });
          return new ZodObject2({
            ...this._def,
            shape: () => newShape
          });
        } else {
          for (const key in this.shape) {
            const fieldSchema = this.shape[key];
            newShape[key] = fieldSchema.optional();
          }
        }
        return new ZodObject2({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        if (mask) {
          util_1.util.objectKeys(this.shape).map((key) => {
            if (util_1.util.objectKeys(mask).indexOf(key) === -1) {
              newShape[key] = this.shape[key];
            } else {
              const fieldSchema = this.shape[key];
              let newField = fieldSchema;
              while (newField instanceof ZodOptional2) {
                newField = newField._def.innerType;
              }
              newShape[key] = newField;
            }
          });
        } else {
          for (const key in this.shape) {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional2) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new ZodObject2({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum2(util_1.util.objectKeys(this.shape));
      }
    };
    exports2.ZodObject = ZodObject2;
    ZodObject2.create = (shape, params) => {
      return new ZodObject2({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever2.create(),
        typeName: ZodFirstPartyTypeKind2.ZodObject,
        ...processCreateParams2(params)
      });
    };
    ZodObject2.strictCreate = (shape, params) => {
      return new ZodObject2({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever2.create(),
        typeName: ZodFirstPartyTypeKind2.ZodObject,
        ...processCreateParams2(params)
      });
    };
    ZodObject2.lazycreate = (shape, params) => {
      return new ZodObject2({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever2.create(),
        typeName: ZodFirstPartyTypeKind2.ZodObject,
        ...processCreateParams2(params)
      });
    };
    var ZodUnion2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError_1.ZodError(result.ctx.common.issues));
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError_1.ZodError(issues2));
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_1.INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    exports2.ZodUnion = ZodUnion2;
    ZodUnion2.create = (types, params) => {
      return new ZodUnion2({
        options: types,
        typeName: ZodFirstPartyTypeKind2.ZodUnion,
        ...processCreateParams2(params)
      });
    };
    var getDiscriminator2 = (type) => {
      if (type instanceof ZodLazy2) {
        return getDiscriminator2(type.schema);
      } else if (type instanceof ZodEffects2) {
        return getDiscriminator2(type.innerType());
      } else if (type instanceof ZodLiteral2) {
        return [type.value];
      } else if (type instanceof ZodEnum2) {
        return type.options;
      } else if (type instanceof ZodNativeEnum2) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault2) {
        return getDiscriminator2(type._def.innerType);
      } else if (type instanceof ZodUndefined2) {
        return [void 0];
      } else if (type instanceof ZodNull2) {
        return [null];
      } else {
        return null;
      }
    };
    var ZodDiscriminatedUnion2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return parseUtil_1.INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator2(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new ZodDiscriminatedUnion2({
          typeName: ZodFirstPartyTypeKind2.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams2(params)
        });
      }
    };
    exports2.ZodDiscriminatedUnion = ZodDiscriminatedUnion2;
    function mergeValues2(a, b) {
      const aType = (0, util_1.getParsedType)(a);
      const bType = (0, util_1.getParsedType)(b);
      if (a === b) {
        return { valid: true, data: a };
      } else if (aType === util_1.ZodParsedType.object && bType === util_1.ZodParsedType.object) {
        const bKeys = util_1.util.objectKeys(b);
        const sharedKeys = util_1.util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
          const sharedValue = mergeValues2(a[key], b[key]);
          if (!sharedValue.valid) {
            return { valid: false };
          }
          newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
      } else if (aType === util_1.ZodParsedType.array && bType === util_1.ZodParsedType.array) {
        if (a.length !== b.length) {
          return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
          const itemA = a[index];
          const itemB = b[index];
          const sharedValue = mergeValues2(itemA, itemB);
          if (!sharedValue.valid) {
            return { valid: false };
          }
          newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
      } else if (aType === util_1.ZodParsedType.date && bType === util_1.ZodParsedType.date && +a === +b) {
        return { valid: true, data: a };
      } else {
        return { valid: false };
      }
    }
    var ZodIntersection2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if ((0, parseUtil_1.isAborted)(parsedLeft) || (0, parseUtil_1.isAborted)(parsedRight)) {
            return parseUtil_1.INVALID;
          }
          const merged = mergeValues2(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.invalid_intersection_types
            });
            return parseUtil_1.INVALID;
          }
          if ((0, parseUtil_1.isDirty)(parsedLeft) || (0, parseUtil_1.isDirty)(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    exports2.ZodIntersection = ZodIntersection2;
    ZodIntersection2.create = (left, right, params) => {
      return new ZodIntersection2({
        left,
        right,
        typeName: ZodFirstPartyTypeKind2.ZodIntersection,
        ...processCreateParams2(params)
      });
    };
    var ZodTuple2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.array) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return parseUtil_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = ctx.data.map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath2(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return parseUtil_1.ParseStatus.mergeArray(status, results);
          });
        } else {
          return parseUtil_1.ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new ZodTuple2({
          ...this._def,
          rest
        });
      }
    };
    exports2.ZodTuple = ZodTuple2;
    ZodTuple2.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple2({
        items: schemas,
        typeName: ZodFirstPartyTypeKind2.ZodTuple,
        rest: null,
        ...processCreateParams2(params)
      });
    };
    var ZodRecord2 = class extends ZodType2 {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.object) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath2(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath2(ctx, ctx.data[key], ctx.path, key))
          });
        }
        if (ctx.common.async) {
          return parseUtil_1.ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return parseUtil_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType2) {
          return new ZodRecord2({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind2.ZodRecord,
            ...processCreateParams2(third)
          });
        }
        return new ZodRecord2({
          keyType: ZodString2.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind2.ZodRecord,
          ...processCreateParams2(second)
        });
      }
    };
    exports2.ZodRecord = ZodRecord2;
    var ZodMap2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.map) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.map,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath2(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath2(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return parseUtil_1.INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return parseUtil_1.INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    exports2.ZodMap = ZodMap2;
    ZodMap2.create = (keyType, valueType, params) => {
      return new ZodMap2({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind2.ZodMap,
        ...processCreateParams2(params)
      });
    };
    var ZodSet2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.set) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.set,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            (0, parseUtil_1.addIssueToContext)(ctx, {
              code: ZodError_1.ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return parseUtil_1.INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath2(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new ZodSet2({
          ...this._def,
          minSize: { value: minSize, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new ZodSet2({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil_1.errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports2.ZodSet = ZodSet2;
    ZodSet2.create = (valueType, params) => {
      return new ZodSet2({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind2.ZodSet,
        ...processCreateParams2(params)
      });
    };
    var ZodFunction2 = class extends ZodType2 {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.function) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.function,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        function makeArgsIssue(args, error) {
          return (0, parseUtil_1.makeIssue)({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              (0, errors_1.getErrorMap)(),
              errors_1.defaultErrorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodError_1.ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return (0, parseUtil_1.makeIssue)({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              (0, errors_1.getErrorMap)(),
              errors_1.defaultErrorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodError_1.ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise2) {
          return (0, parseUtil_1.OK)(async (...args) => {
            const error = new ZodError_1.ZodError([]);
            const parsedArgs = await this._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await fn(...parsedArgs);
            const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          return (0, parseUtil_1.OK)((...args) => {
            const parsedArgs = this._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = fn(...parsedArgs.data);
            const parsedReturns = this._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new ZodFunction2({
          ...this._def,
          args: ZodTuple2.create(items).rest(ZodUnknown2.create())
        });
      }
      returns(returnType) {
        return new ZodFunction2({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new ZodFunction2({
          args: args ? args : ZodTuple2.create([]).rest(ZodUnknown2.create()),
          returns: returns || ZodUnknown2.create(),
          typeName: ZodFirstPartyTypeKind2.ZodFunction,
          ...processCreateParams2(params)
        });
      }
    };
    exports2.ZodFunction = ZodFunction2;
    var ZodLazy2 = class extends ZodType2 {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    exports2.ZodLazy = ZodLazy2;
    ZodLazy2.create = (getter, params) => {
      return new ZodLazy2({
        getter,
        typeName: ZodFirstPartyTypeKind2.ZodLazy,
        ...processCreateParams2(params)
      });
    };
    var ZodLiteral2 = class extends ZodType2 {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return parseUtil_1.INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    exports2.ZodLiteral = ZodLiteral2;
    ZodLiteral2.create = (value, params) => {
      return new ZodLiteral2({
        value,
        typeName: ZodFirstPartyTypeKind2.ZodLiteral,
        ...processCreateParams2(params)
      });
    };
    function createZodEnum2(values, params) {
      return new ZodEnum2({
        values,
        typeName: ZodFirstPartyTypeKind2.ZodEnum,
        ...processCreateParams2(params)
      });
    }
    var ZodEnum2 = class extends ZodType2 {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_1.addIssueToContext)(ctx, {
            expected: util_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_1.ZodIssueCode.invalid_type
          });
          return parseUtil_1.INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
    };
    exports2.ZodEnum = ZodEnum2;
    ZodEnum2.create = createZodEnum2;
    var ZodNativeEnum2 = class extends ZodType2 {
      _parse(input) {
        const nativeEnumValues = util_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_1.ZodParsedType.string && ctx.parsedType !== util_1.ZodParsedType.number) {
          const expectedValues = util_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            expected: util_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_1.ZodIssueCode.invalid_type
          });
          return parseUtil_1.INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_1.INVALID;
        }
        return (0, parseUtil_1.OK)(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    exports2.ZodNativeEnum = ZodNativeEnum2;
    ZodNativeEnum2.create = (values, params) => {
      return new ZodNativeEnum2({
        values,
        typeName: ZodFirstPartyTypeKind2.ZodNativeEnum,
        ...processCreateParams2(params)
      });
    };
    var ZodPromise2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== util_1.ZodParsedType.promise && ctx.common.async === false) {
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.promise,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        const promisified = ctx.parsedType === util_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0, parseUtil_1.OK)(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    exports2.ZodPromise = ZodPromise2;
    ZodPromise2.create = (schema, params) => {
      return new ZodPromise2({
        type: schema,
        typeName: ZodFirstPartyTypeKind2.ZodPromise,
        ...processCreateParams2(params)
      });
    };
    var ZodEffects2 = class extends ZodType2 {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind2.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data);
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        const checkCtx = {
          addIssue: (arg) => {
            (0, parseUtil_1.addIssueToContext)(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return parseUtil_1.INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return parseUtil_1.INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!(0, parseUtil_1.isValid)(base))
              return base;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!(0, parseUtil_1.isValid)(base))
                return base;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util_1.util.assertNever(effect);
      }
    };
    exports2.ZodEffects = ZodEffects2;
    exports2.ZodTransformer = ZodEffects2;
    ZodEffects2.create = (schema, effect, params) => {
      return new ZodEffects2({
        schema,
        typeName: ZodFirstPartyTypeKind2.ZodEffects,
        effect,
        ...processCreateParams2(params)
      });
    };
    ZodEffects2.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects2({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind2.ZodEffects,
        ...processCreateParams2(params)
      });
    };
    var ZodOptional2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.undefined) {
          return (0, parseUtil_1.OK)(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports2.ZodOptional = ZodOptional2;
    ZodOptional2.create = (type, params) => {
      return new ZodOptional2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodOptional,
        ...processCreateParams2(params)
      });
    };
    var ZodNullable2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_1.ZodParsedType.null) {
          return (0, parseUtil_1.OK)(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports2.ZodNullable = ZodNullable2;
    ZodNullable2.create = (type, params) => {
      return new ZodNullable2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodNullable,
        ...processCreateParams2(params)
      });
    };
    var ZodDefault2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_1.ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    exports2.ZodDefault = ZodDefault2;
    ZodDefault2.create = (type, params) => {
      return new ZodDefault2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams2(params)
      });
    };
    var ZodCatch2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const result = this._def.innerType._parse({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if ((0, parseUtil_1.isAsync)(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.defaultValue()
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.defaultValue()
          };
        }
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    exports2.ZodCatch = ZodCatch2;
    ZodCatch2.create = (type, params) => {
      return new ZodCatch2({
        innerType: type,
        typeName: ZodFirstPartyTypeKind2.ZodCatch,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams2(params)
      });
    };
    var ZodNaN2 = class extends ZodType2 {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_1.ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_1.addIssueToContext)(ctx, {
            code: ZodError_1.ZodIssueCode.invalid_type,
            expected: util_1.ZodParsedType.nan,
            received: ctx.parsedType
          });
          return parseUtil_1.INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    exports2.ZodNaN = ZodNaN2;
    ZodNaN2.create = (params) => {
      return new ZodNaN2({
        typeName: ZodFirstPartyTypeKind2.ZodNaN,
        ...processCreateParams2(params)
      });
    };
    exports2.BRAND = Symbol("zod_brand");
    var ZodBranded2 = class extends ZodType2 {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    exports2.ZodBranded = ZodBranded2;
    var ZodPipeline2 = class extends ZodType2 {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return parseUtil_1.INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return (0, parseUtil_1.DIRTY)(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return parseUtil_1.INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new ZodPipeline2({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind2.ZodPipeline
        });
      }
    };
    exports2.ZodPipeline = ZodPipeline2;
    var custom2 = (check, params = {}, fatal) => {
      if (check)
        return ZodAny2.create().superRefine((data, ctx) => {
          if (!check(data)) {
            const p = typeof params === "function" ? params(data) : params;
            const p2 = typeof p === "string" ? { message: p } : p;
            ctx.addIssue({ code: "custom", ...p2, fatal });
          }
        });
      return ZodAny2.create();
    };
    exports2.custom = custom2;
    exports2.late = {
      object: ZodObject2.lazycreate
    };
    var ZodFirstPartyTypeKind2;
    (function(ZodFirstPartyTypeKind3) {
      ZodFirstPartyTypeKind3["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind3["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind3["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind3["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind3["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind3["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind3["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind3["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind3["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind3["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind3["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind3["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind3["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind3["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind3["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind3["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind3["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind3["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind3["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind3["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind3["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind3["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind3["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind3["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind3["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind3["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind3["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind3["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind3["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind3["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind3["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind3["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind3["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind3["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind3["ZodPipeline"] = "ZodPipeline";
    })(ZodFirstPartyTypeKind2 = exports2.ZodFirstPartyTypeKind || (exports2.ZodFirstPartyTypeKind = {}));
    var instanceOfType2 = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => (0, exports2.custom)((data) => data instanceof cls, params, true);
    exports2.instanceof = instanceOfType2;
    var stringType2 = ZodString2.create;
    exports2.string = stringType2;
    var numberType2 = ZodNumber2.create;
    exports2.number = numberType2;
    var nanType2 = ZodNaN2.create;
    exports2.nan = nanType2;
    var bigIntType2 = ZodBigInt2.create;
    exports2.bigint = bigIntType2;
    var booleanType2 = ZodBoolean2.create;
    exports2.boolean = booleanType2;
    var dateType2 = ZodDate2.create;
    exports2.date = dateType2;
    var symbolType2 = ZodSymbol2.create;
    exports2.symbol = symbolType2;
    var undefinedType2 = ZodUndefined2.create;
    exports2.undefined = undefinedType2;
    var nullType2 = ZodNull2.create;
    exports2.null = nullType2;
    var anyType2 = ZodAny2.create;
    exports2.any = anyType2;
    var unknownType2 = ZodUnknown2.create;
    exports2.unknown = unknownType2;
    var neverType2 = ZodNever2.create;
    exports2.never = neverType2;
    var voidType2 = ZodVoid2.create;
    exports2.void = voidType2;
    var arrayType2 = ZodArray2.create;
    exports2.array = arrayType2;
    var objectType2 = ZodObject2.create;
    exports2.object = objectType2;
    var strictObjectType2 = ZodObject2.strictCreate;
    exports2.strictObject = strictObjectType2;
    var unionType2 = ZodUnion2.create;
    exports2.union = unionType2;
    var discriminatedUnionType2 = ZodDiscriminatedUnion2.create;
    exports2.discriminatedUnion = discriminatedUnionType2;
    var intersectionType2 = ZodIntersection2.create;
    exports2.intersection = intersectionType2;
    var tupleType2 = ZodTuple2.create;
    exports2.tuple = tupleType2;
    var recordType2 = ZodRecord2.create;
    exports2.record = recordType2;
    var mapType2 = ZodMap2.create;
    exports2.map = mapType2;
    var setType2 = ZodSet2.create;
    exports2.set = setType2;
    var functionType2 = ZodFunction2.create;
    exports2.function = functionType2;
    var lazyType2 = ZodLazy2.create;
    exports2.lazy = lazyType2;
    var literalType2 = ZodLiteral2.create;
    exports2.literal = literalType2;
    var enumType2 = ZodEnum2.create;
    exports2.enum = enumType2;
    var nativeEnumType2 = ZodNativeEnum2.create;
    exports2.nativeEnum = nativeEnumType2;
    var promiseType2 = ZodPromise2.create;
    exports2.promise = promiseType2;
    var effectsType2 = ZodEffects2.create;
    exports2.effect = effectsType2;
    exports2.transformer = effectsType2;
    var optionalType2 = ZodOptional2.create;
    exports2.optional = optionalType2;
    var nullableType2 = ZodNullable2.create;
    exports2.nullable = nullableType2;
    var preprocessType2 = ZodEffects2.createWithPreprocess;
    exports2.preprocess = preprocessType2;
    var pipelineType2 = ZodPipeline2.create;
    exports2.pipeline = pipelineType2;
    var ostring2 = () => stringType2().optional();
    exports2.ostring = ostring2;
    var onumber2 = () => numberType2().optional();
    exports2.onumber = onumber2;
    var oboolean2 = () => booleanType2().optional();
    exports2.oboolean = oboolean2;
    exports2.coerce = {
      string: (arg) => ZodString2.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber2.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean2.create({ ...arg, coerce: true }),
      bigint: (arg) => ZodBigInt2.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate2.create({ ...arg, coerce: true })
    };
    exports2.NEVER = parseUtil_1.INVALID;
  }
});

// ../common/node_modules/zod/lib/external.js
var require_external2 = __commonJS({
  "../common/node_modules/zod/lib/external.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_errors2(), exports2);
    __exportStar(require_parseUtil2(), exports2);
    __exportStar(require_typeAliases2(), exports2);
    __exportStar(require_util2(), exports2);
    __exportStar(require_types2(), exports2);
    __exportStar(require_ZodError2(), exports2);
  }
});

// ../common/node_modules/zod/lib/index.js
var require_lib2 = __commonJS({
  "../common/node_modules/zod/lib/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod2, k))
            __createBinding2(result, mod2, k);
      }
      __setModuleDefault2(result, mod2);
      return result;
    };
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.z = void 0;
    var mod = __importStar2(require_external2());
    exports2.z = mod;
    __exportStar(require_external2(), exports2);
    exports2.default = mod;
  }
});

// ../common/build/webview-api/ErrorSchema.js
var require_ErrorSchema = __commonJS({
  "../common/build/webview-api/ErrorSchema.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.errorSchema = void 0;
    var zod_1 = __importDefault(require_lib2());
    exports2.errorSchema = zod_1.default.union([
      zod_1.default.string(),
      zod_1.default.object({
        title: zod_1.default.string(),
        message: zod_1.default.string(),
        level: zod_1.default.union([zod_1.default.literal("error"), zod_1.default.literal("warning")]).default("error").optional(),
        disableRetry: zod_1.default.boolean().optional(),
        disableDismiss: zod_1.default.boolean().optional()
      })
    ]);
  }
});

// ../common/build/webview-api/ConversationSchema.js
var require_ConversationSchema = __commonJS({
  "../common/build/webview-api/ConversationSchema.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.conversationSchema = exports2.messageSchema = exports2.selectionSchema = void 0;
    var zod_1 = __importDefault(require_lib2());
    var ErrorSchema_1 = require_ErrorSchema();
    exports2.selectionSchema = zod_1.default.object({
      filename: zod_1.default.string(),
      startLine: zod_1.default.number(),
      endLine: zod_1.default.number(),
      text: zod_1.default.string()
    });
    exports2.messageSchema = zod_1.default.object({
      author: zod_1.default.union([zod_1.default.literal("user"), zod_1.default.literal("bot")]),
      content: zod_1.default.string()
    });
    var messageExchangeContentSchema = zod_1.default.object({
      type: zod_1.default.literal("messageExchange"),
      messages: zod_1.default.array(exports2.messageSchema),
      error: ErrorSchema_1.errorSchema.optional(),
      state: zod_1.default.discriminatedUnion("type", [
        zod_1.default.object({
          type: zod_1.default.literal("userCanReply"),
          responsePlaceholder: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()])
        }),
        zod_1.default.object({
          type: zod_1.default.literal("waitingForBotAnswer"),
          botAction: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()])
        }),
        zod_1.default.object({
          type: zod_1.default.literal("botAnswerStreaming"),
          partialAnswer: zod_1.default.string()
        })
      ])
    });
    var instructionRefinementContentSchema = zod_1.default.object({
      type: zod_1.default.literal("instructionRefinement"),
      instruction: zod_1.default.string(),
      error: ErrorSchema_1.errorSchema.optional(),
      state: zod_1.default.discriminatedUnion("type", [
        zod_1.default.object({
          type: zod_1.default.literal("userCanRefineInstruction"),
          label: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
          responseMessage: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()])
        }),
        zod_1.default.object({
          type: zod_1.default.literal("waitingForBotAnswer"),
          botAction: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()])
        })
      ])
    });
    exports2.conversationSchema = zod_1.default.object({
      id: zod_1.default.string(),
      header: zod_1.default.object({
        title: zod_1.default.string(),
        isTitleMessage: zod_1.default.boolean(),
        codicon: zod_1.default.string()
      }),
      content: zod_1.default.discriminatedUnion("type", [
        messageExchangeContentSchema,
        instructionRefinementContentSchema
      ])
    });
  }
});

// ../common/build/webview-api/PanelState.js
var require_PanelState = __commonJS({
  "../common/build/webview-api/PanelState.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.panelStateSchema = void 0;
    var zod_1 = __importDefault(require_lib2());
    var ConversationSchema_1 = require_ConversationSchema();
    var ErrorSchema_1 = require_ErrorSchema();
    exports2.panelStateSchema = zod_1.default.discriminatedUnion("type", [
      zod_1.default.object({
        type: zod_1.default.literal("chat"),
        conversations: zod_1.default.array(ConversationSchema_1.conversationSchema),
        selectedConversationId: zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]),
        hasOpenAIApiKey: zod_1.default.boolean(),
        surfacePromptForOpenAIPlus: zod_1.default.boolean(),
        error: ErrorSchema_1.errorSchema.optional()
      }),
      zod_1.default.object({
        type: zod_1.default.literal("diff"),
        oldCode: zod_1.default.string(),
        newCode: zod_1.default.string(),
        languageId: zod_1.default.string().optional()
      })
    ]).optional();
  }
});

// ../common/build/webview-api/IncomingMessage.js
var require_IncomingMessage = __commonJS({
  "../common/build/webview-api/IncomingMessage.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.incomingMessageSchema = void 0;
    var zod_1 = __importDefault(require_lib2());
    var PanelState_1 = require_PanelState();
    exports2.incomingMessageSchema = zod_1.default.object({
      data: zod_1.default.object({
        type: zod_1.default.literal("updateState"),
        state: PanelState_1.panelStateSchema
      })
    });
  }
});

// ../common/build/webview-api/OutgoingMessage.js
var require_OutgoingMessage = __commonJS({
  "../common/build/webview-api/OutgoingMessage.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.outgoingMessageSchema = void 0;
    var zod_1 = __importDefault(require_lib2());
    var ErrorSchema_1 = require_ErrorSchema();
    exports2.outgoingMessageSchema = zod_1.default.discriminatedUnion("type", [
      zod_1.default.object({
        type: zod_1.default.literal("startChat")
      }),
      zod_1.default.object({
        type: zod_1.default.literal("enterOpenAIApiKey")
      }),
      zod_1.default.object({
        type: zod_1.default.literal("clickCollapsedConversation"),
        data: zod_1.default.object({
          id: zod_1.default.string()
        })
      }),
      zod_1.default.object({
        type: zod_1.default.literal("deleteConversation"),
        data: zod_1.default.object({
          id: zod_1.default.string()
        })
      }),
      zod_1.default.object({
        type: zod_1.default.literal("exportConversation"),
        data: zod_1.default.object({
          id: zod_1.default.string()
        })
      }),
      zod_1.default.object({
        type: zod_1.default.literal("sendMessage"),
        data: zod_1.default.object({
          id: zod_1.default.string(),
          message: zod_1.default.string()
        })
      }),
      zod_1.default.object({
        type: zod_1.default.literal("reportError"),
        error: ErrorSchema_1.errorSchema
      }),
      zod_1.default.object({
        type: zod_1.default.literal("dismissError"),
        data: zod_1.default.object({
          id: zod_1.default.string()
        })
      }),
      zod_1.default.object({
        type: zod_1.default.literal("retry"),
        data: zod_1.default.object({
          id: zod_1.default.string()
        })
      }),
      zod_1.default.object({
        type: zod_1.default.literal("applyDiff")
      }),
      zod_1.default.object({
        type: zod_1.default.literal("insertPromptIntoEditor"),
        data: zod_1.default.object({
          id: zod_1.default.string()
        })
      })
    ]);
  }
});

// ../common/build/webview-api/index.js
var require_webview_api = __commonJS({
  "../common/build/webview-api/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_ConversationSchema(), exports2);
    __exportStar(require_ErrorSchema(), exports2);
    __exportStar(require_IncomingMessage(), exports2);
    __exportStar(require_OutgoingMessage(), exports2);
    __exportStar(require_PanelState(), exports2);
  }
});

// ../common/build/util/nextId.js
var require_nextId = __commonJS({
  "../common/build/util/nextId.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createNextId = void 0;
    function createNextId({ prefix = "" }) {
      let id = 0;
      return () => `${prefix}${id++}`;
    }
    exports2.createNextId = createNextId;
  }
});

// ../common/build/util/index.js
var require_util3 = __commonJS({
  "../common/build/util/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_nextId(), exports2);
  }
});

// ../common/build/index.js
var require_build = __commonJS({
  "../common/build/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.util = exports2.webviewApi = void 0;
    exports2.webviewApi = __importStar2(require_webview_api());
    exports2.util = __importStar2(require_util3());
  }
});

// build/vscode/getActiveEditor.js
var require_getActiveEditor = __commonJS({
  "build/vscode/getActiveEditor.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getActiveEditor = void 0;
    var vscode2 = __importStar2(require("vscode"));
    function getActiveEditor() {
      return vscode2.window.activeTextEditor ?? vscode2.window.visibleTextEditors[0];
    }
    exports2.getActiveEditor = getActiveEditor;
  }
});

// build/conversation/input/getFilename.js
var require_getFilename = __commonJS({
  "build/conversation/input/getFilename.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getFilename = void 0;
    var getActiveEditor_1 = require_getActiveEditor();
    var getFilename = async () => (0, getActiveEditor_1.getActiveEditor)()?.document?.fileName.split("/").pop();
    exports2.getFilename = getFilename;
  }
});

// build/conversation/input/getLanguage.js
var require_getLanguage = __commonJS({
  "build/conversation/input/getLanguage.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getLanguage = void 0;
    var getActiveEditor_1 = require_getActiveEditor();
    var getLanguage = async () => (0, getActiveEditor_1.getActiveEditor)()?.document?.languageId;
    exports2.getLanguage = getLanguage;
  }
});

// build/conversation/input/getSelectedText.js
var require_getSelectedText = __commonJS({
  "build/conversation/input/getSelectedText.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSelectedText = void 0;
    var getActiveEditor_1 = require_getActiveEditor();
    var getSelectedText = async () => {
      const activeEditor = (0, getActiveEditor_1.getActiveEditor)();
      return activeEditor?.document?.getText(activeEditor?.selection);
    };
    exports2.getSelectedText = getSelectedText;
  }
});

// build/conversation/input/getSelectedLocationText.js
var require_getSelectedLocationText = __commonJS({
  "build/conversation/input/getSelectedLocationText.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSelectedLocationText = void 0;
    var getActiveEditor_1 = require_getActiveEditor();
    var getFilename_1 = require_getFilename();
    var getSelectedLocationText = async () => {
      const activeEditor = (0, getActiveEditor_1.getActiveEditor)();
      if (activeEditor == void 0) {
        return void 0;
      }
      const selectedRange = activeEditor.selection;
      return `${await (0, getFilename_1.getFilename)()} ${selectedRange.start.line + 1}:${selectedRange.end.line + 1}`;
    };
    exports2.getSelectedLocationText = getSelectedLocationText;
  }
});

// build/conversation/input/getSelectionWithDiagnostics.js
var require_getSelectionWithDiagnostics = __commonJS({
  "build/conversation/input/getSelectionWithDiagnostics.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSelectedTextWithDiagnostics = void 0;
    var vscode2 = __importStar2(require("vscode"));
    var getActiveEditor_1 = require_getActiveEditor();
    var getSelectedTextWithDiagnostics = async ({ diagnosticSeverities }) => {
      const activeEditor = (0, getActiveEditor_1.getActiveEditor)();
      if (activeEditor == void 0) {
        return void 0;
      }
      const { document: document2, selection } = activeEditor;
      const range = new vscode2.Range(new vscode2.Position(selection.start.line, 0), new vscode2.Position(selection.end.line + 1, 0));
      const includedDiagnosticSeverities = diagnosticSeverities.map((diagnostic) => {
        switch (diagnostic) {
          case "error":
            return vscode2.DiagnosticSeverity.Error;
          case "warning":
            return vscode2.DiagnosticSeverity.Warning;
          case "information":
            return vscode2.DiagnosticSeverity.Information;
          case "hint":
            return vscode2.DiagnosticSeverity.Hint;
        }
      });
      const diagnostics = vscode2.languages.getDiagnostics(document2.uri).filter((diagnostic) => includedDiagnosticSeverities.includes(diagnostic.severity) && diagnostic.range.start.line >= range.start.line && diagnostic.range.end.line <= range.end.line).map((diagnostic) => ({
        line: diagnostic.range.start.line,
        message: diagnostic.message,
        source: diagnostic.source,
        code: typeof diagnostic.code === "object" ? diagnostic.code.value : diagnostic.code,
        severity: diagnostic.severity
      }));
      if (diagnostics.length === 0) {
        return void 0;
      }
      return annotateSelectionWithDiagnostics({
        selectionText: document2.getText(selection),
        selectionStartLine: range.start.line,
        diagnostics
      });
    };
    exports2.getSelectedTextWithDiagnostics = getSelectedTextWithDiagnostics;
    function annotateSelectionWithDiagnostics({ selectionText, selectionStartLine, diagnostics }) {
      return selectionText.split(/[\r\n]+/).map((line, index) => {
        const actualLineNumber = selectionStartLine + index;
        const lineDiagnostics = diagnostics.filter((diagnostic) => diagnostic.line === actualLineNumber);
        return lineDiagnostics.length === 0 ? line : `${line}
${lineDiagnostics.map((diagnostic) => `${getLabel(diagnostic.severity)} ${diagnostic.source}${diagnostic.code}: ${diagnostic.message}`).join("\n")}`;
      }).join("\n");
    }
    function getLabel(severity) {
      switch (severity) {
        case vscode2.DiagnosticSeverity.Error:
          return "ERROR";
        case vscode2.DiagnosticSeverity.Warning:
          return "WARNING";
        case vscode2.DiagnosticSeverity.Information:
          return "INFO";
        case vscode2.DiagnosticSeverity.Hint:
          return "HINT";
      }
    }
  }
});

// build/conversation/input/getOpenFiles.js
var require_getOpenFiles = __commonJS({
  "build/conversation/input/getOpenFiles.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getOpenFiles = void 0;
    var vscode2 = __importStar2(require("vscode"));
    var getOpenFiles = async () => {
      const contextDocuments = vscode2.workspace.textDocuments.filter((document2) => document2.uri.scheme === "file");
      return contextDocuments.map((document2) => {
        return {
          name: document2.fileName,
          language: document2.languageId,
          content: document2.getText()
        };
      });
    };
    exports2.getOpenFiles = getOpenFiles;
  }
});

// build/conversation/input/resolveVariable.js
var require_resolveVariable = __commonJS({
  "build/conversation/input/resolveVariable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveVariable = void 0;
    var getFilename_1 = require_getFilename();
    var getLanguage_1 = require_getLanguage();
    var getSelectedText_1 = require_getSelectedText();
    var getSelectedLocationText_1 = require_getSelectedLocationText();
    var getSelectionWithDiagnostics_1 = require_getSelectionWithDiagnostics();
    var getOpenFiles_1 = require_getOpenFiles();
    async function resolveVariable(variable, { messages } = {}) {
      const variableType = variable.type;
      switch (variableType) {
        case "context":
          return (0, getOpenFiles_1.getOpenFiles)();
        case "constant":
          return variable.value;
        case "message":
          return messages?.at(variable.index)?.[variable.property];
        case "selected-text":
          return (0, getSelectedText_1.getSelectedText)();
        case "selected-location-text":
          return (0, getSelectedLocationText_1.getSelectedLocationText)();
        case "filename":
          return (0, getFilename_1.getFilename)();
        case "language":
          return (0, getLanguage_1.getLanguage)();
        case "selected-text-with-diagnostics":
          return (0, getSelectionWithDiagnostics_1.getSelectedTextWithDiagnostics)({
            diagnosticSeverities: variable.severities
          });
        default: {
          const exhaustiveCheck = variableType;
          throw new Error(`unsupported type: ${exhaustiveCheck}`);
        }
      }
    }
    exports2.resolveVariable = resolveVariable;
  }
});

// build/conversation/input/validateVariable.js
var require_validateVariable = __commonJS({
  "build/conversation/input/validateVariable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateVariable = void 0;
    function validateVariable({ value, variable }) {
      for (const constraint of variable.constraints ?? []) {
        if (constraint.type === "text-length") {
          if (value == void 0) {
            throw new Error(`Variable '${variable.name}' is undefined`);
          }
          if (typeof value !== "string") {
            throw new Error(`Variable '${variable.name}' is not a string`);
          }
          if (value.length < constraint.min) {
            throw new Error(`Variable '${variable.name}' is too short`);
          }
        }
      }
    }
    exports2.validateVariable = validateVariable;
  }
});

// build/conversation/input/resolveVariables.js
var require_resolveVariables = __commonJS({
  "build/conversation/input/resolveVariables.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveVariables = void 0;
    var resolveVariable_1 = require_resolveVariable();
    var validateVariable_1 = require_validateVariable();
    async function resolveVariables(variables, { time, messages }) {
      const variableValues = {
        messages
      };
      if (messages != null) {
        variableValues.messages = messages;
      }
      for (const variable of variables ?? []) {
        if (variable.time !== time) {
          continue;
        }
        if (variableValues[variable.name] != void 0) {
          throw new Error(`Variable '${variable.name}' is already defined`);
        }
        const value = await (0, resolveVariable_1.resolveVariable)(variable, { messages });
        (0, validateVariable_1.validateVariable)({ value, variable });
        variableValues[variable.name] = value;
      }
      return variableValues;
    }
    exports2.resolveVariables = resolveVariables;
  }
});

// build/chat/ChatController.js
var require_ChatController = __commonJS({
  "build/chat/ChatController.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ChatController = void 0;
    var common_1 = require_build();
    var vscode2 = __importStar2(require("vscode"));
    var resolveVariables_1 = require_resolveVariables();
    var ChatController = class {
      constructor({ chatPanel, chatModel, ai, getConversationType, diffEditorManager, basicChatTemplateId }) {
        this.chatPanel = chatPanel;
        this.chatModel = chatModel;
        this.ai = ai;
        this.getConversationType = getConversationType;
        this.diffEditorManager = diffEditorManager;
        this.basicChatTemplateId = basicChatTemplateId;
        this.generateConversationId = common_1.util.createNextId({
          prefix: "conversation-"
        });
      }
      async updateChatPanel() {
        await this.chatPanel.update(this.chatModel);
      }
      async addAndShowConversation(conversation) {
        this.chatModel.addAndSelectConversation(conversation);
        await this.showChatPanel();
        await this.updateChatPanel();
        return conversation;
      }
      async showChatPanel() {
        await vscode2.commands.executeCommand("pearai.chat.focus");
      }
      async receivePanelMessage(rawMessage) {
        const message = common_1.webviewApi.outgoingMessageSchema.parse(rawMessage);
        const type = message.type;
        switch (type) {
          case "enterOpenAIApiKey": {
            await vscode2.commands.executeCommand("pearai.enterOpenAIApiKey");
            break;
          }
          case "clickCollapsedConversation": {
            this.chatModel.selectedConversationId = message.data.id;
            await this.updateChatPanel();
            break;
          }
          case "sendMessage": {
            await this.chatModel.getConversationById(message.data.id)?.answer(message.data.message);
            break;
          }
          case "startChat": {
            await this.createConversation(this.basicChatTemplateId);
            break;
          }
          case "deleteConversation": {
            this.chatModel.deleteConversation(message.data.id);
            await this.updateChatPanel();
            break;
          }
          case "exportConversation": {
            await this.chatModel.getConversationById(message.data.id)?.exportMarkdown();
            break;
          }
          case "retry": {
            await this.chatModel.getConversationById(message.data.id)?.retry();
            break;
          }
          case "dismissError":
            await this.chatModel.getConversationById(message.data.id)?.dismissError();
            break;
          case "insertPromptIntoEditor":
            await this.chatModel.getConversationById(message.data.id)?.insertPromptIntoEditor();
            break;
          case "applyDiff":
          case "reportError": {
            break;
          }
          default: {
            const exhaustiveCheck = type;
            throw new Error(`unsupported type: ${exhaustiveCheck}`);
          }
        }
      }
      async createConversation(conversationTypeId) {
        try {
          const conversationType = this.getConversationType(conversationTypeId);
          if (conversationType == void 0) {
            throw new Error(`No conversation type found for ${conversationTypeId}`);
          }
          const variableValues = await (0, resolveVariables_1.resolveVariables)(conversationType.variables, {
            time: "conversation-start"
          });
          const result = await conversationType.createConversation({
            conversationId: this.generateConversationId(),
            ai: this.ai,
            updateChatPanel: this.updateChatPanel.bind(this),
            diffEditorManager: this.diffEditorManager,
            initVariables: variableValues
          });
          if (result.type === "unavailable") {
            if (result.display === "info") {
              await vscode2.window.showInformationMessage(result.message);
            } else if (result.display === "error") {
              await vscode2.window.showErrorMessage(result.message);
            } else {
              await vscode2.window.showErrorMessage("Required input unavailable");
            }
            return;
          }
          await this.addAndShowConversation(result.conversation);
          if (result.shouldImmediatelyAnswer) {
            await result.conversation.answer();
          }
        } catch (error) {
          console.log(error);
          await vscode2.window.showErrorMessage(error?.message ?? error);
        }
      }
    };
    exports2.ChatController = ChatController;
  }
});

// build/chat/ChatModel.js
var require_ChatModel = __commonJS({
  "build/chat/ChatModel.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ChatModel = void 0;
    var ChatModel = class {
      constructor() {
        this.conversations = [];
      }
      addAndSelectConversation(conversation) {
        this.conversations.push(conversation);
        this.selectedConversationId = conversation.id;
      }
      getConversationById(id) {
        return this.conversations.find((conversation) => conversation.id === id);
      }
      deleteConversation(id) {
        this.conversations = this.conversations.filter((conversation) => conversation.id !== id);
      }
    };
    exports2.ChatModel = ChatModel;
  }
});

// build/webview/generateNonce.js
var require_generateNonce = __commonJS({
  "build/webview/generateNonce.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateNonce = void 0;
    var POSSIBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    function generateNonce() {
      let text13 = "";
      for (let i = 0; i < 32; i++) {
        text13 += POSSIBLE_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_CHARS.length));
      }
      return text13;
    }
    exports2.generateNonce = generateNonce;
  }
});

// build/webview/WebviewContainer.js
var require_WebviewContainer = __commonJS({
  "build/webview/WebviewContainer.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WebviewContainer = void 0;
    var vscode2 = __importStar2(require("vscode"));
    var generateNonce_1 = require_generateNonce();
    var WebviewContainer = class {
      constructor({ panelId, panelCssId = panelId, webview, extensionUri, isStateReloadingEnabled }) {
        this.panelId = panelId;
        this.panelCssId = panelCssId;
        this.webview = webview;
        this.extensionUri = extensionUri;
        this.isStateReloadingEnabled = isStateReloadingEnabled;
        this.webview.options = {
          enableScripts: true,
          localResourceRoots: [this.extensionUri]
        };
        this.webview.html = this.createHtml();
        this.onDidReceiveMessage = this.webview.onDidReceiveMessage;
      }
      async updateState(state) {
        return this.webview.postMessage({
          type: "updateState",
          state
        });
      }
      getUri(...paths) {
        const baseUri = this.extensionUri.fsPath.endsWith("dev") ? this.extensionUri : vscode2.Uri.joinPath(this.extensionUri, "lib");
        return this.webview.asWebviewUri(vscode2.Uri.joinPath(baseUri, "webview", ...paths));
      }
      createHtml() {
        const baseCssUri = this.getUri("asset", "base.css");
        const codiconsCssUri = this.getUri("asset", "codicons.css");
        const panelCssUri = this.getUri("asset", `${this.panelCssId}.css`);
        const scriptUri = this.getUri("dist", "webview.js");
        const prismScriptUri = this.getUri("asset", "prism.js");
        const nonce = (0, generateNonce_1.generateNonce)();
        const prismNonce = (0, generateNonce_1.generateNonce)();
        const cspSource = this.webview?.cspSource;
        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'none'; font-src ${cspSource}; style-src ${cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' 'nonce-${prismNonce}';" />
    <link href="${baseCssUri}" rel="stylesheet" />
    <link href="${codiconsCssUri}" rel="stylesheet" />
    <link href="${panelCssUri}" rel="stylesheet" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root" />

    <!-- Without the closing /script tag, the second script doesn't load -->
    <script nonce="${prismNonce}" src="${prismScriptUri}"></script>
    <script nonce="${nonce}"
            src="${scriptUri}"
            data-panel-id="${this.panelId}"
            data-state-reloading-enabled="${this.isStateReloadingEnabled}" />
  </body>
</html>`;
      }
    };
    exports2.WebviewContainer = WebviewContainer;
  }
});

// build/chat/ChatPanel.js
var require_ChatPanel = __commonJS({
  "build/chat/ChatPanel.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ChatPanel = void 0;
    var vscode2 = __importStar2(require("vscode"));
    var WebviewContainer_1 = require_WebviewContainer();
    function getConfigSurfacePromptForOpenAIPlus() {
      return vscode2.workspace.getConfiguration("pearai.openAI").get("surfacePromptForPlus", false);
    }
    var ChatPanel = class {
      constructor({ extensionUri, apiKeyManager, hasOpenAIApiKey }) {
        this.disposables = [];
        this.messageEmitter = new vscode2.EventEmitter();
        this.onDidReceiveMessage = this.messageEmitter.event;
        this.extensionUri = extensionUri;
        this.apiKeyManager = apiKeyManager;
        const surfacePromptForOpenAIPlus = getConfigSurfacePromptForOpenAIPlus();
        this.state = {
          type: "chat",
          selectedConversationId: void 0,
          conversations: [],
          hasOpenAIApiKey,
          surfacePromptForOpenAIPlus
        };
        this.apiKeyManager.onUpdate(async () => {
          if (this.state?.type !== "chat") {
            return;
          }
          const hasOpenAIApiKey2 = await this.apiKeyManager.hasOpenAIApiKey();
          if (this.state.hasOpenAIApiKey === hasOpenAIApiKey2) {
            return;
          }
          this.state.hasOpenAIApiKey = hasOpenAIApiKey2;
          this.renderPanel();
        });
      }
      async renderPanel() {
        return this.webviewPanel?.updateState(this.state);
      }
      async resolveWebviewView(webviewView) {
        this.webviewPanel = new WebviewContainer_1.WebviewContainer({
          panelId: "chat",
          isStateReloadingEnabled: false,
          webview: webviewView.webview,
          extensionUri: this.extensionUri
        });
        const receiveMessageDisposable = this.webviewPanel.onDidReceiveMessage((message) => {
          this.messageEmitter.fire(message);
        });
        this.disposables.push(webviewView.onDidDispose(() => {
          receiveMessageDisposable.dispose();
          this.webviewPanel = void 0;
        }));
        this.disposables.push(webviewView.onDidChangeVisibility(async () => {
          if (webviewView.visible) {
            return this.renderPanel();
          }
        }));
        this.renderPanel();
      }
      async update(model) {
        const conversations = [];
        for (const conversation of model.conversations) {
          conversations.push(await conversation.toWebviewConversation());
        }
        const surfacePromptForOpenAIPlus = getConfigSurfacePromptForOpenAIPlus();
        const hasOpenAIApiKey = await this.apiKeyManager.hasOpenAIApiKey();
        this.state = {
          type: "chat",
          selectedConversationId: model.selectedConversationId,
          conversations,
          hasOpenAIApiKey,
          surfacePromptForOpenAIPlus
        };
        return this.renderPanel();
      }
      dispose() {
        this.disposables.forEach((disposable) => disposable.dispose());
      }
    };
    exports2.ChatPanel = ChatPanel;
    ChatPanel.id = "pearai.chat";
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/utils.js
var require_utils = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/utils.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.extend = extend;
    exports2.indexOf = indexOf;
    exports2.escapeExpression = escapeExpression;
    exports2.isEmpty = isEmpty;
    exports2.createFrame = createFrame;
    exports2.blockParams = blockParams;
    exports2.appendContextPath = appendContextPath;
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    var badChars = /[&<>"'`=]/g;
    var possible = /[&<>"'`=]/;
    function escapeChar(chr) {
      return escape[chr];
    }
    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
    var toString = Object.prototype.toString;
    exports2.toString = toString;
    var isFunction = function isFunction2(value) {
      return typeof value === "function";
    };
    if (isFunction(/x/)) {
      exports2.isFunction = isFunction = function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]";
      };
    }
    exports2.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
    };
    exports2.isArray = isArray;
    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
    function escapeExpression(string) {
      if (typeof string !== "string") {
        if (string && string.toHTML) {
          return string.toHTML();
        } else if (string == null) {
          return "";
        } else if (!string) {
          return string + "";
        }
        string = "" + string;
      }
      if (!possible.test(string)) {
        return string;
      }
      return string.replace(badChars, escapeChar);
    }
    function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame;
    }
    function blockParams(params, ids) {
      params.path = ids;
      return params;
    }
    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id;
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/exception.js
var require_exception = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/exception.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
    function Exception(message, node) {
      var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column;
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }
      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;
          if (Object.defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, "endColumn", {
              value: endColumn,
              enumerable: true
            });
          } else {
            this.column = column;
            this.endColumn = endColumn;
          }
        }
      } catch (nop) {
      }
    }
    Exception.prototype = new Error();
    exports2["default"] = Exception;
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js
var require_block_helper_missing = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    exports2["default"] = function(instance) {
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse, fn = options.fn;
        if (context === true) {
          return fn(this);
        } else if (context === false || context == null) {
          return inverse(this);
        } else if (_utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name];
            }
            return instance.helpers.each(context, options);
          } else {
            return inverse(this);
          }
        } else {
          if (options.data && options.ids) {
            var data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
            options = { data };
          }
          return fn(context, options);
        }
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/each.js
var require_each = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/each.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("each", function(context, options) {
        if (!options) {
          throw new _exception2["default"]("Must pass iterator to #each");
        }
        var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = void 0, contextPath = void 0;
        if (options.data && options.ids) {
          contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        if (options.data) {
          data = _utils.createFrame(options.data);
        }
        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;
            if (contextPath) {
              data.contextPath = contextPath + field;
            }
          }
          ret = ret + fn(context[field], {
            data,
            blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
          });
        }
        if (context && typeof context === "object") {
          if (_utils.isArray(context)) {
            for (var j = context.length; i < j; i++) {
              if (i in context) {
                execIteration(i, i, i === context.length - 1);
              }
            }
          } else if (typeof Symbol === "function" && context[Symbol.iterator]) {
            var newContext = [];
            var iterator = context[Symbol.iterator]();
            for (var it = iterator.next(); !it.done; it = iterator.next()) {
              newContext.push(it.value);
            }
            context = newContext;
            for (var j = context.length; i < j; i++) {
              execIteration(i, i, i === context.length - 1);
            }
          } else {
            (function() {
              var priorKey = void 0;
              Object.keys(context).forEach(function(key) {
                if (priorKey !== void 0) {
                  execIteration(priorKey, i - 1);
                }
                priorKey = key;
                i++;
              });
              if (priorKey !== void 0) {
                execIteration(priorKey, i - 1, true);
              }
            })();
          }
        }
        if (i === 0) {
          ret = inverse(this);
        }
        return ret;
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js
var require_helper_missing = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return void 0;
        } else {
          throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
        }
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/if.js
var require_if = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/if.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("if", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#if requires exactly one argument");
        }
        if (_utils.isFunction(conditional)) {
          conditional = conditional.call(this);
        }
        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#unless requires exactly one argument");
        }
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        });
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/log.js
var require_log = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/log.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    exports2["default"] = function(instance) {
      instance.registerHelper("log", function() {
        var args = [void 0], options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i]);
        }
        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level;
        } else if (options.data && options.data.level != null) {
          level = options.data.level;
        }
        args[0] = level;
        instance.log.apply(instance, args);
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js
var require_lookup = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    exports2["default"] = function(instance) {
      instance.registerHelper("lookup", function(obj, field, options) {
        if (!obj) {
          return obj;
        }
        return options.lookupProperty(obj, field);
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers/with.js
var require_with = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers/with.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("with", function(context, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#with requires exactly one argument");
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        var fn = options.fn;
        if (!_utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
          }
          return fn(context, {
            data,
            blockParams: _utils.blockParams([context], [data && data.contextPath])
          });
        } else {
          return options.inverse(this);
        }
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/helpers.js
var require_helpers = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/helpers.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.registerDefaultHelpers = registerDefaultHelpers;
    exports2.moveHelperToHooks = moveHelperToHooks;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _helpersBlockHelperMissing = require_block_helper_missing();
    var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
    var _helpersEach = require_each();
    var _helpersEach2 = _interopRequireDefault(_helpersEach);
    var _helpersHelperMissing = require_helper_missing();
    var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
    var _helpersIf = require_if();
    var _helpersIf2 = _interopRequireDefault(_helpersIf);
    var _helpersLog = require_log();
    var _helpersLog2 = _interopRequireDefault(_helpersLog);
    var _helpersLookup = require_lookup();
    var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
    var _helpersWith = require_with();
    var _helpersWith2 = _interopRequireDefault(_helpersWith);
    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2["default"](instance);
      _helpersEach2["default"](instance);
      _helpersHelperMissing2["default"](instance);
      _helpersIf2["default"](instance);
      _helpersLog2["default"](instance);
      _helpersLookup2["default"](instance);
      _helpersWith2["default"](instance);
    }
    function moveHelperToHooks(instance, helperName, keepHelper) {
      if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) {
          delete instance.helpers[helperName];
        }
      }
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js
var require_inline = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    exports2["default"] = function(instance) {
      instance.registerDecorator("inline", function(fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
          props.partials = {};
          ret = function(context, options2) {
            var original = container.partials;
            container.partials = _utils.extend({}, original, props.partials);
            var ret2 = fn(context, options2);
            container.partials = original;
            return ret2;
          };
        }
        props.partials[options.args[0]] = options.fn;
        return ret;
      });
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/decorators.js
var require_decorators = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/decorators.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.registerDefaultDecorators = registerDefaultDecorators;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _decoratorsInline = require_inline();
    var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
    function registerDefaultDecorators(instance) {
      _decoratorsInline2["default"](instance);
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/logger.js
var require_logger = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/logger.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    var logger = {
      methodMap: ["debug", "info", "warn", "error"],
      level: "info",
      lookupLevel: function lookupLevel(level) {
        if (typeof level === "string") {
          var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap;
          } else {
            level = parseInt(level, 10);
          }
        }
        return level;
      },
      log: function log(level) {
        level = logger.lookupLevel(level);
        if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            method = "log";
          }
          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key];
          }
          console[method].apply(console, message);
        }
      }
    };
    exports2["default"] = logger;
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js
var require_create_new_lookup_object = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.createNewLookupObject = createNewLookupObject;
    var _utils = require_utils();
    function createNewLookupObject() {
      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }
      return _utils.extend.apply(void 0, [/* @__PURE__ */ Object.create(null)].concat(sources));
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js
var require_proto_access = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.createProtoAccessControl = createProtoAccessControl;
    exports2.resultIsAllowed = resultIsAllowed;
    exports2.resetLoggedProperties = resetLoggedProperties;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _createNewLookupObject = require_create_new_lookup_object();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var loggedProperties = /* @__PURE__ */ Object.create(null);
    function createProtoAccessControl(runtimeOptions) {
      var defaultMethodWhiteList = /* @__PURE__ */ Object.create(null);
      defaultMethodWhiteList["constructor"] = false;
      defaultMethodWhiteList["__defineGetter__"] = false;
      defaultMethodWhiteList["__defineSetter__"] = false;
      defaultMethodWhiteList["__lookupGetter__"] = false;
      var defaultPropertyWhiteList = /* @__PURE__ */ Object.create(null);
      defaultPropertyWhiteList["__proto__"] = false;
      return {
        properties: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
          defaultValue: runtimeOptions.allowProtoPropertiesByDefault
        },
        methods: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
          defaultValue: runtimeOptions.allowProtoMethodsByDefault
        }
      };
    }
    function resultIsAllowed(result, protoAccessControl, propertyName) {
      if (typeof result === "function") {
        return checkWhiteList(protoAccessControl.methods, propertyName);
      } else {
        return checkWhiteList(protoAccessControl.properties, propertyName);
      }
    }
    function checkWhiteList(protoAccessControlForType, propertyName) {
      if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
        return protoAccessControlForType.whitelist[propertyName] === true;
      }
      if (protoAccessControlForType.defaultValue !== void 0) {
        return protoAccessControlForType.defaultValue;
      }
      logUnexpecedPropertyAccessOnce(propertyName);
      return false;
    }
    function logUnexpecedPropertyAccessOnce(propertyName) {
      if (loggedProperties[propertyName] !== true) {
        loggedProperties[propertyName] = true;
        _logger2["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
      }
    }
    function resetLoggedProperties() {
      Object.keys(loggedProperties).forEach(function(propertyName) {
        delete loggedProperties[propertyName];
      });
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/base.js
var require_base = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/base.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.HandlebarsEnvironment = HandlebarsEnvironment;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _helpers = require_helpers();
    var _decorators = require_decorators();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var _internalProtoAccess = require_proto_access();
    var VERSION = "4.7.8";
    exports2.VERSION = VERSION;
    var COMPILER_REVISION = 8;
    exports2.COMPILER_REVISION = COMPILER_REVISION;
    var LAST_COMPATIBLE_COMPILER_REVISION = 7;
    exports2.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0 <4.3.0",
      8: ">= 4.3.0"
    };
    exports2.REVISION_CHANGES = REVISION_CHANGES;
    var objectType2 = "[object Object]";
    function HandlebarsEnvironment(helpers, partials, decorators) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators || {};
      _helpers.registerDefaultHelpers(this);
      _decorators.registerDefaultDecorators(this);
    }
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: _logger2["default"],
      log: _logger2["default"].log,
      registerHelper: function registerHelper(name, fn) {
        if (_utils.toString.call(name) === objectType2) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple helpers");
          }
          _utils.extend(this.helpers, name);
        } else {
          this.helpers[name] = fn;
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name];
      },
      registerPartial: function registerPartial(name, partial) {
        if (_utils.toString.call(name) === objectType2) {
          _utils.extend(this.partials, name);
        } else {
          if (typeof partial === "undefined") {
            throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
          }
          this.partials[name] = partial;
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name];
      },
      registerDecorator: function registerDecorator(name, fn) {
        if (_utils.toString.call(name) === objectType2) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple decorators");
          }
          _utils.extend(this.decorators, name);
        } else {
          this.decorators[name] = fn;
        }
      },
      unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name];
      },
      resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
        _internalProtoAccess.resetLoggedProperties();
      }
    };
    var log = _logger2["default"].log;
    exports2.log = log;
    exports2.createFrame = _utils.createFrame;
    exports2.logger = _logger2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/safe-string.js
var require_safe_string = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/safe-string.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function SafeString(string) {
      this.string = string;
    }
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string;
    };
    exports2["default"] = SafeString;
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js
var require_wrapHelper = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.wrapHelper = wrapHelper;
    function wrapHelper(helper, transformOptionsFn) {
      if (typeof helper !== "function") {
        return helper;
      }
      var wrapper = function wrapper2() {
        var options = arguments[arguments.length - 1];
        arguments[arguments.length - 1] = transformOptionsFn(options);
        return helper.apply(this, arguments);
      };
      return wrapper;
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/runtime.js
var require_runtime = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/runtime.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.checkRevision = checkRevision;
    exports2.template = template;
    exports2.wrapProgram = wrapProgram;
    exports2.resolvePartial = resolvePartial;
    exports2.invokePartial = invokePartial;
    exports2.noop = noop;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    var _utils = require_utils();
    var Utils = _interopRequireWildcard(_utils);
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _base = require_base();
    var _helpers = require_helpers();
    var _internalWrapHelper = require_wrapHelper();
    var _internalProtoAccess = require_proto_access();
    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
      if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
        return;
      }
      if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
        var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
        throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
      } else {
        throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
      }
    }
    function template(templateSpec, env) {
      if (!env) {
        throw new _exception2["default"]("No environment passed to template");
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
      }
      templateSpec.main.decorator = templateSpec.main_d;
      env.VM.checkRevision(templateSpec.compiler);
      var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true;
          }
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var extendedOptions = Utils.extend({}, options, {
          hooks: this.hooks,
          protoAccessControl: this.protoAccessControl
        });
        var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, extendedOptions);
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break;
              }
              lines[i] = options.indent + lines[i];
            }
            result = lines.join("\n");
          }
          return result;
        } else {
          throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
        }
      }
      var container = {
        strict: function strict(obj, name, loc) {
          if (!obj || !(name in obj)) {
            throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
              loc
            });
          }
          return container.lookupProperty(obj, name);
        },
        lookupProperty: function lookupProperty(parent, propertyName) {
          var result = parent[propertyName];
          if (result == null) {
            return result;
          }
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return result;
          }
          if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
            return result;
          }
          return void 0;
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            var result = depths[i] && container.lookupProperty(depths[i], name);
            if (result != null) {
              return depths[i][name];
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current;
        },
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn(i) {
          var ret2 = templateSpec[i];
          ret2.decorator = templateSpec[i + "_d"];
          return ret2;
        },
        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i], fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn);
          }
          return programWrapper;
        },
        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent;
          }
          return value;
        },
        mergeIfNeeded: function mergeIfNeeded(param, common) {
          var obj = param || common;
          if (param && common && param !== common) {
            obj = Utils.extend({}, common, param);
          }
          return obj;
        },
        nullContext: Object.seal({}),
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };
      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data);
        }
        var depths = void 0, blockParams = templateSpec.useBlockParams ? [] : void 0;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
          } else {
            depths = [context];
          }
        }
        function main(context2) {
          return "" + templateSpec.main(container, context2, container.helpers, container.partials, data, blockParams, depths);
        }
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options);
      }
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
          wrapHelpersToPassLookupProperty(mergedHelpers, container);
          container.helpers = mergedHelpers;
          if (templateSpec.usePartial) {
            container.partials = container.mergeIfNeeded(options.partials, env.partials);
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = Utils.extend({}, env.decorators, options.decorators);
          }
          container.hooks = {};
          container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
          var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
          _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
          _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
        } else {
          container.protoAccessControl = options.protoAccessControl;
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators;
          container.hooks = options.hooks;
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2["default"]("must pass block params");
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2["default"]("must pass parent depths");
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
      };
      return ret;
    }
    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths);
        }
        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
      }
      prog = executeDecorators(fn, prog, container, depths, data, blockParams);
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog;
    }
    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === "@partial-block") {
          partial = options.data["partial-block"];
        } else {
          partial = options.partials[options.name];
        }
      } else if (!partial.call && !options.name) {
        options.name = partial;
        partial = options.partials[partial];
      }
      return partial;
    }
    function invokePartial(partial, context, options) {
      var currentPartialBlock = options.data && options.data["partial-block"];
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath;
      }
      var partialBlock = void 0;
      if (options.fn && options.fn !== noop) {
        (function() {
          options.data = _base.createFrame(options.data);
          var fn = options.fn;
          partialBlock = options.data["partial-block"] = function partialBlockWrapper(context2) {
            var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
            options2.data = _base.createFrame(options2.data);
            options2.data["partial-block"] = currentPartialBlock;
            return fn(context2, options2);
          };
          if (fn.partials) {
            options.partials = Utils.extend({}, options.partials, fn.partials);
          }
        })();
      }
      if (partial === void 0 && partialBlock) {
        partial = partialBlock;
      }
      if (partial === void 0) {
        throw new _exception2["default"]("The partial " + options.name + " could not be found");
      } else if (partial instanceof Function) {
        return partial(context, options);
      }
    }
    function noop() {
      return "";
    }
    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _base.createFrame(data) : {};
        data.root = context;
      }
      return data;
    }
    function executeDecorators(fn, prog, container, depths, data, blockParams) {
      if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props);
      }
      return prog;
    }
    function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
      Object.keys(mergedHelpers).forEach(function(helperName) {
        var helper = mergedHelpers[helperName];
        mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
      });
    }
    function passLookupPropertyOption(helper, container) {
      var lookupProperty = container.lookupProperty;
      return _internalWrapHelper.wrapHelper(helper, function(options) {
        return Utils.extend({ lookupProperty }, options);
      });
    }
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/no-conflict.js
var require_no_conflict = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/no-conflict.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    exports2["default"] = function(Handlebars) {
      (function() {
        if (typeof globalThis === "object")
          return;
        Object.prototype.__defineGetter__("__magic__", function() {
          return this;
        });
        __magic__.globalThis = __magic__;
        delete Object.prototype.__magic__;
      })();
      var $Handlebars = globalThis.Handlebars;
      Handlebars.noConflict = function() {
        if (globalThis.Handlebars === Handlebars) {
          globalThis.Handlebars = $Handlebars;
        }
        return Handlebars;
      };
    };
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars.runtime.js
var require_handlebars_runtime = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars.runtime.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    var _handlebarsBase = require_base();
    var base = _interopRequireWildcard(_handlebarsBase);
    var _handlebarsSafeString = require_safe_string();
    var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
    var _handlebarsException = require_exception();
    var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
    var _handlebarsUtils = require_utils();
    var Utils = _interopRequireWildcard(_handlebarsUtils);
    var _handlebarsRuntime = require_runtime();
    var runtime = _interopRequireWildcard(_handlebarsRuntime);
    var _handlebarsNoConflict = require_no_conflict();
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    function create() {
      var hb = new base.HandlebarsEnvironment();
      Utils.extend(hb, base);
      hb.SafeString = _handlebarsSafeString2["default"];
      hb.Exception = _handlebarsException2["default"];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;
      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb);
      };
      return hb;
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst["default"] = inst;
    exports2["default"] = inst;
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/compiler/ast.js
var require_ast = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/compiler/ast.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var AST = {
      helpers: {
        helperExpression: function helperExpression(node) {
          return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
        },
        scopedId: function scopedId(path) {
          return /^\.|this\b/.test(path.original);
        },
        simpleId: function simpleId(path) {
          return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
        }
      }
    };
    exports2["default"] = AST;
    module2.exports = exports2["default"];
  }
});

// ../../node_modules/handlebars/dist/cjs/handlebars/compiler/parser.js
var require_parser = __commonJS({
  "../../node_modules/handlebars/dist/cjs/handlebars/compiler/parser.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var handlebars = function() {
      var parser = {
        trace: function trace() {
        },
        yy: {},
        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return $$[$0 - 1];
              break;
            case 2:
              this.$ = yy.prepareProgram($$[$0]);
              break;
            case 3:
              this.$ = $$[$0];
              break;
            case 4:
              this.$ = $$[$0];
              break;
            case 5:
              this.$ = $$[$0];
              break;
            case 6:
              this.$ = $$[$0];
              break;
            case 7:
              this.$ = $$[$0];
              break;
            case 8:
              this.$ = $$[$0];
              break;
            case 9:
              this.$ = {
                type: "CommentStatement",
                value: yy.stripComment($$[$0]),
                strip: yy.stripFlags($$[$0], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 10:
              this.$ = {
                type: "ContentStatement",
                original: $$[$0],
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 11:
              this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 12:
              this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
              break;
            case 13:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
              break;
            case 14:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
              break;
            case 15:
              this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 16:
              this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 17:
              this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 18:
              this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
              break;
            case 19:
              var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
              program.chained = true;
              this.$ = { strip: $$[$0 - 2].strip, program, chain: true };
              break;
            case 20:
              this.$ = $$[$0];
              break;
            case 21:
              this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
              break;
            case 22:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 23:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 24:
              this.$ = {
                type: "PartialStatement",
                name: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                indent: "",
                strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 25:
              this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 26:
              this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
              break;
            case 27:
              this.$ = $$[$0];
              break;
            case 28:
              this.$ = $$[$0];
              break;
            case 29:
              this.$ = {
                type: "SubExpression",
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                loc: yy.locInfo(this._$)
              };
              break;
            case 30:
              this.$ = { type: "Hash", pairs: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 31:
              this.$ = { type: "HashPair", key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 32:
              this.$ = yy.id($$[$0 - 1]);
              break;
            case 33:
              this.$ = $$[$0];
              break;
            case 34:
              this.$ = $$[$0];
              break;
            case 35:
              this.$ = { type: "StringLiteral", value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 36:
              this.$ = { type: "NumberLiteral", value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
              break;
            case 37:
              this.$ = { type: "BooleanLiteral", value: $$[$0] === "true", original: $$[$0] === "true", loc: yy.locInfo(this._$) };
              break;
            case 38:
              this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: yy.locInfo(this._$) };
              break;
            case 39:
              this.$ = { type: "NullLiteral", original: null, value: null, loc: yy.locInfo(this._$) };
              break;
            case 40:
              this.$ = $$[$0];
              break;
            case 41:
              this.$ = $$[$0];
              break;
            case 42:
              this.$ = yy.preparePath(true, $$[$0], this._$);
              break;
            case 43:
              this.$ = yy.preparePath(false, $$[$0], this._$);
              break;
            case 44:
              $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });
              this.$ = $$[$0 - 2];
              break;
            case 45:
              this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
              break;
            case 46:
              this.$ = [];
              break;
            case 47:
              $$[$0 - 1].push($$[$0]);
              break;
            case 48:
              this.$ = [];
              break;
            case 49:
              $$[$0 - 1].push($$[$0]);
              break;
            case 50:
              this.$ = [];
              break;
            case 51:
              $$[$0 - 1].push($$[$0]);
              break;
            case 58:
              this.$ = [];
              break;
            case 59:
              $$[$0 - 1].push($$[$0]);
              break;
            case 64:
              this.$ = [];
              break;
            case 65:
              $$[$0 - 1].push($$[$0]);
              break;
            case 70:
              this.$ = [];
              break;
            case 71:
              $$[$0 - 1].push($$[$0]);
              break;
            case 78:
              this.$ = [];
              break;
            case 79:
              $$[$0 - 1].push($$[$0]);
              break;
            case 82:
              this.$ = [];
              break;
            case 83:
              $$[$0 - 1].push($$[$0]);
              break;
            case 86:
              this.$ = [];
              break;
            case 87:
              $$[$0 - 1].push($$[$0]);
              break;
            case 90:
              this.$ = [];
              break;
            case 91:
              $$[$0 - 1].push($$[$0]);
              break;
            case 94:
              this.$ = [];
              break;
            case 95:
              $$[$0 - 1].push($$[$0]);
              break;
            case 98:
              this.$ = [$$[$0]];
              break;
            case 99:
              $$[$0 - 1].push($$[$0]);
              break;
            case 100:
              this.$ = [$$[$0]];
              break;
            case 101:
              $$[$0 - 1].push($$[$0]);
              break;
          }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
        parseError: function parseError(str, hash) {
          throw new Error(str);
        },
        parse: function parse(input) {
          var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined")
            this.lexer.yylloc = {};
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);
          var ranges = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function")
            this.parseError = this.yy.parseError;
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
              token = self.symbols_[token] || token;
            }
            return token;
          }
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                expected = [];
                for (p in table[state])
                  if (this.terminals_[p] && p > 2) {
                    expected.push("'" + this.terminals_[p] + "'");
                  }
                if (this.lexer.showPosition) {
                  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected });
              }
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                    recovering--;
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                if (typeof r !== "undefined") {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      var lexer = function() {
        var lexer2 = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          setInput: function setInput(input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
            if (this.options.ranges)
              this.yylloc.range = [0, 0];
            this.offset = 0;
            return this;
          },
          input: function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges)
              this.yylloc.range[1]++;
            this._input = this._input.slice(1);
            return ch;
          },
          unput: function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1)
              this.yylineno -= lines.length - 1;
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            return this;
          },
          more: function more() {
            this._more = true;
            return this;
          },
          less: function less(n) {
            this.unput(this.match.slice(n));
          },
          pastInput: function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          },
          upcomingInput: function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          },
          showPosition: function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          next: function next() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input)
              this.done = true;
            var token, match, tempMatch, index, col, lines;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex)
                  break;
              }
            }
            if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines)
                this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input)
              else