import dbConnection from '../db-connection.js';

export const getContact = async(req,res) =>{
  const { contact_id } = req.params;
  try{
    const result = await dbConnection.query(`SELECT * FROM contacts WHERE contact_id = $1`, [contact_id]);
    if(result.rows.length === 0){
      return res.send({ "error": "contact not found" });
    }
    res.json(result.rows[0]);
  }catch (error){
    console.error('no contact found', error);
  }
}

export const getstarsign = async(req,res) =>{
  const { birthday } = req.params;
  
  try{
    const result = await dbConnection.query(`SELECT contacts.name, contacts.birthday, starsign.star_sign 
                                            FROM contacts 
                                            FULL JOIN starsign ON DATE(contacts.birthday) BETWEEN DATE(starsign.start_date) AND DATE(starsign.end_date) 
                                            WHERE DATE(contacts.birthday) = $1::DATE`, [birthday]);
    if(result.rows.length === 0){
      return res.send({ "error": "contact not found" });
    }
    res.json(result.rows[0]);
  }catch (error){
    console.error('no contact found', error);
  }
}

export const getContacts = async(req,res) =>{
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

export const createContact = async(req,res) =>{
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
    res.json(result.rows[0]);
  }catch (error) {
    console.error('Error updating contacts: ', error);
}
}
export const deleteContact = async(req,res) =>{
  const { contact_id } = req.params;
  try{
    const result = await dbConnection.query(`DELETE FROM contacts WHERE contact_id = $1 RETURNING *`, [contact_id]);
    if(result.rowCount === 0){
        return res.send( { "error": "contact not found" } );
    }
    res.send(`contact with contact_id ${contact_id} has been deleted`);
    } catch (error){
        console.error(`Could not locate species with common_name: ${contact_id}: `, error);
    }
}
