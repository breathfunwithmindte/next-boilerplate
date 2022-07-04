const TextInput = ({ inp, handleChange }) => {
    return (
        <input
            type={inp.inp_type}
            name={inp.name}
            placeholder="Aa.."
            onChange={handleChange}
        />
    );
}
 
export default TextInput;