

fetch ('data/productos.json')
    .then(response=>response.json())
    .then(data=>{
        console.log(data.productos);
    })
    .catch(error=>console.error("Error fetching JSON: ", error));

