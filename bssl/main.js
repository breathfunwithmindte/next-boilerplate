import { createContext, useContext, useState, useEffect } from "react";
import Form from "../components/Form";
import PrimaryLoading from "../components/PrimaryLoading";
import useApiFetch from "../hooks/useApiFetch";
import useForm from "../hooks/useForm";

/**
 * @typedef {Object} User
 * @property {string} username;
 * @property {string} description;
 *
 * @typedef {Object} Project
 * @property {string} projectname;
 * @property {boolean} active;
 *
 * @typedef {Object} Data;
 * @property {User} user;
 * @property {Project} project;
 */

const mainContext = createContext();

const style = {
  bg0: "#FFFFFF",
  bg1: "#F5F7F9",
  bg2: "#e9e9e9",
  clr: "#FFFFFF",
  clr1: "#eeeeee",
  clr2: "#696969",
  h: "rgba(0,0,0,0.14)",
  p: "1.14rem",
  p1: "0.69rem",
  p2: "0.24rem",
  m: "1.4rem",
  m1: "0.69rem",
  m2: "0.14rem",
  border_clr1: "rgba(255,255,255,0.014)",
  border_clr2: "rgba(255,255,255,0.069)",
  radius: "0.23rem",
  inp_p1: "0.34rem 0.69rem",
  inp_p2: "0.69rem",
  border: "0.14rem solid rgba(255,255,255,0.069)",
  border1: "0.14rem solid #45494E",
  pr: "#007fff",
  pr1: "#0095ff",
  pr2: "#00bfff",
  prh: "#00bfff",
  pclr: "#FFFFFF",
  shadow_len: "0.20rem",
  ppadding: "23vw",
  wpg: "calc(100% - var(--whd))",
  whd: "297px",
};

export const ContextProvider = ({ children }) => {
  /**
   * @type {Data} data
   */
  const [data, loading, error, message, rfetch] = useApiFetch("authenticated");

  const [formstate, setFormstate, handleChange] = useForm([]);

  console.log(formstate);

  /**
   * @type {User} user;
   * @type {Project} project;
   */
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  const [state, setState] = useState({});
  const [theme, setTheme] = useState(style);

  useEffect(() => {
    if (!data || loading) return;
    setUser(data.user);
    setProject(data.project);
    return () => {};
  }, [data]);

  if (loading) return <PrimaryLoading />;
  if (error && error.status === 401) return <o>login</o>;
  if (error)
    return (
      <p>
        Oups something went wrong - reload the page <br /> {error.status} <br />{" "}
        {error.description}
      </p>
    );
  return (
    <mainContext.Provider value={{ state, theme, user, project }}>
           
      <div
        style={{
          ...createStyle(theme),
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <button prm="t">asdasdasd</button>
        <button prm="t1">asdasdasd</button>
        <button prm="t2">asdasdasd</button>
         <button onClick={() => rfetch()}>rrr</button>
            <div style={{width: 1000, minHeight: 2000}}>
              <Form paths={[]} styling={{ background: "#141414" }} inputs={[
                {
                  type: "text", inp_type: "text", name:" password"
                },
                {
                  type: "array", name: "roles", schema: [
                    { type: "text", inp_type: "text", name: "rolename" }
                  ]
                }
              ]}>

              </Form>
              
              <input name="hello" onChange={handleChange} />
              <input name="hello1" onChange={handleChange.bind({ type: "costum", name: "asdasd", value: "asdasd" })} />
              <select name="sooooo" onChange={handleChange}>
                <option value="Asd">aasdasddasd</option>
                <option value="Asd1">aasdasddasd</option>
                <option value="Asd2">aasdasddasd</option>
              </select>
              <input id="oooo1" type={"radio"} name={"something1"} value="value1" onChange={handleChange.bind({ type: "checked" })} />
              <label htmlFor="oooo1">something1</label>

              <input id="oooo2" type={"radio"} name={"something1"} value="value2" onChange={handleChange.bind({ type: "checked" })} />
              <label htmlFor="oooo2">something2</label>

              <input id="oooo3" type={"radio"} name={"something2"} value="value1" onChange={handleChange.bind({ type: "checked" })} />
              <label htmlFor="oooo3">something1</label>

              <input id="oooo4" type={"radio"} name={"something2"} value="value2" onChange={handleChange.bind({ type: "checked" })} />
              <label htmlFor="oooo4">something2</label>


            </div>
        {children}
      </div>
    </mainContext.Provider>
  );
};

export default function useMain() {
  const smth = useContext(mainContext);
  return smth;
}

function createStyle(style) {
  let obj = {};

  for (const key in style) {
    if (Object.hasOwnProperty.call(style, key)) {
      obj[`--${key}`] = style[key];
    }
  }

  return obj;
}
