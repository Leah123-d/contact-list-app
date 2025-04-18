//To-Do
  //refactor to handle form validation in useReducer
import React from 'react';
import { useReducer, useRef } from "react";

const initialState = { name: "", email: "", phone: "", notes: "", birthday: ""}; //intial start for states

function formReducer(state, action) {
  switch (action.type){
    case "FormInput":{
      return{
        ...state,
        [action.formInput.name]:action.formInput.value 
        //always return copies, should not manipulate states in place. Return copy of all the previous objects.
        //set the key that will be dynamic
        //creating the new state
      };
    }
    case "Reset":
      return { ...initialState };
    
    default:
        throw new Error("invalid action type");
  }
}

function CreateContact({ createNewContact }){
  const [formState, dispatchForm] = useReducer(formReducer, initialState); //dispatch to our reducer function
  //form is being changed dynamically in formState
  const formRef = useRef(null);

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(!formState.name || !formState.email || !formState.phone){
      alert('please complete all required fields');
      return;
    }
    if(!isEmailValid(formState.email)){
      alert('Please enter a valid email address');
      return;
    }

    if (!formState.phone.match(/^\d{10}$/)) {
      alert('Please enter a valid phone number');
      return;
    }
    else{
      createNewContact(formState);
      dispatchForm({
        type:"Reset"
      });
      formRef.current.reset();
    }

  }
  // the prop createNewContact is a function in the parent app that trigger a fetch to post the new contact created

  function formChange(e){ //when on change occurs on the form it will create an event, including inputs when we type an input we want to dispatch input 

    dispatchForm({
      type:"FormInput",
      formInput: {name: e.target.name, value: e.target.value}, //we want the input value to be assigned to the object state. Can use e.target.name to assign values to object keys
      //pass in a value prop
    })
  }

  
  return(
    <div>{/* can add an event listener on the form to capture changes. Event delegation.Capture input on the parent element*/}
      <form onSubmit={onSubmit} onChange={formChange} ref={formRef}> 
        <label htmlFor="name">Contact name<span className="req">*</span></label>
        <input 
          id="name"
          type="text"
          name="name"
          required
        />
        <label htmlFor="email">Contact email<span className="req">*</span></label>
        <input 
          id="email"
          name="email"
          required
        />
        <label htmlFor="tel">Contact phone<span className="req">*</span></label>
        <input 
          id="tel"
          type="tel"
          name="phone"
          required
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
        />
        <label htmlFor="birthday">Birthday</label>
        <input
          id="birthday"
          type="date"
          name="birthday"
        />
        <p><span className="req">*</span> - Required field</p>
        <button type="submit">Create contact</button>
      </form>
      {/* if we want to add more input then we would make sure it matches our dispatch values 
        can have a value field on each input too, to connect it to the object value={formState.name}*/}
    </div>
  )
}

export default CreateContact;

