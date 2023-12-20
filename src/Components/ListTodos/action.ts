import { QueryClient } from "@tanstack/react-query";

import { deleteDocument } from "../../Store/actions";

export function deleteAction(queryClient: QueryClient) {
  return async function ({ request }: { request: Request }) {
    const formData = await request.formData();
    const todoId = formData.get("todoId") as string;

    // if success, "todos" query below will be removed
    await deleteDocument(todoId).then(() => {
      queryClient.removeQueries({ queryKey: ["todos"] });
    });
    return null;
  };
}
