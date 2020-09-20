import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchList } from '../redux/actions/list';
import { postTask } from '../redux/actions/task';
import TaskItem from './TaskItem';

interface ITaskList {
  tasks: Array<{
    listId: number;
    text: string;
    id: number;
    completed: boolean;
    date: string;
  }>;
  children: string;
  listId: number;
  color: Array<{
    id: number;
    hex: string;
    name: string;
  }>;
  active: boolean;
}

const TaskList: React.FC<ITaskList> = ({
  tasks,
  children,
  listId,
  color,
  active,
}) => {
  const [popupState, setPopupState] = useState<boolean>(false);
  const [inputTaskHandler, setInputTaskHandler] = useState<string>('');
  const [inputDateHandler, setInputDateHandler] = useState<string>('');

  const dispatch = useDispatch();

  function inputTaskHandlerFunc(event: React.ChangeEvent<HTMLInputElement>) {
    setInputTaskHandler(event.target.value);
  }
  function inputDateHandlerFunc(event: React.ChangeEvent<HTMLInputElement>) {
    setInputDateHandler(event.target.value);
  }

  function addTaskFunc(id: number, text: string, date: string): void {
    if (text.trim() === '') {
      alert('Введите название задачи');
    } else {
      postTask(dispatch, id, text, date);
      setInputTaskHandler('');
      setInputDateHandler('');
      setPopupState(false);
    }
  }
  function editListFunc(text: any, id: number): void {
    patchList(dispatch, text, id);
  }

  return (
    <div className='todo__task'>
      <h1
        onClick={() =>
          editListFunc(
            window.prompt('Введите название', children) || children,
            listId
          )
        }
        className={`todo__tasks-title todo__tasks-title-${
          color[0] !== undefined && color[0].name
        }`}>
        {children}
        <svg
          width='25'
          height='25'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z'
            fill='#DFDFDF'
          />
        </svg>
      </h1>
      <ul className='todo__tasks-list'>
        {tasks &&
          tasks.map(({ text, completed, id, date }, index) => (
            <TaskItem date={date} completed={completed} id={id} key={index}>
              {text}
            </TaskItem>
          ))}
      </ul>
      {active ? (
        <div onClick={() => setPopupState(true)} className='btn btn__new-task'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6 1V11'
              stroke='#868686'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M1 6H11'
              stroke='#868686'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          Новая задача
        </div>
      ) : (
        ''
      )}

      <form
        name='new-task'
        className={`new-task ${popupState ? 'new-task_open' : ''}`}>
        <input
          value={inputTaskHandler}
          onChange={inputTaskHandlerFunc.bind(this)}
          className='input input__new-task'
          type='text'
          placeholder='Текст задачи'
        />
        <input
          value={inputDateHandler}
          onChange={inputDateHandlerFunc.bind(this)}
          className='input input__new-task'
          type='text'
          placeholder='Срок выполнения'
        />
        <div className='new-task__button-container'>
          <div
            onClick={addTaskFunc.bind(
              this,
              listId,
              inputTaskHandler,
              inputDateHandler
            )}
            className='btn btn__add'>
            Добавить задачу
          </div>
          <div
            onClick={() => setPopupState(false)}
            className='btn btn__decline'>
            Отмена
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskList;
