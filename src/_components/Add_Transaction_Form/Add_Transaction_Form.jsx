

import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../../_utils/firebaseConnection";
import "../../_styles/components_stylesheet/AddTransactionForm.css";
import toast from "react-hot-toast";
const db = getFirestore(app);

function Add_Transaction_Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  /**
   * 
   * @param {Add Transaction with react hook form} data 
   */
  const onSubmit = async (data) => {
    // Proceed with setting the document if the form is valid
    await addDoc(collection(db, "transactions"), {
      _id:Date.now(),
      transaction_type: data.transaction_type,
      amount: parseFloat(data.amount),
    })
    .then((res)=>{
      toast.success('Transaction Add Successful')
    })
    // Clear form fields after a successful submission
    setValue("transaction_type", "");
    setValue("amount", "");
  };

  return (
    
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Particulars</Form.Label>
          <Form.Control
            {...register("transaction_type", {
              required: "This field is required",
            })}
            type="text"
            placeholder="Add Transaction Name"
            className={errors.transaction_type?.message ? "error" : ""}
          />
          <span>{errors.transaction_type?.message}</span>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            {...register("amount", {
              required: "This field is required",
              pattern: /^[0-9]+(\.[0-9]+)?$/,
              setValueAs: (value) =>
                value === "" ? undefined : parseFloat(value),
            })}
            type="number"
            placeholder="Add Amount"
            className={errors.amount?.message ? "error" : ""}
          />
          <span>{errors.amount?.message}</span>
        </Form.Group>
      </Row>

      <Button type="submit">Add Transaction</Button>
    </Form>
  );
}

export default Add_Transaction_Form;
