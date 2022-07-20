const FormInput = (props) => {
    return (
        <input 
            type={props.type === 'email' ? 'email' : props.type === 'text' ? 'text' : props.type === 'date' ? 'date' : props.type === 1 ? 'password' : 'text'} 
            placeholder={props.placeholder} 
            value={props.value}
            onChange={props.onChange}
            inputMode={props.inputMode}
            autoComplete='off'
            required
        />
    );
};

export default FormInput;
