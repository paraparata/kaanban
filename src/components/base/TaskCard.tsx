import React, { HTMLAttributes, MouseEventHandler } from "react";
import { Plus } from "phosphor-react";
import { Button, Img, Tag } from "../ui";
import styles from "./TaskCard.module.scss";

interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  styleContainer?: React.CSSProperties;
  onClickBtn?: MouseEventHandler<HTMLButtonElement>;
}

interface TaskProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  assignee: {
    id: string;
    name?: string;
    img?: string;
  };
  label: "frontend" | "research" | "backend" | "design" | string;
  duration: string;
}

const DUMMY_ASSIGNEE = {
  id: "People",
  name: "People",
  img: "/assets/people1.svg",
};

export const Task = React.forwardRef<any, TaskProps>(
  ({ title, assignee = DUMMY_ASSIGNEE, label, duration, ...props }, ref) => {
    const [status, setStatus] = React.useState<
      "success" | "warning" | "info" | "danger"
    >("info");

    React.useEffect(() => {
      switch (label.toLowerCase()) {
        case "frontend":
          setStatus("success");
          break;
        case "researcher":
          setStatus("warning");
          break;
        case "design":
          setStatus("info");
          break;
        case "backend":
          setStatus("danger");
          break;

        default:
          setStatus("info");
          break;
      }
    }, []);

    return (
      <div ref={ref} className={styles.task} {...props}>
        <span>{title}</span>
        <div>
          <Img src={assignee.img} alt={assignee.name} circle />
          <Tag status={status}>{label.toUpperCase()}</Tag>
          <span>{duration}</span>
        </div>
      </div>
    );
  }
);

const TaskCard = React.forwardRef<any, TaskCardProps>(
  (
    { title = "Title", styleContainer, onClickBtn, children, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={styles["task-card"]} {...props}>
        <div>
          <span>{title}</span>
          <Button onClick={onClickBtn}>
            <Plus size={16} weight="bold" />
            Add Task
          </Button>
        </div>
        <div style={styleContainer}>{children}</div>
      </div>
    );
  }
);

export default TaskCard;
