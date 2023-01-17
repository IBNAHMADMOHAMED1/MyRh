// creat a const that will hold the data from the json file but don't use require because it will be used in the browser
// use fetch to get the data from the json file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // call the function that will create the cards
        createCards(data);
    });

    

