import * as React from "react";
import Todo from "../models/Todo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  onTodoClicked: (todoId: number) => void;
}
interface State {
  items: Todo[];
}

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: k,
    name: `item ${k}`,
    done: false
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default class AddTodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: props.todos
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  // tslint:disable-next-line:member-access
  componentWillReceiveProps(nextProps: Props) {
    this.setState({ items: nextProps.todos });
  }

  public onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({ items });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  public render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <span
                        key={item.id}
                        onClick={() => this.props.onTodoClicked(item.id)}
                        style={{
                          textDecoration: `${item.done ? "line-through" : ""}`,
                          cursor: "pointer"
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
