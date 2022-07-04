// const callback_binded = default_callback.bind({setData, setLoading, setError, setMessage, good_status: [201], bad_status: [200]})


export default function default_callback({
  status,
  error,
  response,
  data,
  error_description,
  content_type,
  path,
}) {
  const { setLoading, setData, setError, setMessage } = this;
  const statuses_good = this.good_status || [200, 201, 202];
  const statuses_bad = this.bad_status || [400, 401, 403, 404];
  const keyword = this.keyword || "message";

  console.log("@@@@@@@@@", statuses_bad, statuses_bad.some((s) => s === status), status)

  const result = { status, error, response, data, error_description, content_type, path }

  if (status === -1) {
    alert("FATAL ERROR | -1");
    setLoading(false);
    setData(null);
    setError({ status: status, description: error_description, content_type: content_type });
    setMessage("");
    console.log(error);
    return;
  }

  if (
    !statuses_good.some((s) => s === status) &&
    !statuses_bad.some((s) => s === status)
  ) {
    alert("FATAL ERROR | " + status);
    setLoading(false);
    setData(null);
    setError({ status: status, description: data[keyword] || JSON.stringify(data), content_type: content_type });
    setMessage("");
    console.log(result);
    return;
  }

  /**
   * @doc catch good request response like 200, 201 etc ...
   * the message of the response is based on the keyword
   */
  if (statuses_good.some((s) => s === status)) {
    setLoading(false);
    setData(data);
    setError(null);
    setMessage(data[keyword] || JSON.stringify(data));
    console.log(result);
    return;
  }

  /**
   * @doc catch bad request response like 400, 401 etc ...
   * the description of the error is based on the keyword
   */
  if (statuses_bad.some((s) => s === status)) {
    setLoading(false);
    setData(null);
    setError({ status: status, description: data[keyword] || JSON.stringify(data), content_type: content_type });
    setMessage(data[keyword] || JSON.stringify(data));
    console.log(result);
    return;
  }
}
