import React from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchDeleteTask,
  patchCompleteTask,
  patchDate,
  patchTask,
} from '../redux/actions/task';

interface ITaskItem {
  children: string;
  completed: boolean;
  id: number;
  date: string;
}

const TaskItem: React.FC<ITaskItem> = ({ children, completed, id, date }) => {
  const dispatch = useDispatch();

  function deleteTaskFunc(id: number): void {
    if (global.confirm('Вы уверены, что хотите удалить категорию?')) {
      console.log(id);
      fetchDeleteTask(dispatch, id);
    }
  }

  function editTaskFunc(text: any, id: number): void {
    patchTask(dispatch, text, id);
  }

  function editDateFunc(date: any, id: number): void {
    patchDate(dispatch, date, id);
  }
  return (
    <li className='todo__list-item'>
      <div
        onClick={() => patchCompleteTask(dispatch, id, completed)}
        className={`btn btn__complete ${
          completed ? 'btn__complete_done' : 'btn__complete'
        }`}>
        <svg
          width='11'
          height='8'
          viewBox='0 0 11 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001'
            stroke='#fff'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <p
        onClick={() =>
          editTaskFunc(
            window.prompt('Введите название', children) || children,
            id
          )
        }>
        ID-{id}, {children}
      </p>
      <p
        onClick={() =>
          editDateFunc(window.prompt('Введите название', date) || date, id)
        }
        className='todo__list-item-date'>
        {date}
      </p>
      <svg
        onClick={() => deleteTaskFunc(id)}
        width='10'
        height='10'
        viewBox='0 0 10 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z'
          fill='#E3E3E3'
        />
      </svg>
    </li>
  );
};

export default TaskItem;
