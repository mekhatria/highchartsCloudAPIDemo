## Highcharts cloud API demo
Open a command line and launch ``npm install``

Create a data.json and add the right credentials:
```json
{  
    "teamID" : 123456,   
    "APIKey" : '123456',  
    "dbCredentials":{
        "DBlogin" : 'name',
        "DBpwd" : '123456' 
    },
    "BLink" : '123x123x' 
}
```

Start the server ``node myServer.js``

Click on ``index.html`` and use the buttons in this order:
- Read data from database
- Send data to Highcharts Cloud
- Duplicate chart
- Delete chart
