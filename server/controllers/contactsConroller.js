import dbConnection from '../db-connection.js';

const {APIKEY} = process.env;

export const getContact = async(req,res) => {
  const { contact_id } = req.params;
  try{
    const result = await dbConnection.query(`SELECT * FROM contacts WHERE contact_id = $1`, [contact_id]);
    if(result.rows.length === 0){
      return res.send({ "error": "contact not found" });
    }
    res.json(result.rows);
  }catch (error){
    console.error('no contact found', error);
  }
}

export const getstarsign = async(req,res) => {
  const { birthday } = req.params;
  
  try{
    const result = await dbConnection.query(`SELECT contacts.birthday, contacts.name, starsign.star_sign 
                                            FROM contacts 
                                            INNER JOIN starsign 
                                            ON DATE(contacts.birthday) BETWEEN DATE(starsign.start_date) 
                                            AND DATE(starsign.end_date) 
                                            WHERE DATE(contacts.birthday) = $1::DATE LIMIT 1`, [birthday]);
    if(result.rows.length === 0){
      return res.send({ "error": "contact not found" });
    }
    res.json(result.rows);
  }catch (error){
    console.error('no contact found', error);
  }
}

export const getContacts = async(req,res) => {
  try{
    const result = await dbConnection.query(`SELECT * FROM contacts`);
    if(result.rows.length === 0){
      return res.send({ "error": "contact not found" });
    }
    res.json(result.rows);
  }catch (error){
    console.error('no contact found', error);
  }
}

export const createContact = async(req,res) => {
  const { name, email, phone, notes, birthday } = req.body;
  try{
    const result = await dbConnection.query(`INSERT INTO contacts 
                                              (name, email, phone, notes, birthday) 
                                              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                                              [name, email, phone, notes, birthday]);

    res.json({ message:`new contact ${result.rows[0].name} was added with ID ${result.rows[0].contact_id}`})
    }catch (error) {
        console.error('Error creating new contact: ', error);
    }
}
export const updateContact = async(req,res) =>{
  const { contact_id } = req.params; 
  const { notes } = req.body; 
  try{
    const result = await dbConnection.query(`UPDATE contacts SET 
                                            notes = $1 
                                            WHERE contact_id = $2 RETURNING *`, [notes, contact_id]);
    res.json(result.rows);
  }catch (error) {
    console.error('Error updating contacts: ', error);
}
}
export const deleteContact = async(req,res) => {
  
  const { contact_id } = req.params;
  try{
    const result = await dbConnection.query(`DELETE FROM contacts WHERE contact_id = $1 RETURNING *`, [contact_id]);
    if(result.rowCount === 0){
        return res.send( { "error": "contact not found" } );
    }
    res.send(`contact with contact_id ${contact_id} has been deleted`);
    } catch (error){
        console.error(`Could not locate contact with contact_id: ${contact_id}: `, error);
    }
}

export const searchContacts = async(req,res) => {
  const { name } = req.params;
  try{
  const result = await dbConnection.query(`SELECT * FROM contacts WHERE name ILIKE  $1`, [`%${name}%`]);
  if(result.rowCount === 0){
    return res.send( { "error": "contact not found" } );
  }
  
  res.json(result.rows);
  }catch (error){
  console.error('no contact found', error);
  }
}

export const getHoroscope = async(req,res) => {

  console.log("recied body", req.body);

  const { star_sign } = req.params;

  if(!star_sign) {
    return res.status(400).json({error: "sign is required"});
  }

  try{
    const reponse = await fetch('https://divineapi.com/api/1.0/get_weekly_horoscope.php',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        star_sign,
        api_key: {APIKEY}, // put key in .env and place variable here 
        week:'current'
      })
    });

    const data = await response.json();
    res.json(data);

  } catch(error){
    console.error("error fetching horoscope:", error);
    res.status(500).json({error: "internal server error"})
  }
}
