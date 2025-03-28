//TO-Do: 
  //render added contacts and deleted ones without refresh
  //write a test
  //add astrology API 
  //fetch with view more matching on the sign name from the starSign
  

import { useState, useEffect } from 'react'
import './App.css'
import Contacts from './components/Contacts';
import ViewContact from './components/ViewContact';
import CreateContact from './components/CreateContact';
import SearchBar from './components/SearchBar';


function App() {
  const [contacts, setContacts] = useState([]);
  const [findContact, setFindContact] = useState([]);
  const [errorHandle, setErrorHandle] = useState(false);
  const [starSign, setStarSign] = useState(null);
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [starSignInfo, setStarSignInfo] = useState("");


  const handleViewMoreClick = (birthday) => {
    setSelectedBirthday(birthday);
    fetchStarSign(birthday);
    setIsViewMoreOpen(true);
  };

  const fetchContacts = async (id) => { 
    try {
      const url = id ? `/contacts/${id}` : "/contacts"; 
      const res = await fetch(url);

      if(!res.ok) throw new Error("Failed to fetch contacts");

      const data = await res.json();
      console.log("fetched data: ", data)

      if(id){
        setFindContact(data);
        return data;
      }else{
        setContacts(data);
      }
    } catch(error) {
      console.error("Error fetching contacts: ", error);
      //setErrorHandle(true); //to build out an error component 
      return [];
    }
  };

  const fetchStarSign = async (birthday) => { //will take a birthday input from the contact selected to create this fetch
    try {
      const res = await fetch(`/contacts/birthday/${birthday}`);

      if(!res.ok) throw new Error("Failed to fetch starsign");

      const data = await res.json();
      console.log("fetched data: ", data)

      // setStarSign(prev => [...prev, {birthday, sign: data[0]?.sign_sign || "Unknown"}]);
      setStarSign(data);
    } catch(error) {
      console.error("Error fetching starsign: ", error);
      //setErrorHandle(true); //to build out an error component 
      return [];
    }
  };


  const createNewContact = async(formData)=>{// I think I can pass the state of the contact instead of the event?
    console.log("contact submitted:", formData);
  
    try{
    const response = await fetch("/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 
    //if I want to send a message to the FE I can do that here
    // if(data.response_code != 0){
    //   console.log("no results found");
      // setErrorHandle(true); //will come back to setting this error handling depending on response from the backend
    //}
    } catch(error){
      console.error("error fetching data: ", error);
    } 
  };

  const deleteContact = async (id) => {
    console.log("Deleting contact with ID:", id);
      try{
      const url = `/contacts/${ id}`; 
      const response = await fetch(url, {method: 'DELETE'});
        if(!response.ok){
          throw new Error('something went wrong')
        }
        console.log(`${id} entry successfully deleted!`);
      }
      catch(error) {
        console.log(error);
      }
  };
  
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="appContainer">
      <SearchBar 
      setSearchResult={setSearchResult}
      />
      <ViewContact 
      findContact={findContact}
      starSign={starSign}
      deleteContact={deleteContact}
      selectedBirthday={selectedBirthday}
      isViewMoreOpen = {isViewMoreOpen}
      setIsViewMoreOpen={setIsViewMoreOpen}
      />
     <Contacts 
      contacts={contacts}
      fetchContacts={fetchContacts}
      handleViewMoreClick={handleViewMoreClick}
      searchResult={searchResult}
      />
      <CreateContact
      createNewContact={createNewContact} />
    </div>
  )
}
export default App





