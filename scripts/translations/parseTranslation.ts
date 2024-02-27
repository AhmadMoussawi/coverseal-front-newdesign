import fs from "fs";
import path from "path";

interface Item {
  key: string;
  value: string;
}

function parseTranslation() {
  const translation: Item[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./test.json")).toString()
  );

  let currentCollection;
  let currentItem;
  let currentList;
  let currentListName;
  let currentListItem;
  const parsedTranslation = translation.reduce((acc, { key, value }, index) => {
    if (key === "collection_name" && !acc[value]) {
      // if there is a current item and we met a new collection, push the item first
      if (currentItem) {
        acc[currentCollection].push(currentItem);
        currentItem = undefined;
      }

      acc[value] = {};
      currentCollection = value;
    } else if (key === "item_index") {
      // if the current collection is not already an array, make it an array
      if (!Array.isArray(acc[currentCollection])) {
        acc[currentCollection] = [];
      }

      // if there is already an item, push it in the array then reset the object for the next item
      if (currentItem) {
        acc[currentCollection].push(currentItem);
      }
      currentItem = {};
    } else if (key === "start_list") {
      currentList = [];
      currentListName = value;
    } else if (key === "end_list") {
      // if the current collection is an array, set the field in the currentItem
      if (Array.isArray(acc[currentCollection])) {
        currentItem[currentListName] = currentList;
      } else {
        acc[currentCollection][currentListName] = currentList;
      }
      currentList = undefined;
      currentListName = undefined;
    } else if (key === "start_list_index") {
      currentListItem = {};
    } else if (key === "end_list_index") {
      currentList.push(currentListItem);
      currentListItem = undefined;
    } else {
      if (currentList) {
        currentListItem[key] = value;
      }
      // if the current collection is an array, set the field in the currentItem
      else if (Array.isArray(acc[currentCollection])) {
        currentItem[key] = value;
      } else {
        acc[currentCollection][key] = value;
      }

      if (index === translation.length - 1) {
        acc[currentCollection].push(currentItem);
      }
    }

    return acc;
  }, {});

  fs.writeFileSync(
    path.join(__dirname, "./test_parse.json"),
    JSON.stringify(parsedTranslation, null, 2)
  );
}

parseTranslation();
