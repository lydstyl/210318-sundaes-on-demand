import { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const val = parseFloat(event.target.value);

        if (val < 0 || val > 10 || !(Math.floor(val) === val)) {
            setIsValid(false);
        } else {
            setIsValid(true);
            updateItemCount(name, val);
        }
    };

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
            <img
                style={{ width: "75%" }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />

            <Form.Group
                controlId={`${name}-count`}
                as={Row}
                style={{ marginTop: "10px" }}
            >
                <Form.Label column xs="6" style={{ textAlign: "right" }}>
                    {name}
                </Form.Label>
                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                        isInvalid={!isValid}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}
