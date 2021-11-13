function loginAlbedo()
{
    albedo.publicKey({
        token: 'fSI3khaqdqNobsAfFaUBsdPxVqaMO0s4ovHxmnbCTdc='
    })
        .then(data => printData(data.pubkey));
}
function loginRabet()
{
    if(!window.rabet)
    {
        alert("no rabet detected");
        return;
    }
    rabet.connect()
        .then(data => printData(data.publicKey));
}
function logout()
{
    document.getElementById("pubKey").innerHTML = "";
    document.getElementById("balance").innerHTML = "";
    document.getElementById("creationAccount").innerHTML = "";
    document.getElementById("creationDate").innerHTML = "";
    document.getElementById("Albedo").style.visibility = "visible";
    document.getElementById("Rabet").style.visibility = "visible";
    document.getElementById("logout").style.visibility = "hidden";
}

function printData(publicKey)
{
    document.getElementById("pubKey").innerHTML = publicKey;
    printBalances(publicKey);
    printCreation(publicKey);
    document.getElementById("logout").style.visibility = "visible";
    document.getElementById("Albedo").style.visibility = "hidden";
    document.getElementById("Rabet").style.visibility = "hidden";
}

function printBalances(publicKey)
{
    fetch("https://horizon.stellar.org/accounts/" + publicKey)
        .then(response => response.json())
        .then(data =>{

            for(var key in data.balances)
            {
                var parentDiv = document.getElementById("balance");
                var childDiv = document.createElement("div");
                childDiv.classList.add("balances");

                if(data.balances[key].asset_code == undefined)
                {
                    childDiv.innerHTML = data.balances[key].balance + " " + "XLM";
                }
                else
                {

                    childDiv.innerHTML = data.balances[key].balance + " " + data.balances[key].asset_code;
                }
                parentDiv.appendChild(childDiv);
                console.log(data.balances[key].asset_code);
                console.log(data.balances[key].balance);
            }
        });

}
function printCreation(publicKey)
{
    fetch("https://horizon.stellar.org/accounts/" + publicKey + "/operations?limit=1&order=asc")
        .then(response => response.json())
        .then(data =>{
            console.log("source account = " + data._embedded.records[0].source_account);
            document.getElementById("creationAccount").innerHTML = "source account<br>" + data._embedded.records[0].source_account;
            let date = new Date(data._embedded.records[0].created_at);
            let isoDate = date.toISOString().replace("Z", " ").replace("T", " ").replace(".000", " ");
            console.log("account created at = " + data._embedded.records[0].created_at);
            document.getElementById("creationDate").innerHTML = "account creation date<br>" + isoDate + " UTC";
        });
}

