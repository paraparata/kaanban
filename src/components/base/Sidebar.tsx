import { MagnifyingGlass } from "phosphor-react";
import { Button, Img, Input } from "../ui";
import styles from "./Sidebar.module.scss";

import NAV_MENU from "../../constants/sidebar-menu.json";

const Sidebar = () => {
  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Input placeholder="Search" suffix={<MagnifyingGlass size={24} />} />
      </div>
      <div className={styles.profiles}>
        <div>
          <Img
            src="/assets/people1.svg"
            alt="Emilee Simchecnko"
            size="lg"
            circle
          />
          <span text-type="name">Emilee Simchecnko</span>
          <span text-type="title">Product Owner</span>
        </div>
        <div>
          <span text-type="value">372</span>
          <span text-type="value">11</span>
          <span>Completed Tasks</span>
          <span>Open Tasks</span>
        </div>
      </div>
      <nav className={styles.nav}>
        {Object.entries(NAV_MENU.data).map(([key, val]) => {
          return (
            <ul key={key}>
              <li>{val.name.toLocaleUpperCase()}</li>
              <ul>
                {val.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={item.target}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </ul>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
