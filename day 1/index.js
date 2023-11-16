const express = require('express');
const sql = require('mssql');

const app = express();

const config = {
  user: 'ranjeet',
  password: '12345',
  server: 'localhost',
  database: 'demo',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/getRequest',(req,res)=>{
    res.send("Hello from get request")

});

app.post('/postRequest',(req,res)=>{
    res.send("Hello from post request")


});

//===========================
// SHOW DATA
//===========================

app.get('/showDatabase',(req,res)=>{

sql.connect(config,function(err){
  if(err)console.log(err);
  var request = new  sql.Request();
  request.query("select * from Student",function(err,records){
      if(err)console.log(err);
      else console.log(records);

  });

});

});



//===========================
// INSERT DATA
//===========================

app.get('/insertData',(req,res)=>{


sql.connect(config)
.then((pool) => {
  console.log('Connected to SQL Server');

  // Insert query
  const insertQuery = "INSERT INTO Student (id, Name, Address) VALUES (03, 'Shivam', 'Pune')";

  // Execute the query
  return pool.request().query(insertQuery);
})
.then((result) => {
  
  console.log('Data inserted successfully:', result);
  sql.close(); 
})
.catch((err) => {
  console.error('Error:', err);
  sql.close();
})

});

//===========================
// UPDATE DATA
//===========================

app.get('/updateData',(req,res)=>{

sql.connect(config)
.then((pool) => {
  console.log('Connected to SQL Server');

  // delete query
  const updateQuery = "UPDATE Student set Name = 'Ankur' WHERE id = '1' " ;

  // Execute the query
  return pool.request().query(updateQuery);
})
.then((result) => {

  console.log('Data updated successfully:', result);
  sql.close();
})
.catch((err) => {
  console.error('Error:', err);
  sql.close();
})

});


//===========================
// DELETE DATA
//===========================

app.get('/deleteData',(req,res)=>{

sql.connect(config)
.then((pool) => {
  console.log('Connected to SQL Server');

  // delete query
  const deleteQuery = "DELETE FROM Student WHERE id = '1' " ;

  // Execute the query
  return pool.request().query(deleteQuery);
})
.then((result) => {
 
  console.log('Data deleted successfully:', result);
  sql.close();
})
.catch((err) => {
  console.error('Error:', err);
  sql.close();
})

});



