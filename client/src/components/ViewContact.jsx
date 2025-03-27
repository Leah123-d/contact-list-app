import { useState } from 'react'
import { TfiTrash } from "react-icons/tfi";
import { SlPencil } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { MdDoneOutline } from "react-icons/md";


function ViewContact({ findContact, starSign, deleteContact, selectedBirthday }){
  const [editNotes, setEditNotes] = useState("");
  const [isEditOpen, setisEditOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  
  if(!Array.isArray(findContact) || findContact.length === 0 ){
    return <p>Loading contact...</p>;
  }
  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setEditNotes(contact.notes);
    setisEditOpen(true);
  }

  const handleNoteChanges = async () => {
    if(!selectedContact) return;
    try{
      const url = `/contacts/${ selectedContact.contact_id }`;
      const response = await fetch(url,
        {method: 'PUT',
          body:JSON.stringify({notes: editNotes}),
          headers:{
            'Content-Type': 'application/json',
          },
        });
    if(!response.ok){
      throw new Error('update failed')
    }
    console.log('update successful!');
    setisEditOpen(false);
    }
    catch(error) {
      console.log(error);
    }
  }
  const formatBirthday = (birthday) => {
    const date = new Date(birthday);
    return date.toLocaleDateString('en-CA');
  };
  // const signsForContact = (birthday) => {
  //   const sign = starSign.find(item => item.birthday === birthday);
  //   return sign ? sign.star_sign : "unknown"
  // }
  return(
    <div className="card">
      {findContact.map((contact) => 
      
      <div key={contact.contact_id}>
        <h1>
          <span className="icon">
            <button className="editButton" onClick={() => handleEditClick(contact)}><SlPencil /></button>
          </span>
          {contact.name}
        </h1>
        
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Notes: {contact.notes}</p>
        <p>Birthday: {formatBirthday(contact.birthday)}</p>
        {/* {selectedBirthday === contact.birthday && (
          <p>star sign: {signsForContact(contact.birthday)}</p>
        )} */}
          {isEditOpen && selectedContact?.contact_id === contact.contact_id && (
              <div className="modal">
                <h3>edit notes</h3>
                <textarea 
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                />
                <button onClick={handleNoteChanges}><MdDoneOutline /></button>
                <button onClick={() => setisEditOpen(false)}>close edit</button>
              </div>
              )}
               <p><button onClick={ () => {
                if (contact?.contact_id){
                  deleteContact(contact.contact_id);
                } else {console.error("contact id is undefined")}}}><TfiTrash /></button></p>
              <p><button><IoClose /></button></p>
        </div>
        )}
    </div>
    )
}

export default ViewContact;