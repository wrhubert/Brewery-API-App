import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const brewAPI = "https://api.openbrewerydb.org/v1/breweries";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const initResponse = await axios.get(brewAPI + "?by_type=regional&by_citymilwaukee&by_state=wisconsin");
        //console.log(response);
        const initResult = initResponse.data;
        res.render("index.ejs", {
            breweries: initResult       
        });
    } catch(error) {
        res.status(404).send(error.message);
    }
});

app.get("/index"), async (req, res) => {
    function show() {
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
            document.getElementById('yourmodal').innerHTML=xmlhttp.responseText;
            }
        }
            xmlhttp.open("GET","/showmodalroute",true);
            xmlhttp.send();
    } 
    res.render("index.ejs");
}

app.get("/results", async (req, res) => {
    res.render("results.ejs");
});

app.get("/types", async (req, res) => {
    res.render("types.ejs");
});

app.post("/results", async (req, res) => {  
    
    try {
        const type = req.body["brewery_type"];
        const city= req.body["city"]; 
        const state= req.body["state"];
        console.log(type);
        console.log(city);
        console.log(state);
        const response = await axios.get(brewAPI + "?by_type=" + type + "&by_city=" + city.toLowerCase() + "&by_state=" + state);
        const result = response.data;
        console.log(result.length);
        res.render("results.ejs", {
            breweries: result,
            brewery_type: type,
            city: city,
            state: state.charAt(0).toUpperCase() + state.slice(1)
        });
    }
    catch(error) {       
        console.log("Please enter a city, state and select brewery type");
    }
    // res.render("index.ejs", {
    //     breweries: result       
    // });      
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  
