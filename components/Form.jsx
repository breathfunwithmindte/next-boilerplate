import { useMemo } from "react";
import useForm from "../hooks/useForm";
import TextInput from "./inputs/Text";

const Form = ({ paths, styling, inputs = [] }) => {
  const [formstate, setFormstate, handleChange] = useForm(paths || [], {roles: [
    {rolename: "hello world"}, {rolename: "hello world"}, {rolename: "hello world"}
  ]});

  const default_style = useMemo(() => {
    return {
      width: "100%",
      heigth: "fit-content",
      minHeight: 369,
      background: "red",
      padding: "var(--p2)",
      display: "flex",
      flexDirection: "column",
    };
  });

  function handleChangeArray (e) {
    const { current, name, property, index } = this;
    setFormstate(pr => {
        console.log(index, "@@")
        if(!pr[name][index]) {
            console.log("no item", pr)
            return pr;
        }
        pr[name][index][property] = e.target.value;
        return {...pr}
    })

  }

  if (!paths) return <p>Error not paths passed in the form</p>;
  return (
    <div style={{ ...default_style, ...styling }}>
      {JSON.stringify(formstate)}
      {inputs.map((inp, index) => {
        switch (inp.type) {
          case "text":
            return (<TextInput inp={inp} setFormstate={setFormstate} />);
          case "array":
            if (formstate[inp.name]) {
              return (
                <div>
                  <div> sector with actions </div>
                  {formstate[inp.name].map((current, j) => {
                    return (
                        <div>
                            {
                                inp.schema.map((x, xindex) => {
                                    switch (x.type) {
                                        case "text":
                                            return (<TextInput key={xindex} inp={inp} handleChange={handleChangeArray.bind({ 
                                                current: current, name: inp.name, property: x.name, index: j 
                                            })} />)
                                    
                                        default:
                                            break;
                                    }
                                })
                            }
                        </div>
                    )
                  })}
                </div>
              );
            } else {
              return (
                <div>
                  <div> sector with actions </div>
                </div>
              );
            }

          default:
            break;
        }
      })}
      <div></div>
    </div>
  );
};

export default Form;
