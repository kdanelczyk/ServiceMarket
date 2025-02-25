import React from 'react';

const StyledForm = ({ title, fields, onSubmit, children, style }) => {
    return (
        <form onSubmit={onSubmit} style={{ ...styles.form, ...style }}>
            {title && <h1 style={styles.title}>{title}</h1>}

            {fields?.map(({ key, label, type = "text", ...rest }) => (
                <div key={key} style={styles.inputWrapper}>
                    <label style={styles.label}>{label}</label>
                    {type === "textarea" ? (
                        <textarea name={key} style={{ ...styles.input, ...styles.textarea }} {...rest} />
                    ) : type === "file" ? (
                        <input type={type} name={key} style={styles.fileInput} {...rest} />
                    ) : (
                        <input type={type} name={key} style={styles.input} {...rest} />
                    )}
                </div>
            ))}

            {children}
        </form>
    );
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "350px",
        margin: "0 auto",
        backgroundColor: "#2c2c2c",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    },
    title: {
        marginBottom: "20px",
        fontSize: "24px",
        color: "#ffffff",
        textAlign: "center",
    },
    inputWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "15px",
    },
    label: {
        color: "#bbb",
        marginBottom: "5px",
        fontSize: "14px",
    },
    input: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #666",
        backgroundColor: "#444",
        color: "#fff",
        fontSize: "16px",
        outline: "none",
    },
    textarea: {
        height: "100px",
        resize: "vertical",
    },
    fileInput: {
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #666",
        backgroundColor: "#444",
        color: "#fff",
        fontSize: "16px",
        outline: "none",
    },
};

export default StyledForm;
