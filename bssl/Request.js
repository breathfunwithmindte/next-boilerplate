import config from "./config.json"

export default class Request {
  /**
   * @typedef  {string} DOMAIN
   * @typedef  {string} MODE
   * @typedef  {string} GET_METHOD
   * @typedef  {string} POST_METHOD
   * @typedef  {string} PUT_METHOD
   * @typedef  {string} DELETE_METHOD
   *
   * @typedef  {Object} OAUTH_HEADER
   * @property  {string} Content-Type // default "application/json"
   * @property  {string} "authorization"
   *
   * @typedef  {Object} AUTH_HEADER
   * @property  {string} Content-Type // default "application/json"
   * @property  {string} "authentication"
   *
   * @typedef  {Object} HEADER
   * @property  {string} Content-Type // default "application/json"
   *
   * @typedef  {Object} OPTIONS
   * @property  {GET_METHOD | GET_METHOD | GET_METHOD | GET_METHOD} method
   * @property  {OAUTH_HEADER | AUTH_HEADER | HEADER} headers
   * @property  {string | null} body
   */

  /**
   * initial default static variables;
   */
  static DOMAIN = config.mode === "dev" ? config["dev-domain"] : config["dev-domain-api"];
  static mode = config.mode;

  static OAUTH_HEADER = {
    "Content-Type": "application/json",
    authorization: "Bearer some token",
  };
  static AUTH_HEADER = {
    "Content-Type": "application/json",
    authentication: "Basic someusername:password",
  };
  static HEADER = {
    "Content-Type": "application/json",
  };
  static GET_METHOD = "GET";
  static POST_METHOD = "POST";
  static PUT_METHOD = "PUT";
  static DELETE_METHOD = "DELETE";

  /**
   * Request methods
   */

  /**
   *
   * @param {string} path
   * @param {callback} cb
   */
  static async get(path, cb) {
    const result = await Request.cfetch(path, {method: Request.GET_METHOD, headers: Request.OAUTH_HEADER});
    return await Request.exeCallback(result, cb);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   */
  static async post(path, body, cb) {
    const result = await Request.cfetch(path, {method: Request.POST_METHOD, headers: Request.OAUTH_HEADER, body: body ? JSON.stringify(body) : null});
    return await Request.exeCallback(result, cb);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   */
  static async put(path, cb) {
    const result = await Request.cfetch(path, {method: Request.PUT_METHOD, headers: Request.OAUTH_HEADER, body: body ? JSON.stringify(body) : null});
    return await Request.exeCallback(result, cb);
  }

  /**
   *
   * @param {string} path
   * @param {callback} cb
   */
  static async delete(path, cb) {
    const result = await Request.cfetch(path, {method: Request.DELETE_METHOD, headers: Request.OAUTH_HEADER});
    return await Request.exeCallback(result, cb);
  }

  /**
   * methods starts with _ mean not authenticated requests
   */

  /**
   *
   * @param {string} path
   * @param {callback} cb
   */
  static async _get(path, cb) {
    const result = await Request.cfetch(path, {method: Request.GET_METHOD, headers: Request.HEADER});
    return await Request.exeCallback(result, cb);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   */
  static async _post(path, cb) {
    const result = await Request.cfetch(path, {method: Request.POST_METHOD, headers: Request.HEADER, body: body ? JSON.stringify(body) : null});
    return await Request.exeCallback(result, cb);
  }

  /**
   *
   * @param {string} path
   * @param {*} body
   * @param {callback} cb
   */
  static async _put(path, cb) {
    const result = await Request.cfetch(path, {method: Request.PUT_METHOD, headers: Request.HEADER, body: body ? JSON.stringify(body) : null});
    return await Request.exeCallback(result, cb);
  }

  /**
   *
   * @param {string} path
   * @param {callback} cb
   */
  static async _delete(path, cb) {
    const result = await Request.cfetch(path, {method: Request.DELETE_METHOD, headers: Request.HEADER});
    return await Request.exeCallback(result, cb);
  }

  /**
   * @param  {string} path
   * @param  {OPTIONS} options
   */
  static async cfetch(path, options) {
    try {
      const res = await fetch(Request.DOMAIN + path, {
        method: options.method,
        headers: options.headers,
        body: options.body,
      });
      const content_type = res.headers.get("Content-Type");
      if(content_type.search("application/json") !== -1) {
        return { status: res.status, error: null, response: res, data: await res.json(), error_description: "none", content_type: "application/json", path: path }
      }else{
        return { status: res.status, error: null, response: res, data: await res.text(), error_description: "none", content_type: "application/text", path: path }
      }
    } catch (error) {
      console.log(error);
      return { status: -1, error: error, response: null, data: null, error_description: error.toString(), content_type: "none", path: path };
    }
  }

  static async exeCallback (result, cb) {
    try {
       return await cb(result);
    } catch (error) {
        console.log(error);
        alert("FATAL ERROR || -1 --callback error");
        return -1;
    }
  }

}
