document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('submitBtn');
    var inputField = document.getElementById('data');
    var outputField = document.getElementById('res');
    var errField = document.getElementById('errorBox');

    btn.onclick = async function() {
        errField.innerText = "";
        outputField.innerText = "loading...";

        var val = inputField.value;
        if (!val || val.trim() === "") {
            errField.innerText = "input is empty";
            outputField.innerText = "";
            return;
        }

        var obj;
        try {
            obj = JSON.parse(val);
        } catch (e) {
            errField.innerText = "bad json format";
            outputField.innerText = "";
            return;
        }

        try {
            var res = await fetch("http://localhost:3000/bfhl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            var data = await res.json();
            outputField.innerText = JSON.stringify(data, null, 2);

        } catch (err) {
            console.log(err);
            errField.innerText = "server error";
            outputField.innerText = "";
        }
    };
});