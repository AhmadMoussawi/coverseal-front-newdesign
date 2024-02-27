import { deleteScript } from "./delete";
import { setupScript } from "./setup";
import { pushTranslationsScript } from "./pushTranslations";
import { permissionsScript } from "./permissions";

async function main() {
  await deleteScript();
  console.log("done delete");
  await setupScript();
  console.log("done setup");
  await pushTranslationsScript();
  console.log("done push translations");
  await permissionsScript();
  console.log("done permissions");
}

main();
