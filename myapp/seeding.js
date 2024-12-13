const pool = require('./connection');
const dataCategory = require('./categories.json');
const dataProduct = require('./products.json');

let newDataCategory = dataCategory.map((element) => {
    return `(DEFAULT, '${element.name}')`;
});
  
let newDataProduct = dataProduct.map((element) => {
    return `(DEFAULT, '${element.name}', '${element.price}', '${element.description}', '${element.link_image}', '${element.category_id}')`;
});

const data = [newDataCategory, newDataProduct];

let seedDataQuery = [];
let dataTable = ["Categories", "Products"];
for (let i = 0; i < data.length; i++) {
    let newDataToInsert = data[i].join(",");
    let DataQuery = `
        INSERT INTO ${dataTable[i]}  
        VALUES ${newDataToInsert}
    `;
    seedDataQuery.push(DataQuery);
}
  
async function runSeed(seedDataQuery) {
    try {
        await pool.query(seedDataQuery[0]);
        await pool.query(seedDataQuery[1]);
        console.log("Success seed table");
    } catch (error) {
        console.log(error);
    }
};

runSeed(seedDataQuery);