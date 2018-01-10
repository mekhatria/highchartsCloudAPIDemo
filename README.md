## Highcharts cloud API demo
Open a command line and launch ``npm install``

Create a data.json and add the right credentials:
```json
{
    //HCCloud team id    
    "teamID" : 123456, 
    
    //HCCloud API key    
    "APIKey" : '123456', 
    
    // MongoBD's username and password    
    "dbCredentials":{
        "DBlogin" : 'name',
        "DBpwd" : '123456', 
    },
    //MongoDB database link
    "BLink" : '123x123x', 
}
```

Start the server ``node myServer.js``

Click on ``index.html`` and use the buttons in this order:
- Read data from database
- Send data to Highcharts Cloud
- Duplicate chart
- Delete chart
