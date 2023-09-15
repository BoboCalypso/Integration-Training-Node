import fs from "fs";

export const updateData = (checkpoint) => {
    const oldData = fs.readFileSync("./data/data.json");
    const parsedData = JSON.parse(oldData)
    let newData = {...parsedData, [checkpoint]: true}
    let data = JSON.stringify(newData)
    fs.writeFile("./data/data.json", data, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("Checkpoint completed\n");
        }
      });
}