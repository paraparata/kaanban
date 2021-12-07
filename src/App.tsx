import { useState, FormEventHandler, ChangeEventHandler } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DotsThreeOutline, Plus } from "phosphor-react";

import { Sidebar, TaskCard, Task } from "./components/base";
import { Button, Img, Input, Label, Modal } from "./components/ui";
import styles from "./App.module.scss";

import { wordsNormalizer as wn } from "./utils";
import TASK_TEMPLATE from "./constants/task-template.json";

type FormData = {
  id?: string;
  title?: string;
  assignee?: {
    id?: string;
    name?: string;
    img?: string;
  };
  label?: "frontend" | "research" | "backend" | "design" | string;
  start_date?: number | string;
  end_date?: number | string;
};

const DUMMY_PEOPLE = [
  { id: 1, img: "/assets/people1.svg", name: "/assets/people1.svg" },
  { id: 2, img: "/assets/people2.svg", name: "/assets/people2.svg" },
  { id: 3, img: "/assets/people3.svg", name: "/assets/people3.svg" },
  { id: 4, img: "/assets/people1.svg", name: "/assets/people1.svg" },
];

const DUMMY_TASK = {
  id: "1",
  title: "Improve accuracy of voice-to-text model",
  assignee: {
    id: "a1",
    name: "A1",
    img: "/assets/people1.svg",
  },
  label: "frontend" as "frontend" | "research" | "backend" | "design",
  duration: "2 Days",
};

const initialTaskCards = {
  backlog: {
    name: "Backlog",
    tasks: [
      { ...DUMMY_TASK, id: "1" },
      { ...DUMMY_TASK, id: "2", title: "Two factor auth", label: "Design" },
      { ...DUMMY_TASK, id: "3", title: "Create API", label: "Backend" },
    ],
  },
  todo: {
    name: "Todo",
    tasks: [],
  },
  done: {
    name: "Done",
    tasks: [],
  },
};

const onDragEnd = (result: any, cards: any, setCards: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = cards[source.droppableId];
    const destColumn = cards[destination.droppableId];
    const sourceTask = [...sourceColumn.tasks];
    const destTask = [...destColumn.tasks];
    const [removed] = sourceTask.splice(source.index, 1);
    destTask.splice(destination.index, 0, removed);
    setCards({
      ...cards,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTask,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTask,
      },
    });
  } else {
    const card = cards[source.droppableId];
    const copiedTask = [...card.tasks];
    const [removed] = copiedTask.splice(source.index, 1);
    copiedTask.splice(destination.index, 0, removed);
    setCards({
      ...cards,
      [source.droppableId]: {
        ...card,
        tasks: copiedTask,
      },
    });
  }
};

function App() {
  const { isShowing: isModalShowing, toggle: toggleModal } = Modal.useModal();
  const [formData, setFormData] = useState<FormData>();
  const [cards, setCards] = useState(initialTaskCards);
  const [newTaskId, setNewTaskId] = useState<keyof typeof cards>("backlog");

  const handleForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    switch (e.currentTarget.name) {
      case "title":
        setFormData({ ...formData, title: e.currentTarget.value });
        break;
      case "assignee":
        setFormData({
          ...formData,
          assignee: {
            id: formData?.id,
            name: e.currentTarget.value,
            img: "/assets/people1.svg",
          },
        });
        break;
      case "tags":
        setFormData({ ...formData, label: e.currentTarget.value });
        break;
      case "start_date":
        console.log(e.currentTarget.value);
        setFormData({ ...formData, start_date: e.currentTarget.value });
        break;
      case "end_date":
        setFormData({ ...formData, end_date: e.currentTarget.value });
        break;

      default:
        break;
    }
  };

  const handleOnSubmit = () => {
    const { title, assignee, label, start_date, end_date }: any = formData;
    const newData = {
      id: new Date().getMilliseconds().toString(),
      title,
      assignee,
      label,
      duration: `${end_date - start_date} Days`,
    };
    setCards({
      ...cards,
      [newTaskId]: {
        ...cards[newTaskId],
        tasks: [...cards[newTaskId].tasks, newData],
      },
    });

    toggleModal();
  };

  return (
    <>
      <div className={styles.root}>
        <Sidebar />
        <div className={styles.content}>
          <header>
            <div className={styles["header-title"]}>
              <Img
                src="/assets/prosa-logo.jpeg"
                alt="Prosa Logo"
                style={{ width: "60px", aspectRatio: "1" }}
              />
              <span>Kanban Prosa</span>
              <Button icon>
                <DotsThreeOutline size={12} weight="fill" />
              </Button>
            </div>
            <div className={styles["header-detail"]}>
              <div>
                {DUMMY_PEOPLE.map((item) => {
                  return (
                    <Img key={item.id} src={item.img} alt={item.name} circle />
                  );
                })}
              </div>
              <Label>70 Members</Label>
            </div>
          </header>
          <main>
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, cards, setCards)}
            >
              {Object.entries(cards).map(([key, val]) => {
                return (
                  <Droppable droppableId={key} key={key}>
                    {(provided, snapshot) => {
                      return (
                        <TaskCard
                          ref={provided.innerRef}
                          title={val.name}
                          styleContainer={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : undefined,
                          }}
                          onClickBtn={() => {
                            setNewTaskId(key as keyof typeof cards);
                            toggleModal();
                          }}
                          {...provided.droppableProps}
                        >
                          {val.tasks.map((task, index) => {
                            return (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Task
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      title={task.title}
                                      assignee={task.assignee}
                                      label={task.label}
                                      duration={task.duration}
                                      style={{
                                        userSelect: "none",
                                        backgroundColor: snapshot.isDragging
                                          ? "var(--color-accent)"
                                          : undefined,
                                        ...provided.draggableProps.style,
                                      }}
                                    />
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </TaskCard>
                      );
                    }}
                  </Droppable>
                );
              })}
            </DragDropContext>
          </main>
        </div>
      </div>

      <Modal isShowing={isModalShowing} onHide={toggleModal}>
        <div className={styles["new-task"]}>
          <div>
            <span>New Task</span>
          </div>
          <div>
            {Object.entries(TASK_TEMPLATE)
              .filter(([key]) => key !== "issue_id")
              .map(([key]) => {
                return (
                  <div key={key} data-input="true">
                    <label htmlFor={key}>{wn(key)}</label>
                    <Input id={key} name={key} outlined onChange={handleForm} />
                  </div>
                );
              })}
          </div>
          <div>
            <Button variant="text" onClick={toggleModal}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleOnSubmit}>
              <Plus size={16} weight="bold" />
              Add Task
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
