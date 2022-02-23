const statsRouter = require('express').Router();
const connection = require("../config/db.js");

/* 
Resumé /stats/ :
/test           => get differents test
/projects       => get les projets (nbr de Done and Ongoing)
/clients        => get les ID des clients (nbr de clients)
/experts        => get les ID des experts (nbr d'experts)
/experts2       => get les experts ayant bossé sur un projet
/priceDone      => Chiffre d'affaire projet TERMINE
/priceOngoing   => Chiffre d'affaire projet EN COURS
/priceExperts   => Prix des experts projet TERMINE
*/


statsRouter.get("/globalStats", (req, res) => {
  let global = []
  let sql = "SELECT s.status FROM projects AS p JOIN status AS s ON p.status_id = s.id"
  let sql2 = "SELECT clients.id FROM clients"
  let sql3 = "SELECT experts.id FROM experts"
  let sql4 = "SELECT DISTINCT ep.experts_id FROM btht.experts_has_projects AS ep INNER JOIN projects AS p ON projects_id = p.id WHERE p.status_id = 3 AND ep.answer = 1"
  let sql5 = "SELECT SUM(totalPrice) AS DoneCA FROM projects WHERE status_id = 3"
  let sql6 = "SELECT SUM(totalPrice) AS OngoingCA FROM projects WHERE status_id = 1 OR status_id = 2"
  let sql7 = "SELECT SUM(factuByExpert) AS CostExperts FROM experts_has_projects AS ep INNER JOIN projects AS p ON ep.projects_id = p.id WHERE ep.answer = 1 AND p.status_id = 3"
  connection.query(sql, (err, result) =>  {
      if (err) {
        console.error(err);
        res.status(500).send("Error 1st line");
      } else {  
        const doneProjects = result.filter(project => project.status === "completed" ).length
        const ongoingProjects = result.filter(project => project.status !== "completed" ).length
        global.push({"DoneProjects" : doneProjects}, {"OngoingProjects" : ongoingProjects})
        connection.query(sql2, (err, result2) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error 2nd line");
          } else {
            global.push({"TotalClients" : result2.length})
            connection.query(sql3, (err, result3)=> {
              if (err) {
                console.error(err);
                res.status(500).send("Error 3 line");
              } else {
                global.push({"TotalExperts" : result3.length})
                connection.query(sql4, (err, result4)=> {
                  if (err) {
                    console.error(err);
                    res.status(500).send("Error 4 line");
                  } else {
                    global.push({"ExpertsWorked" : result4.length})
                    connection.query(sql5, (err, result5) => {
                      if (err) {
                        console.error(err);
                        res.status(500).send("Error 5 line");
                      } else {
                        global.push(...result5)
                        connection.query(sql6, (err, result6) => {
                          if (err) {
                            console.error(err);
                            res.status(500).send("Error 6 line");
                          } else {
                            global.push(...result6)
                            connection.query(sql7, (err, result7) => {
                              if (err) {
                                console.error(err);
                                res.status(500).send("Error 7 line");
                              } else {
                                global.push(...result7)
                                res.status(200).json(global)
                              }
                            })
                          }
                        })
                      }})
                  }
                })
              }
            })
          }})  
      }})

    })



// *************   A utiliser pour les TESTS ****************
// *************   Recupere Tous les projets ****************

// statsRouter.get("/projects", (req, res) => {
//     let sql = "SELECT s.status FROM projects AS p JOIN status AS s ON p.status_id = s.id"
//     connection.query(sql, (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error TO check all cotes");
//         } else {
//             // const clientsNumber = result
//             const doneProjects = result.filter(project => project.status === "completed" ).length
//             const ongoingProjects = result.filter(project => project.status !== "completed" ).length
//             const projects = [{"Done Projects" : doneProjects}, {"Ongoing Projects" : ongoingProjects}]
//           res.status(200).json(projects);
//         }
//       });
// })

// *************   Recupere Tous les clients ID ****************


// statsRouter.get("/clients", (req, res) => {
//     let sql = "SELECT clients.id FROM clients"
//     connection.query(sql, (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error TO check all cotes");
//         } else {
//           res.status(200).json([{"Total Clients" : result.length}]);
//         }
//       });
// })


// *************   Recupere Tous les experts ID ****************

// statsRouter.get("/experts", (req, res) => {
//     let sql = "SELECT experts.id FROM experts"
//     connection.query(sql, (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error TO check all cotes");
//         } else {
//         const experts = result
//           res.status(200).json([{"Total Experts" : result.length}]);
//         }
//       });
// })

// *************   Recupere Les experts ayant bossé sur un projet ****************


// statsRouter.get("/experts2", (req, res) => {
//     let sql = "SELECT DISTINCT ep.experts_id FROM btht.experts_has_projects AS ep INNER JOIN projects AS p ON projects_id = p.id WHERE p.status_id = 3 AND ep.answer = 1"
//     connection.query(sql, (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error TO check all cotes");
//         } else {
//           const expertsNumber = result.length
//           res.status(200).json([{"Experts Worked" : expertsNumber}]);
//         }
//       });
// })

// *************   Recupere Chiffre d'affaire FINISH****************

// statsRouter.get("/priceDone", (req, res) => {
//   let sql = "SELECT SUM(totalPrice) FROM projects WHERE status_id = 3"
//   connection.query(sql, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error TO check all cotes");
//       } else {
//         res.status(200).json(result);
//       }
//     });
// })

// *************   Recupere Chiffre d'affaire ONGOING****************

// statsRouter.get("/priceOngoing", (req, res) => {
//   let sql = "SELECT SUM(totalPrice) FROM projects WHERE status_id = 1 OR status_id = 2"
//   connection.query(sql, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error TO check all cotes");
//       } else {
//         res.status(200).json(result);
//       }
//     });
// })

// *************   Price of expert with project DONE ****************

// statsRouter.get("/priceExperts", (req, res) => {
//   let sql = "SELECT SUM(cost) FROM projects WHERE status_id = 3"
//   connection.query(sql, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error TO check all cotes");
//       } else {
//         res.status(200).json(result);
//       }
//     });
// })

module.exports = statsRouter