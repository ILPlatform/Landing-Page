
import { useState } from "react";

function useForm({ form, additionalData, endpointUrl }) {
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        if (form) {
            e.preventDefault();
            setStatus("loading");
            setMessage("");

            const finalFormEndpoint = endpointUrl || form.current.action;
            console.log(form);
            const data = Array.from(form.current.elements)
                .filter((input) => input.name)
                .reduce(
                    (obj, input) => Object.assign(obj, { [input.name]: input.value }),
                    {}
                );

            if (additionalData) {
                Object.assign(data, additionalData);
            }



            fetch(finalFormEndpoint, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.statusText);
                    }

                    return response.json();
                })
                .then(() => {
                    setMessage("We'll be in touch soon.");
                    setStatus("success");
                })
                .catch((err) => {
                    setMessage(err.toString());
                    setStatus("error");
                });
        }
    };

    return { handleSubmit, status, message };
}

export default useForm;