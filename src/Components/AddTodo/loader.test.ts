import { fetchTodo } from "../../Store/actions";
import { todoLoader } from "./loader";

jest.mock("../../Store/actions", () => ({
  fetchTodo: jest.fn(async () => ({})),
}));

describe("TodoLoader", () => {
  const todos = [
    {
      id: "4",
      title: "Go to a party",
      description: "Let us have so much fun together!",
    },
  ];

  test("must return a todo with the given id", async () => {
    // Arrange
    (fetchTodo as jest.Mock).mockReturnValue(todos[0]);
    const params = { todoId: todos[0].id }; // todos[0].id = 4
    const returnValue = await todoLoader({ params });

    // Assert
    expect(returnValue).toStrictEqual({ todo: todos[0] });
  });

  test("must return no todo", async () => {
    // Arrange
    (fetchTodo as jest.Mock).mockReturnValue({});
    const params = { todoId: todos[0].id }; // todos[0].id = 4
    const returnValue = await todoLoader({ params });

    // Assert
    expect(returnValue).toStrictEqual({ todo: {} });
  });
});
