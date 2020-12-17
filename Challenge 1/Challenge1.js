const dbQuery = (query) => {
  return new Promise( (resolve, reject) => {
    setTimeout( ()=> { resolve(`Results for db query: ${query}`) }, 1000 * Math.floor(5*Math.random()) );
  } )
}
const queries = ['Query 1', 'Query 2', 'Query 3', 'Query 4', 'Query 5'];

//Fix this snippet of code so that it prints the query results:
queries.forEach( q => console.log(dbQuery(q)) );

Promise.all(queries.map( q => dbQuery(q)))
  .then((result) => console.log(result));